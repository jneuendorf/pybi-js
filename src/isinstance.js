const isClass = require('./_is-class')
const normalizeClassinfo = require('./_classinfo')
const toObject = require('./_to-object')

module.exports = (object, classinfo) => {
    const normalizedClassinfo = normalizeClassinfo(classinfo, 'isinstance')
    object = toObject(object)
    for (const cls of normalizedClassinfo) {
        if (object instanceof cls) {
            return true
        }
    }
    return false
}
