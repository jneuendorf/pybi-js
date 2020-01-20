module.exports = x => {
    if (x.__repr__) {
        return x.__repr__()
    }
    // TODO
    return x.toString()
}
