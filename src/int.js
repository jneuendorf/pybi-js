const callable = require('./callable')
const Bytes = require('./_bytes')
const {dunder, NO_PROP} = require('./_dunder')
const {NotImplementedError, ValueError} = require('./_errors')
const toPrimitive = require('./_to-primitive')


// See http://stackoverflow.com/questions/596467/ddg#596503
// => for large numbers '~~x' or 'x | 0' is incorrect
const numberToInteger = (
    Math.trunc
    ? Math.trunc
    : parseInt
)

function removedLeadingZeros(x, sign) {
    let i = (sign === 1 ? 0 : 1)
    if (x[i] === '0') {
        const n = x.length
        let j = i + 1
        // Move j right until non-zero was found.
        while (j < n && x[j] === '0') {
            j++
        }
        x = x.slice(0, i) + x.slice(j)
    }
    return x
}

// This function is idempotent:
// It only removes the prefix if present and does nothing otherwise.
// Leading zeros are also removed.
function removedPrefix(x, sign) {
    const prefix = (sign === 1 ? x.slice(0, 2) : x.slice(1, 3))
    const prefixLower = prefix.toLowerCase()
    let base
    if (prefixLower === '0b') {
        base = 2
    }
    else if (prefixLower === '0o') {
        base = 8
    }
    else if (prefixLower === '0x') {
        base = 16
    }

    let noPrefix
    if (base) {
        // Only the 1st occurence is replaced.
        noPrefix = x.replace(prefix, '')
    }

    const zeroTrimmedX = removedLeadingZeros(x, sign)
    return [
        noPrefix && removedLeadingZeros(noPrefix, sign),
        zeroTrimmedX,
        base,
    ]
}


module.exports = (...args) => {
    const numArgs = args.length
    if (numArgs === 0) {
        return 0
    }

    if (numArgs > 2) {
        throw new TypeError(`int() takes at most 2 arguments (${numArgs} given)`)
    }

    let [x, base=10] = args
    const __int__ = dunder(x, '__int__', Number.isInteger, 'int')
    if (__int__ !== NO_PROP) {
        return __int__
    }
    const __index__ = dunder(x, '__index__', Number.isInteger, 'int')
    if (__index__ !== NO_PROP) {
        return __index__
    }
    // We don't have 'Integral's so we just use 'int's.
    const __trunc__ = dunder(x, '__trunc__', Number.isInteger, 'int')
    if (__trunc__ !== NO_PROP) {
        return __trunc__
    }

    const type = typeof(toPrimitive(x, false))
    const isString = type === 'string'
    const explicitBase = numArgs === 2

    // NOTE: 'base' is checked 1st in Python,
    //       i.e. 'int([], 1)' raises this error.
    //       We don't need to check for 'base's value in the else branch
    //       because the default value is of course valid.
    if (base < 0 || base === 1 || base > 36) {
        throw new ValueError(`int() base must be >= 2 and <= 36, or 0`)
    }

    if (!explicitBase) {
        const isNumber = type === 'number'
        if (isNumber) {
            return numberToInteger(x)
        }

        // Here we know: isNumber == false
        const isBytesLike = (
            x instanceof Uint8Array
            || x instanceof Bytes
        )
        if (isBytesLike) {
            // TODO:
            throw new NotImplementedError('Sorry!')
        }
        else if (!isString) {
            throw new TypeError(
                `int() argument must be a string, a bytes-like object or `
                + `a number, not '${x.constructor.name}'`
            )

        }
    }
    else {
        if (!isString) {
            throw new TypeError(`int() can't convert non-string with explicit base`)
        }
    }

    const xOrig = x
    const baseOrig = base
    // NOTE: 'parseInt' can handle whitespace but we need to check back in case
    // we parsed '1a' to '1' for example, which should throw an error.
    x = x.trim()

    if (x.length === 0) {
        throw new ValueError(
            `invalid literal for int() with base ${baseOrig}: '${xOrig}'`
        )
    }

    // Normalize number string for all bases such that the base is not encoded
    // in the string anymore.
    const sign = (x[0] === '-' ? -1 : 1)
    if (x[0] === '+') {
        x = x.slice(1)
    }

    const [_x, _zeroTrimmedX, _base] = removedPrefix(x, sign)
    if (base === 0) {
        if (!_base && x[sign === 1 ? 0 : 1] === '0') {
            throw new ValueError(
                `invalid literal for int() with base ${baseOrig}: '${xOrig}'`
            )
        }
        x = _x || _zeroTrimmedX
        // Even if 'base' becomes 'undefined' the 'invalid literal' error
        // will be thrown later during the parseInt-toString check.
        base = _base || 10
    }
    else {
        if (_base !== base) {
            if (_base) {
                // Since there is a prefix, the prefix'es letter must fit in
                // the alphabet of 'base', e.g. if '0b' (_base == 2) was
                // detected, the 'b' implies that 'base >= 12' ('0123456789ab').
                // This in turn implies that _base == 16 ('0x') can never be
                // ok, because the largest allowed base is 32.
                // 0x => none
                // 0o => 25
                // 0b => 12
                if (
                    _base === 16
                    || (_base === 8 && base < 25)
                    || (_base === 2 && base < 12)
                ) {
                    throw new ValueError(
                        `invalid literal for int() with base ${baseOrig}: '${xOrig}'`
                    )
                }
                // Python: int('0b00hh', 32) == 11534897
                // For this example, we detected '_base == 2'.
                // Since we reached this point, we know 'base' can handle '0b'.
                // BUT: We don't want to proceed with only 'hh' (prefix removed,
                // then zero-trimmed) but with 'b00hh' (only zero-trimmed).
                else {
                    x = _zeroTrimmedX
                }
            }
            // Didn't detect anything, so just use the zero-trimmed string.
            else {
                x = _zeroTrimmedX
            }
        }
        // Bases match => awesome! 'base === undefined' can never happen
        else if (_base) {
            x = _x
        }
    }

    const num = parseInt(x, base)
    if (num.toString(base) === x) {
        return num
    }
    throw new ValueError(
        `invalid literal for int() with base ${baseOrig}: '${xOrig}'`
    )
}
