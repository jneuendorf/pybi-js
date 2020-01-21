const NO_DEFAULT = {}

module.exports = (iterator, defaultValue=NO_DEFAULT, throwWhenDone=false) => {
    const {value, done} = iterator.next()
    if (done) {
        if (defaultValue !== NO_DEFAULT) {
            return defaultValue
        }
        if (throwWhenDone) {
            // TODO: message
            throw new StopIteration('Iterator is done.')
        }
        return value
    }
    else {
        return value
    }
}
