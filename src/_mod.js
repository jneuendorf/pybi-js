// See https://stackoverflow.com/a/4467559/6928824
module.exports = (x, y) => {
    // For consistency with Python.
    if (y === Infinity) {
        return x
    }
    if (y === -Infinity) {
        return -Infinity
    }
    return ((x % y) + y) % y
}
