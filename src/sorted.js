module.exports = (iterable, key, reversed=false) => {
    const sorted = [...iterable].sort(key)
    if (reversed) {
        return sorted.reverse()
    }
    return sorted
}
