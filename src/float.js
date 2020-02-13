const callable = require('./callable')
const toPrimitive = require('./_to-primitive')
const {ValueError} = require('./_errors')

module.exports = (...args) => {
    if (args.length === 0) {
        return 0
    }

    let [x] = args

    if (x == null) {
        throw new TypeError(
            `float() argument must be a string or a number, not '${x}'`
        )
    }

    // Convert to primitive for following typeof checks.
    x = toPrimitive(x, false)

    if (typeof(x) === 'number') {
        return x
    }

    if (typeof(x) !== 'string') {
        throw new TypeError(
            `float() argument must be a string or a number, `
            + `not '${x.constructor.name}'`
        )
    }

    x = x.trim()
    const n = Number(x)
    if (Number.isNaN(n)) {
        // Check for special case
        const lower = x.toLowerCase()
        if (lower === 'inf' || lower === 'infinity') {
            return Infinity
        }
        if (lower === '-inf' || lower === '-infinity') {
            return -Infinity
        }
        if (lower === 'nan' || lower === '-nan') {
            return NaN
        }
        throw new ValueError(`could not convert string to float: '${x}'`)
    }
    else {
        return n
    }
}
