const {ValueError} = require('./_errors')


module.exports = (x, base=10) => {
    if (x.__int__) {
        return x.__int__()
    }
    if (x.__index__) {
        return x.__index__()
    }
    if (x.__trunc__) {
        return x.__trunc__()
    }

    const error = new ValueError(
        `invalid literal for int() with base ${base}: '${x}'`
    )

    // Be more strict & clean with the most likely case of base == 10.
    if (base === 10) {
        const num = Number(x)
        if (Number.isInteger(num)) {
            return num
        }
        throw error
    }
    else {
        const num = parseInt(x, base)
        if (num.toString(base) === x) {
            return num
        }
        throw error
    }
}
