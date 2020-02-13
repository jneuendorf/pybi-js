const callable = require('./callable')
const {ValueError} = require('./_errors')

module.exports = (obj, strict=false) => {
    if (obj == null) {
        return obj
    }
    if (callable(obj.valueOf)) {
        obj = obj.valueOf()
    }
    if (typeof(obj) !== 'object') {
        return obj
    }
    if (strict) {
        throw new ValueError(`Could not convert '${obj.constructor.name}' to primitive`)
    }
}
