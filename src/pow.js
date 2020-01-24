const _mod = require('./_mod')
const {ValueError} = require('./_errors')
const divmod = require('./divmod')


// See https://bugs.python.org/msg336130
function modinv(a, m) {  // assuming m > 0
    let b = m, s = 1, s1 = 0, q

    while (b) {
        [a, [q, b]] = [b, divmod(a, b)]
        // NOTE: Semicolon in the beginning to make clear it is intended.
        //       See: https://stackoverflow.com/a/38050480/6928824
        ;[s, s1] = [s1, s - q*s1]
    }
    if (a !== 1) {
        throw new ValueError('inverse does not exist')
    }
    return (
        s >= 0
        ? s
        : s + m
    )
}

function pow(base, exp, mod) {
    const n = base ** exp
    if (mod == null) {
        return n
    }

    if (mod === 0) {
        throw new ValueError('pow() arg 3 must not be zero')
    }

    if (exp >= 0) {
        return _mod(n, mod)
    }
    else {
        let invBase
        try {
            invBase = modinv(base, mod)
        }
        catch (error) {
            if (error instanceof ValueError) {
                throw new ValueError(`pow() arg 1 and arg 3 must be relatively prime`)
            }
            else {
                throw error
            }
        }
        return pow(invBase, -exp, mod)
    }
}


module.exports = pow
