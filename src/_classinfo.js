const isClass = require('./_is-class')

module.exports = (classinfo, funcName) => {
    if (Array.isArray(classinfo)) {
        classinfo = classinfo.flat(Infinity)
    }
    else {
        classinfo = [classinfo]
    }

    if (classinfo.some(cls => !isClass(cls))) {
        throw new TypeError(
            `${funcName}() arg 2 must be a type or tuple of types`
        )
    }
    return classinfo
}
