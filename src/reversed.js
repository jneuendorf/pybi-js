const callable = require('./callable')
const len = require('./len')

module.exports = (...args) => {
    const n = args.length
    if (n !== 1) {
        throw new TypeError(`reversed expected 1 argument, got ${n}`)
    }

    const [seq] = args

    if (seq == null) {
        throw new TypeError(`'${seq}' is not reversible`)
    }

    if (seq.__reversed__) {
        if (callable(seq.__reversed__)) {
            return seq.__reversed__()
        }
        else {
            throw new TypeError(`'${seq.constructor.name}' object is not callable`)
        }
    }

    let i = len(seq) - 1

    return {
        next() {
            if (i < 0) {
                return {done: true}
            }
            const next = {
                // It may seem like an overhead to check for the method every
                // step but while iterating the method could be defined.
                value: seq.__getitem__ ? seq.__getitem__(i) : seq[i],
                done: false,
            }
            i -= 1
            return next
        },
        [Symbol.iterator]: function() {
            return this
        }
    }
    // return [...seq].reverse()
}
