const bool = require('./bool')


function* filter(...args) {
    let iterable, predicate
    if (args.length === 2) {
        [predicate, iterable] = args
    }
    else if (args.length === 1) {
        predicate = bool
        ;[iterable] = args
    }
    else {
        throw new TypeError(
            `filter() takes 1 or 2 arguments but ${args.length} were given`
        )
    }
    for (const item of iterable) {
        if (predicate(item)) {
            yield item
        }
    }
}


module.exports = filter
