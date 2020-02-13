const repr = require('./repr')
const Bytes = require('./_bytes')
const toPrimitive = require('./_to-primitive')


let _TextDecoder
/* istanbul ignore next */
if (typeof(TextDecoder) !== 'undefined') {
    _TextDecoder = TextDecoder
}
else {
    _TextDecoder = require('util').TextDecoder
}

function str(...args) {
    const n = args.length
    if (n === 0) {
        return ''
    }
    // argument 'errors'
    if (n === 3) {
        throw new TypeError(
            `str() argument 3 must be str and is currently not supported`
        )
    }
    if (n > 3) {
        throw new TypeError(
            `str() takes at most 3 arguments (${n} given)`
        )
    }

    let [object, encoding] = args

    if (object == null) {
        return `${object}`
    }

    const typeOfObject = typeof(toPrimitive(object, false))

    // 'object' only
    if (n === 1) {
        // From the Python docs:
        // If neither encoding nor errors is given,
        // str(object) returns object.__str__(). [...]
        // For string objects, this is the string itself.
        if (typeOfObject === 'string') {
            return object
        }
        if (object.__str__) {
            const s = object.__str__()
            if (typeof(toPrimitive(s, false)) !== 'string') {
                throw new TypeError(
                    ` __str__ returned non-string (type ${s ? s.constructor.name : s})`
                )
            }
            return s
        }
        return repr(object)
    }
    // 'object' and 'encoding'
    else {
        if (typeof(toPrimitive(encoding, false)) !== 'string') {
            throw new TypeError(
                `str() argument 2 must be str, not ${
                    encoding ? encoding.constructor.name : encoding
                }`
            )
        }
        if (!(object instanceof Bytes || object instanceof Uint8Array)) {
            // For some reason there is special error message in Python for strings.
            if (typeOfObject === 'string') {
                throw new TypeError(
                    `decoding str is not supported`
                )
            }
            else {
                throw new TypeError(
                    `decoding to str: need a bytes-like object, ${object.constructor.name} found`
                )
            }
        }

        // Compatibility: https://caniuse.com/#feat=mdn-api_textdecoder_decode
        const decoder = new _TextDecoder(encoding)
        return decoder.decode(object.buffer)
    }
}


module.exports = str
