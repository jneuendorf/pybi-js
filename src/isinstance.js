const normalizeClassinfo = require('./_classinfo')
const toObject = require('./_to-object')

module.exports = (...args) => {
    const n = args.length
    if (n !== 2) {
        throw new TypeError(`isinstance expected 2 arguments, got ${n}`)
    }
    let [object, classinfo] = args
    const normalizedClassinfo = normalizeClassinfo(classinfo, 'isinstance')
    object = toObject(object)
    for (const cls of normalizedClassinfo) {
        if (object instanceof cls) {
            return true
        }
    }
    return false
}
