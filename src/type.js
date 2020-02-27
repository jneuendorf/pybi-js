const callable = require('./callable')
const isClass = require('./_is-class')
const toObject = require('./_to-object')
const {config: {type_warnArrow}} = require('./_config')
const {ValueError} = require('./_errors')


// Object.constructor === Object.constructor.constructor
const getClass = object => {
    return (
        object != null
        ? toObject(object).constructor
        : undefined
    )
}

const createClass = (name, bases, dict) => {
    let base
    if (Array.isArray(bases)) {
        if (bases.length > 1) {
            throw new ValueError('Only a single base is supported')
        }
        base = bases[0]
    }
    else {
        base = bases
    }
    if (base && !isClass(base)) {
        throw new TypeError('base is not a class')
    }

    const _extends = (
        base
        // ? `extends ${bases[0]}`
        ? `extends base`
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
        /* istanbul ignore next */
        if (typeof(value) === 'function'
            && !value.hasOwnProperty('prototype')
            && type_warnArrow
        ) {
            console.warn(
                `type() You used an arrow function as value for key '${key}' `
                + `of the class dict.`
            )
        }
        if (callable(value)) {
            if (
                value.hasOwnProperty('__classmethod__')
                && value.__classmethod__ === true
            ) {
                cls[key] = value
            }
        }
        // Non-callables are accessible from the class and the instance:
        // class A:
        //     a = 1
        else {
            cls[key] = value
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
        throw new TypeError('type() takes 1 or 3 arguments')
    }
}
