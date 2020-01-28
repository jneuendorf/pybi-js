const callable = require('./callable')
const enumerate = require('./enumerate')


module.exports = object => {
    // E.g. built-in 'Array'
    if (typeof(object.length) === 'number') {
        return object.length
    }
    // E.g. built-in 'Map'
    if (typeof(object.size) === 'number') {
        return object.size
    }
    if (callable(object.__len__)) {
        return object.__len__()
    }
    // assume object
    return enumerate(object).length
}
