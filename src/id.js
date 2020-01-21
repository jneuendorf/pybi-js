let i = 0
const idMap = new WeakMap()

module.exports = object => {
    if (idMap.has(object)) {
        return idMap.get(object)
    }
    const id = i
    i += 1
    idMap.set(object, id)
    return id
}
