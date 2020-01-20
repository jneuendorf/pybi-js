module.exports = (source=0, /*encoding, errors*/) => {
    // TODO: See
    // - https://docs.python.org/3/library/functions.html#bytearray
    // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
    // - https://stackoverflow.com/a/21797381/6928824
    return new Uint8Array(source)
}
