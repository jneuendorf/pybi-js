const {NotImplementedError} = require('./_errors')

module.exports = object => {
    if (!object) {
        throw new NotImplementedError(
            `vars() without argument is currently not supported.`
        )
    }
    if (object.__dict__) {
        return object.__dict__
    }
    throw new TypeError(
        `vars() argument must have __dict__ attribute`
    )
}
