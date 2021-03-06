const isinstance = require('./isinstance')
const type = require('./type')
const Bytes = require('./_bytes')
const decode = require('./_decode')
const toObject = require('./_to-object')


module.exports = function(name, eval_expression) {
    // See https://stackoverflow.com/a/29456463/6928824
    function _eval(...args) {
        const n = args.length
        if (n < 1) {
            throw new TypeError(`${name} expected at least 1 argument, got ${n}`)
        }
        if (n > 3) {
            throw new TypeError(`${name} expected at most 3 arguments, got ${n}`)
        }

        const [expression, globals={}, locals={}] = args

        if (!isinstance(toObject(expression), [String, Bytes, Uint8Array])) {
            throw new TypeError(`${name}() arg 1 must be a string or bytes object`)
        }
        if (type(globals) !== Object) {
            throw new TypeError(`globals must be an Object`)
        }
        if (type(locals) !== Object) {
            throw new TypeError(`locals must be an Object`)
        }

        // 'locals' override 'globals' just like scoping works.
        const context = {...globals, ...locals}
        let body = (
            isinstance(toObject(expression), [Bytes, Uint8Array])
            ? decode(expression, 'utf-8')
            : expression
        )
        if (eval_expression) {
            body = `(${body})`
        }
        const func = new Function(
            `{${Object.keys(context).join(',')}}`,
            `return eval('${body}')`
        )
        return func(context)
    }

    return _eval
}
