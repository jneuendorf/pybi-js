const swap = (a, b) => [b, a]


module.exports = iterable => {
    // Array => [[idx, item], ...]
    if (Array.isArray(iterable)) {
        return iterable.map(swap)
    }

    // Objects with a .keys() method, e.g. Maps
    if (iterable.keys) {
        return [...iterable.keys()].map(swap)
    }
    // normal Objects => [[idx, key], ...]
    return Object.keys(iterable).map(swap)
}
