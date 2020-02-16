// @flow

const callable = require('./callable')
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

/*
>>> f = classmethod(lambda cls: cls)
>>> f
<classmethod object at 0x103b50760>
>>> class A:
...   f = f
...
>>> A.f
<bound method <lambda> of <class '__main__.A'>>
>>> A.f()
<class '__main__.A'>
>>> A.f() == A
True
>>> A.f() is A
True
*/
function functionDecorator(func) {
    // Maybe just forward 'this' as 'cls' argument into func..
    // const cls = 1
    return function(...args) {
        const cls = this
        return func(cls, ...args)
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
