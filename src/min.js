const isIterable = require('./_is-iterable')

module.exports = (...args) => {
    if (args.length === 1 && isIterable(args[0])) {
        args = args[0]
    }

    return Math.min(...args)
}
