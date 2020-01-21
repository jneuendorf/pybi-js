module.exports = object => {
    if (!object) {
        // TODO: There seems to be no way to get the current local scope.
        return []
    }
    if (object.__dir__) {
        return object.__dir__()
    }
    const attrs = []
    let cls, prototype

    // 'object' is a class.
    if (object.prototype && object.prototype.constructor) {
        cls = object
        // This would be the prototype but we don't want to list the
        // prototype's properties in this case.
        // prototype = cls.prototype
    }
    // 'object' is some class'es instance.
    else {
        prototype = Object.getPrototypeOf(object)
        cls = prototype.constructor
    }

    // TODO: This is currently non-recursive.
    attrs.push(...Object.keys(cls))
    if (prototype) {
        attrs.push(...Object.keysprototypecls))
    }
    return attrs
}
