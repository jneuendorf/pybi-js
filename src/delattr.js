const callable = require('./callable')
const {AttributeError} = require('./_errors')

module.exports = (...args) => {
    const n = args.length
    if (n !== 2) {
        throw new TypeError(`delattr expected 2 arguments, got ${n}`)
    }

    const [object, name] = args
    if (object == null) {
        throw new AttributeError(`'${object}' has no attribute '${name}'`)
    }

    if (object.__delattr__) {
        if (callable(object.__delattr__)) {
            object.__delattr__(name)
            return
        }
        else {
            throw new TypeError(
                `'${object.__delattr__.constructor.name}' object is not callable`
            )
        }
    }

    // Inherited properies cannot be deleted
    if (!object.hasOwnProperty(name)) {
        throw new AttributeError(
            `'${object.constructor.name}' object has no attribute '${name}'`
        )
    }

    delete object[name]
}
