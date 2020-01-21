class ValueError extends Error {}


module.exports = (x, base=10) => {
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
