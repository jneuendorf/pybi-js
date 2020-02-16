// @flow

const callable = require('./callable')
const isClass = require('./_is-class')
const {config: {classmethod_firstArgClass}} = require('./_config')

/*
From https://github.com/wycats/javascript-decorators:
Because descriptor decorators operate on targets, they also naturally work on static methods. The only difference is that the first argument to the decorator will be the class itself (the constructor) rather than the prototype, because that is the target of the original Object.defineProperty.
*/
function legacy(target, name, descriptor) {
    const cls = target.constructor
    // TODO: is this actually correct?
    const method = descriptor.value.bind(cls)
    if (classmethod_firstArgClass) {
        cls[name] = function(...args) {
            return method(cls, ...args)
        }
    }
    else {
        cls[name] = method
    }
}

function current({descriptor, key, kind, replacement}) {
    // E.g.
    // descriptor:
    //     configurable: true
    //     enumerable: false
    //     value: ƒ method()
    //     writable: true
    // key: "method"
    // kind: "method" / "field"
    // placement: "prototype"
}


function functionDecorator(func) {
    let cls
    return function(...args) {
        if (!cls) {
            if (isClass(this)) {
                cls = this
            }
            else {
                throw new TypeError(
                    `Methods decorated with classmethod() must be called on `
                    `the class at least once before being called without `
                    `context`
                )
            }
        }
        // This behavoir is unpythonic but documented.
        else {
            if (cls && cls !== this && isClass(this)) {
                throw new TypeError(
                    `Can't use an 'instance of classmethod' with multiple `
                    `classes. See caveats`
                )
            }
        }
        if (classmethod_firstArgClass) {
            return func.call(cls, cls, ...args)
        }
        return func.call(cls, ...args)
    }
}

module.exports = (...args) => {
    if (args.length === 3) {
        return legacy(...args)
    }
    if (args.length === 1) {
        const [arg] = args
        if (callable(arg)) {
            return functionDecorator(arg)
        }
        return current(arg)
    }
    throw new TypeError('Invalid arguments')
}
