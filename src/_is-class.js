module.exports = object => {
    return object.prototype && object.prototype.constructor === object
}
