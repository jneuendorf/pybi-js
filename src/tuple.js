const isIterable = require('./_is-iterable')

module.exports = (...args) => {
    const n = args.length
    if (n === 0) {
        return []
    }

    if (n > 1) {
        throw new TypeError(`tuple expected at most 1 arguments, got ${n}`)
    }

    // Here we know: 'n == 1'. But it can still be 'null'/'undefined'.
    let [iterable] = args
    if (iterable && iterable.constructor === Object) {
        return Object.keys(iterable)
    }

    if (!isIterable(iterable)) {
        throw new TypeError(
            `'${iterable ? iterable.constructor.name : iterable}' object is not iterable`
        )
    }

    return Array.from(iterable)
}
