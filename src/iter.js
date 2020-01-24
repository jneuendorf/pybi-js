const callable = require('./callable')

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
module.exports = (object, sentinel, equality=(x, y) => x === y) => {
    if (sentinel) {
        try {
            return object[Symbol.iterator]()
        }
        catch (error) {
            throw new TypeError(`'${object.constructor.name}' object is not iterable`)
        }
    }
    else {
        if (!callable(object)) {
            throw new TypeError(`'${object.constructor.name}' object is not callable`)
        }
        return {
            next() {
                const value = object()
                if (equality(value, sentinel)) {
                    return {done: true}
                }
                return {value, done: false}
            },
            [Symbol.iterator]: function() {
                return this
            }
        }
    }
}
