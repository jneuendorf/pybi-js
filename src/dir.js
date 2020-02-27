const {dunder, NO_PROP} = require('./_dunder')
const {NotImplementedError} = require('./_errors')
const isClass = require('./_is-class')
const isIterable = require('./_is-iterable')
const setMinus = require('./_set-minus')
const toObject = require('./_to-object')


const skipNames = new Set(['arguments', 'caller', 'prototype'])


module.exports = object => {
    if (object == null) {
        throw new NotImplementedError(
            'Calling dir() without arguments is not supported'
        )
    }

    const __dir__ = dunder(object, '__dir__', x => isIterable(x), 'dir')
    if (__dir__ !== NO_PROP) {
        return __dir__
    }

    let attrs = []
    let cls
    let prototype
    object = toObject(object)
    if (isClass(object)) {
        cls = object
        // This would be the prototype but we don't want to list the
        // prototype's properties in this case.
        prototype = cls.prototype
    }
    else {
        attrs = attrs.concat(
            Object.getOwnPropertyNames(object),
            Object.getOwnPropertySymbols(object),
        )
        prototype = Object.getPrototypeOf(object)
        cls = prototype.constructor
    }

    while (true) {
        attrs = attrs.concat(
            Object.getOwnPropertyNames(cls),
            Object.getOwnPropertySymbols(cls),
            Object.getOwnPropertyNames(prototype),
            Object.getOwnPropertySymbols(prototype),
        )

        // Well...e.g. subclasses of 'Function' will result in cls.constructor
        // never being 'Object' oO
        if (cls === Object || cls === Function) {
            break
        }

        prototype = Object.getPrototypeOf(prototype)
        cls = prototype.constructor
    }
    const unique_attrs = new Set(attrs)
    return Array.from(setMinus(unique_attrs, skipNames)).sort(function(a, b) {
        // Sort symbols to the end
        if (typeof(a) === 'symbol') {
            return 1
        }
        if (typeof(b) === 'symbol') {
            return -1
        }
        // String sorting
        if (a < b) {
            return -1
        }
        if (a > b) {
            return 1
        }
        return 0
    })
}
