const {dunder, NO_PROP} = require('./_dunder')
const {AttributeError} = require('./_errors')


const ignore = function() {
    return true
}


module.exports = (...args) => {
    const n = args.length
    if (n !== 3) {
        throw new TypeError(`setattr expected 3 arguments, got ${n}`)
    }

    const [object, name, value] = args
    if (object == null) {
        throw new AttributeError(`'${object}' has no attribute '${name}'`)
    }

    if (dunder(object, '__setattr__', ignore, '', [name, value]) === NO_PROP) {
        object[name] = value
    }
}
