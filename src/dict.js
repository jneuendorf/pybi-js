const callable = require('./callable')
const len = require('./len')
const isIterable = require('./_is-iterable')
const {ValueError} = require('./_errors')

module.exports = (...args) => {
    let iterableOrMapping
    if (args.length === 0) {
        return {}
    }
    if (args.length !== 1) {
        throw new TypeError(
            `dict expected at most 1 arguments, got ${args.length}`
        )
    }
    iterableOrMapping = args[0]

    if (iterableOrMapping == null) {
        throw new TypeError(
            `'${iterableOrMapping}' object is not iterable`
        )
    }

    // Make an exception for direct instances of 'Object'
    // (as in 'enumerate', for example).
    // All other 'Object's must implement the iterable protocol.
    if (iterableOrMapping.constructor === Object) {
        // Is a shortcut for performance reasons instead of iterating
        // 'iterableOrMapping' twice by doing:
        //      iterable = Object.entries(iterableOrMapping)
        return {...iterableOrMapping}
    }

    let iterable
    if (isIterable((iterableOrMapping))) {
        iterable = iterableOrMapping
    }
    else {
        throw new TypeError(
            `'${iterableOrMapping.constructor.name}' object is not iterable`
        )
    }

    // 2. Transform the tuples into an object.
    // Assume all keys are strings so an 'Object' can be returned.
    // Update this assumption on the fly so we do not always need an extra
    // iteration to check the keys.
    let useObjectForResult = true
    let result = {}
    let i = 0
    for (const item of iterable) {
        if (!isIterable(item)) {
            throw new TypeError(
                `cannot convert dictionary update sequence element #${i} to a sequence`
            )
        }
        const l = len(item)
        if (l !== 2) {
            throw new ValueError(
                `dictionary update sequence element #0 has length ${l}; `
                + `2 is required`
            )
        }
        const [key, val] = item
        // Oh no, we can't really use 'Object' for the return value!
        // Well, we could but that is probably not very reasonable.
        // So we decide to use 'Map' instead.
        // But we have to continue the loop to continue the checking the
        // struture of 'iterable.'
        if (typeof(key) !== 'string' && !(key instanceof String)) {
            useObjectForResult = false
        }
        if (useObjectForResult) {
            result[key] = val
        }
        i += 1
    }

    if (useObjectForResult) {
        return result
    }
    return new Map(iterable)
}
