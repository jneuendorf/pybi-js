const isIterable = require('./_is-iterable')
const {ValueError} = require('./_errors')


module.exports = (iterable, start=0) => {
    if (!isIterable(iterable)) {
        if (iterable && iterable.constructor === Object) {
            // make 'Object' instances iterable because 'dict's can be iterated in Python.
            // Subclasses must implement the iterator protocal themselves.
            iterable = Object.keys(iterable)
        }
        else {
            throw new ValueError(`enumerate() arg 0 needs to be iterable`)
        }
    }

    let index = start
    const result = []
    for (const item of iterable) {
        result.push([index, item])
        index += 1
    }
    return result
}
