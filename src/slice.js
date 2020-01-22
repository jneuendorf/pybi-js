class Slice {
    constructor(start, stop, step) {
        this.start = start
        this.stop = stop
        this.step = step
        Object.freeze(this)
    }
}

module.exports = (...args) => {
    let start, stop, step
    if (args.length === 1) {
        ([stop] = args)
    }
    else {
        ([start, stop, step] = args)
    }
    return Slice(start, stop, step)
}
