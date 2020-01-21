// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
module.exports = function* (func, ...iterables) {
    const iterators = iterables.map(iterable => iterable[Symbol.iterator]())
    // const shortestLength = Math.max(...iterables.map(iterable =>))
    while (true) {
        const nexts = iterators.map(iterator => iterator.next())
        if (nexts.some(({done}) => done)) {
            break
        }
        const args = nexts.map(({value}) => value)
        yield func(...args)
    }
}
