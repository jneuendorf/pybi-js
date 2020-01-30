const callable = require('./callable')
const len = require('./len')

module.exports = x => {
    if (x == null) {
        return false
    }

    if (callable(x.__bool__)) {
        const res = x.__bool__()
        if (typeof(res) === 'boolean') {
            return res
        }
        throw new TypeError(
            `__bool__ should return bool, returned ${res.constructor.name}`
        )
    }

    if (x instanceof Object) {
        return len(x) > 0
    }
    return !!x
}
