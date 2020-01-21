const isClass = require('./_is-class')
const normalizeClassinfo = require('./_classinfo')

module.exports = (object, classinfo) => {
    const normalizedClassinfo = normalizeClassinfo(classinfo, 'isinstance')
    for (const cls of normalizedClassinfo) {
        if (object instanceof cls) {
            return True
        }
    }
    return False
}
