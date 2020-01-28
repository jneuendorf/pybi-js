const {StopIteration} = require('./_errors')


const NO_DEFAULT = {}


module.exports = (iterator, defaultValue=NO_DEFAULT) => {
    const {value, done} = iterator.next()
    if (done) {
        if (defaultValue !== NO_DEFAULT) {
            return defaultValue
        }
        throw new StopIteration('')
    }
    else {
        return value
    }
}
