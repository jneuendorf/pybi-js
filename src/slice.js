module.exports = (...args) => {
    const n = args.length
    if (n < 1) {
        throw new TypeError(`slice expected at least 1 argument, got ${n}`)
    }
    if (n > 3) {
        throw new TypeError(`slice expected at most 3 arguments, got ${n}`)
    }

    let start, stop, step
    if (args.length === 1) {
        ;[stop] = args
    }
    else {
        ;[start, stop, step] = args
    }
    return Object.freeze({start, stop, step})
}
