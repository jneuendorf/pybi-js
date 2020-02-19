const callable = require('./callable')
const hasattr = require('./hasattr')
const {AttributeError} = require('./_errors')

module.exports = (...args) => {
    const n = args.length
    if (n < 2) {
        throw new TypeError(`getattr expected at least 2 arguments, got ${n}`)
    }
    if (n > 3) {
        throw new TypeError(`getattr expected at most 3 arguments, got ${n}`)
    }

    const [object, name, defaultVal] = args
    if (object == null) {
        throw new AttributeError(`'${object}' has no attribute '${name}'`)
    }

    try {
        if (object.__getattr__) {
            if (callable(object.__getattr__)) {
                return object.__getattr__(name)
            }
            else {
                throw new TypeError(
                    `'${object.__getattr__.constructor.name}' object is not callable`
                )
            }
        }

        if (hasattr(object, name)) {
            return object[name]
        }
        else {
            throw new AttributeError(
                `'${object.constructor.name}' object has no attribute '${name}'`
            )
        }
    }
    catch (error) {
        if (error instanceof AttributeError && n === 3) {
            return defaultVal
        }
        throw error
    }
}
