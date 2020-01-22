const zip = require('./zip')

module.exports = function* (func, ...iterables) {
    for (const args of zip(...iterables)) {
        yield func(...args)
    }
}
