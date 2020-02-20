const isClass = require('./_is-class')
const normalizeClassinfo = require('./_classinfo')

// See https://stackoverflow.com/a/18939541/6928824
const issubclass = (sub, sup) => {
    return sub.prototype instanceof sup || sub === sup
}

module.exports = (...args) => {
    const n = args.length
    if (n !== 2) {
        throw new TypeError(`issubclass expected 2 arguments, got ${n}`)
    }
    const [cls, classinfo] = args
    if (!cls || !cls.prototype) {
        throw new TypeError(`issubclass() arg 1 must be a class`)
    }
    const normalizedClassinfo = normalizeClassinfo(classinfo, 'issubclass')
    for (const supercls of normalizedClassinfo) {
        if (issubclass(cls, supercls)) {
            return true
        }
    }
    return false
}
