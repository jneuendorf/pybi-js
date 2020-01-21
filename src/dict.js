const isIterable = require('./_is-iterable')

module.exports = iterableOrMapping => {
    // 1. Normalize to iterable of key-value pairs.
    let iterable
    if (isIterable(iterableOrMapping)) {
        iterable = iterableOrMapping
    }
    else if (iterableOrMapping.entries) {
        iterable = iterableOrMapping.entries()
    }
    else {
        iterable = []
        for (const key in iterableOrMapping) {
            iterable.push([key, iterableOrMapping[key]])
        }
    }

    // 2. Transform the tuples into an object.
    const result = {}
    for (const [key, val] of iterable) {
        result[key] = val
    }
    return result
}
