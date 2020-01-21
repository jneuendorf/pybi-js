const {AttributeError} = require('./_errors')

module.exports = (...args) => {
    // object, name, defaultVal
    const [object, name, ...rest] = args
    if (object.hasOwnProperty(name)) {
        return object[name]
    }
    if (rest.length === 1) {
        const [defaultVal] = rest
        return defaultVal
    }
    throw new AttributeError(
        `'${object.constructor.name}' object has no attribute '${name}'`
    )
}
