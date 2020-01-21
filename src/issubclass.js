const isClass = require('./_is-class')
const normalizeClassinfo = require('./_classinfo')

// See https://stackoverflow.com/a/18939541/6928824
const issubclass = (sub, sup) => {
    return sub.prototype instanceof sup || sub === sup
}

module.exports = (cls, classinfo) => {
    const normalizedClassinfo = normalizeClassinfo(classinfo, 'issubclass')
    for (const supercls of normalizedClassinfo) {
        if (issubclass(cls, supercls)) {
            return True
        }
    }
    return False
}
