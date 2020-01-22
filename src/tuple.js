module.exports = iterable => {
    if (!iterable) {
        // Save 1 function call.
        return []
    }
    return Array.from(iterable)
}
