// https://developer.mozilla.org/en-US/docs/Glossary/Primitive#Primitive_wrapper_objects_in_JavaScript
module.exports = object => {
    const typeOfObject = typeof(object)
    if (typeOfObject === 'string') {
        return new String(object)
    }
    if (typeOfObject === 'number') {
        return new Number(object)
    }
    if (typeOfObject === 'boolean') {
        return new Boolean(object)
    }
    if (typeOfObject === 'bigint' || typeOfObject === 'symbol') {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Type_information
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Description
        return new Object(object)
    }

    return object
}
