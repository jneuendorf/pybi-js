// @flow

const callable = require('./callable')
// const {BaseFunction} = require('./_base-function')
const isClass = require('./_is-class')
const {config: {classmethod_firstArgClass}} = require('./_config')


// class ClassMethod extends BaseFunction {
//     constructor() {
//
//     }
//     __call__() {
//
//     }
// }



/*
From https://github.com/wycats/javascript-decorators:
Because descriptor decorators operate on targets, they also naturally work on static methods. The only difference is that the first argument to the decorator will be the class itself (the constructor) rather than the prototype, because that is the target of the original Object.defineProperty.
*/
function legacy(target, name, descriptor) {
    let cls
    const isStatic = isClass(target)
    // @classmethod
    // static method() {}
    if (isStatic) {
        cls = target
    }
    // @classmethod
    // method() {}
    else {
        cls = target.constructor
    }

    let boundMethod
    if (classmethod_firstArgClass) {
        boundMethod = descriptor.value.bind(cls, cls)
    }
    /* istanbul ignore next */
    else {
        boundMethod = descriptor.value.bind(cls)
    }
    boundMethod.__classmethod__ = true

    // Make the method available on both the class in its prototype.
    if (isStatic) {
        cls.prototype[name] = boundMethod
        return {
            value: boundMethod
        }
    }
    else {
        cls[name] = boundMethod
        return {
            value: boundMethod
        }
    }
}

function current(element) {
    const {descriptor, key, kind, placement} = element
    // descriptor:
    //     configurable: true
    //     enumerable: false
    //     value: ƒ method()
    //     writable: true
    // key: "method"
    // kind: "method" / "field"
    // placement: "prototype" / "static"

    /* istanbul ignore next */
    if(!['static', 'prototype'].includes(placement)) {
        throw new ValueError(`Unexpected placement '${placement}'`)
    }
    return {
        descriptor: {
            ...descriptor,
            value: functionDecorator(descriptor.value)
        },
        key,
        kind,
        placement: 'static'
    }
}


function functionDecorator(func) {
    let cls
    function wrapper(...args) {
        if (!cls) {
            if (isClass(this)) {
                cls = this
            }
            else {
                throw new TypeError(
                    `Methods decorated with classmethod() must be called on `
                    + `the class at least once before being called without `
                    + `context`
                )
            }
        }
        // This behavoir is unpythonic but documented.
        else {
            if (cls !== this && isClass(this)) {
                throw new TypeError(
                    `Can't use an 'instance of classmethod' with multiple `
                    + `classes. See caveats`
                )
            }
        }
        if (classmethod_firstArgClass) {
            return func.call(cls, cls, ...args)
        }
        /* istanbul ignore next */
        return func.call(cls, ...args)
    }
    wrapper.__classmethod__ = true
    return wrapper
}

const classmethod = (...args) => {
    if (args.length === 3) {
        // console.log('legacy')
        return legacy(...args)
    }
    if (args.length === 1) {
        const [arg] = args
        if (callable(arg)) {
            // console.log('func')
            return functionDecorator(arg)
        }
        // console.log('current')
        return current(arg)
    }
    throw new TypeError('Invalid arguments')
}


module.exports = classmethod
