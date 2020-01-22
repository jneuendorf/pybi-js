// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
module.exports = function* (...iterables) {
    const iterators = iterables.map(iterable => iterable[Symbol.iterator]())
    // const shortestLength = Math.max(...iterables.map(iterable =>))
    while (true) {
        const nexts = iterators.map(iterator => iterator.next())
        if (nexts.some(({done}) => done)) {
            break
        }
        const values = nexts.map(({value}) => value)
        yield values
    }
}
