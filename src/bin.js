module.exports = x => {
    if (Number.isInteger(x)) {
        if (x >= 0) {
            return `0b${x.toString(2)}`
        }
        return `-0b${(-x).toString(2)}`
    }
    if (x.__index__) {
        return x.__index__()
    }
    throw new TypeError(`'${x.construtor.name}' object cannot be interpreted as an integer`)
}
