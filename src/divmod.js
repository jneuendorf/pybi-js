module.exports = (x, y) => {
    return [
        Math.floor(x / y),
        // See https://stackoverflow.com/a/4467559/6928824
        ((x % y) + y) % y,
    ]
}
