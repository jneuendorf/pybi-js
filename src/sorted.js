function identity(x) {
    return x
}

module.exports = (iterable, key=identity, reversed=false) => {
    iterable = [...iterable]
    const [first] = iterable
    let compare
    // Compare strings using the default behavior.
    if (typeof(first) === 'string' && key === identity) {
        compare = undefined
    }
    else {
        compare = (a, b) => key(a) - key(b)
    }

    const sorted = iterable.sort(compare)
    if (reversed) {
        return sorted.reverse()
    }
    return sorted
}
