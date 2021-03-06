module.exports = (...args) => {
    const n = args.length
    if (n !== 2) {
        throw new TypeError(`hasattr expected 2 arguments, got ${n}`)
    }

    const [object, name] = args
    if (
        object.hasOwnProperty(name)
        // Implicit inheritance lookup for non-undefined (for performance).
        || object[name] !== undefined
    ) {
        return true
    }

    // Check the inheritance chain because there may be a property with value
    // 'undefined' on some subperclass'es prototype.
    let proto = Object.getPrototypeOf(object)
    while (true) {
        if (proto.hasOwnProperty(name)) {
            return true
        }
        const newProto = Object.getPrototypeOf(proto.constructor.prototype)
        if (newProto && newProto !== proto) {
            proto = newProto
        }
        else {
            break
        }
    }
    return false
}
