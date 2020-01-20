// See https://stackoverflow.com/a/32538867/6928824
function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false
    }
    return typeof(obj[Symbol.iterator]) === 'function'
}


// Constructs an object from an iterable of (key, value) - pairs.
// Alternatively an array of non-pair items can be given.
// In that case each dictionary entry is constructed using str(item) as key and item as value
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
