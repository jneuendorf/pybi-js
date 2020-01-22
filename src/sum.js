module.exports = (iterable, start=0) => {
    let result = start
    for (const item of iterable) {
        result += item
    }
    return result
}
