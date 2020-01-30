// How to subclass 'Set': https://stackoverflow.com/a/50377639/6928824
// How to emulate 'frozenset': https://stackoverflow.com/a/31509864/6928824
class FrozenSet extends Set {
    constructor(iterable) {
        const self = new Set(iterable)
        self.__proto__ = FrozenSet.prototype
        self.add = undefined
        self.clear = undefined
        self.delete = undefined
        return self
    }
}

module.exports = (iterable) => {
    return new FrozenSet(iterable)
}
