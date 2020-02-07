module.exports = function(obj) {
    // e.g. "[object Array]"
    const type = Object.prototype.toString.call(obj)
    return type.split(" ")[1].slice(0, -1)
}
