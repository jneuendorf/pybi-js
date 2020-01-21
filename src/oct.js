module.exports = x => {
    if (Number.isInteger(x)) {
        if (x >= 0) {
            return `0o${x.toString(8)}`
        }
        return `-0o${(-x).toString(8)}`
    }
    if (x.__index__) {
        return x.__index__()
    }
    throw new TypeError(`'${x.construtor.name}' object cannot be interpreted as an integer`)
}
