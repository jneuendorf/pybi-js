// How to subclass 'Set': https://stackoverflow.com/a/50377639/6928824
// How to emulate 'frozenset': https://stackoverflow.com/a/31509864/6928824
class FrozenSet extends Set {
    constructor(iterable) {
        const self = new Set(iterable)
        self.__proto__ = FrozenSet.prototype
        return self
    }

    add = undefined

    clear = undefined

    delete = undefined
}

module.exports = (iterable) => {
    return new FrozenSet(iterable)
}
