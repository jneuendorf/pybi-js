const repr = require('./repr')
const {ValueError} = require('./_errors')
const toPrimitive = require('./_to-primitive')


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

    let typeOfObject
    try {
        typeOfObject = typeof(toPrimitive(object))
    }
    catch (error) {
        if (error instanceof ValueError) {
            typeOfObject = null
        }
    }

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
            // TODO: check return type
            return object.__str__()
        }
        return repr(object)
    }
    // 'object' and 'encoding'
    else {
        if (typeof(toPrimitive(encoding)) !== 'string') {
            throw new TypeError(
                `str() argument 2 must be str, not ${
                    encoding ? encoding.constructor.name : encoding
                }`
            )
        }
        if (!(object instanceof Bytes || object instanceof Uint8Array)) {
            if (typeOfObject === 'string') {
                throw new TypeError(
                    `decoding str is not supported`
                )
            }
            throw new TypeError(
                `decoding to str: need a bytes-like object, ${object.constructor.name} found`
            )
        }
    }

    // No 'new' => primitive string
    // (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Distinction_between_string_primitives_and_String_objects)
    return String(object)
}


module.exports = str
