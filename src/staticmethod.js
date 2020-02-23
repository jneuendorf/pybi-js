// @flow

const callable = require('./callable')
const isClass = require('./_is-class')


/*
From https://github.com/wycats/javascript-decorators:
Because descriptor decorators operate on targets, they also naturally work on static methods. The only difference is that the first argument to the decorator will be the class itself (the constructor) rather than the prototype, because that is the target of the original Object.defineProperty.
*/
function legacy(target, name, descriptor) {
    let cls
    const isStatic = isClass(target)
    // @staticmethod
    // static method() {}
    if (isStatic) {
        cls = target
    }
    // @staticmethod
    // method() {}
    else {
        cls = target.constructor
    }

    const func = descriptor.value
    let unboundMethod = (function() {
        'use strict';
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Strict_Non_Simple_Params
        // We try our best to have `this === undefined` within `func`.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Simple_call
        return function(...args) {
            return func(...args)
        }
    })()

    // Make the method available on both the class in its prototype.
    if (isStatic) {
        cls.prototype[name] = unboundMethod
        return {
            value: unboundMethod
        }
    }
    else {
        cls[name] = unboundMethod
        return {
            value: unboundMethod
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
    'use strict';
    return function(...args) {
        return func.call(undefined, ...args)
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
