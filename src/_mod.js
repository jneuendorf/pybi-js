// See https://stackoverflow.com/a/4467559/6928824
module.exports = (x, y) => {
    return ((x % y) + y) % y
}
