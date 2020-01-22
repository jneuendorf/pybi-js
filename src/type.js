const {ValueError} = require('./_errors')

// Object.constructor === Object.constructor.constructor
const getClass = object => {
    return object.constructor
}
const createClass = (name, bases, dict) => {
    const _extends = (
        bases.length > 0
        ? `extends ${bases[0]}`
        : ''
    )
    const cls = eval(`(class ${name} ${_extends} {})`)
    cls.__name__ = name
    cls.__bases__ = bases
    cls.__dict__ = dict
    for (const [key, value] of Object.entries(dict)) {
        if (key === 'constructor') {
            throw new ValueError(`type() Invalid key 'constructor' in 'dict' argument.`)
        }
        // 'value' is an arrow function.
        // See https://stackoverflow.com/questions/28222228/
        if (typeof(value) === 'function' && !value.hasOwnProperty('prototype')) {
            // TODO: Be able to disable this warning.
            // Maybe some kind of setting that could be exposed from pyllute
            // via a 'config' function
            console.warn(
                `type() You used an arrow function as value for key '${key}' `
                + `of the class dict.`
            )
        }
        cls.prototype[key] = value
    }
    return cls
}

module.exports = (...args) => {
    if (args.length === 1) {
        return getClass(...args)
    }
    else if (args.length === 3) {
        return createClass(...args)
    }
    else {
        throw new TypeError('Invalid number of arguments.')
    }
}
