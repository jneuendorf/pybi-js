const isinstance = require('./isinstance')
const type = require('./type')
const Bytes = require('./_bytes')
const toObject = require('./_to-object')


// See https://stackoverflow.com/a/29456463/6928824
module.exports = (...args) => {
    const n = args.length
    if (n < 1) {
        throw new TypeError(`eval expected at least 1 argument, got ${n}`)
    }
    if (n > 3) {
        throw new TypeError(`eval expected at most 3 arguments, got ${n}`)
    }

    const [expression, globals={}, locals={}] = args

    if (!isinstance(toObject(expression), [String, Bytes])) {
        throw new TypeError(`eval() arg 1 must be a string or bytes object`)
    }
    if (type(globals) !== Object) {
        throw new TypeError(`globals must be an Object`)
    }
    if (type(locals) !== Object) {
        throw new TypeError(`locals must be an Object`)
    }

    // 'locals' override 'globals' just like scoping works.
    const context = {...globals, ...locals}
    const func = new Function(
        `{${Object.keys(context).join(',')}}`,
        `return eval('(${expression})')`
    )
    return func(context)
}
