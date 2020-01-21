const mod = require('./_mod')

module.exports = (x, y) => {
    return [
        Math.floor(x / y),
        mod(x, y),
    ]
}
