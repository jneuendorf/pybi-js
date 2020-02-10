const {ValueError} = require('./_errors')
const toPrimitive = require('./_to-primitive')

module.exports = (...args) => {
    if (args.length === 0) {
        return ''
    }

    let [object, encoding, /*errors*/] = args

    if (object == null) {
        return `${$object}`
    }

    if (!encoding) {
        // From the Python docs:
        // If neither encoding nor errors is given,
        // str(object) returns object.__str__(). [...]
        // For string objects, this is the string itself.
        try {
            if (typeof(toPrimitive(object)) === 'string') {
                return object
            }
        }
        catch (error) {
            if (error instanceof ValueError) {
                if (object.__str__) {
                    return object.__str__()
                }
            }
        }
    }
    else {

    }



    // No 'new' => primitive string
    // (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Distinction_between_string_primitives_and_String_objects)
    return String(object)
}
