const bool = require('./bool')

module.exports = iterable => {
    for (const item of iterable) {
        if (bool(item)) {
            return true
        }
    }
    return false
}
