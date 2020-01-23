const callable = require('./callable')

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
