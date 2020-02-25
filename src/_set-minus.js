module.exports = function(setA, setB) {
    const _difference = new Set(setA)
    for (const elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}
