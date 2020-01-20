const enumerate = require('./enumerate')


module.exports = iterable => {
    if (typeof(iterable.length) === 'number') {
        return iterable.length
    }
    if (typeof(iterable.size) === 'number') {
        return iterable.size
    }
    if (typeof(iterable.size) === 'function') {
        return iterable.size()
    }
    // assume object
    return enumerate(iterable).length
}
