const bool = require('./bool')


function* filter(iterable, predicate=bool) {
    for (const item of iterable) {
        if (predicate(item)) {
            yield item
        }
    }
}


module.exports = filter
