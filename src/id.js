let i = 0
const objectIdMap = new WeakMap()
const primitiveIdMaps = {
    string: {},
    number: {},
    boolean: {},
    bigint: {},
    symbol: {},
}
const primitives = new Set(['string', 'number', 'boolean', 'bigint', 'symbol'])


module.exports = object => {
    const type = typeof(object)
    if (primitives.has(type)) {
        const map = primitiveIdMaps[type]
        if (map.hasOwnProperty(object)) {
            return map[object]
        }
        const id = i
        i += 1
        map[object] = id
        return id
    }
    else {
        if (objectIdMap.has(object)) {
            return objectIdMap.get(object)
        }
        const id = i
        i += 1
        objectIdMap.set(object, id)
        return id
    }
}
