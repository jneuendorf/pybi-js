const {ValueError} = require('./_errors')

module.exports = (...args) => {
    let start, stop, step
    if (args.length === 1) {
        [stop, start=0, step=1] = args
    }
    else {
        [start, stop, step=1] = args
    }

    if (step === 0) {
        throw new ValueError('range() arg 3 must not be zero')
    }

    const range = []
    let i = 0
    while (true) {
        const item = start + step*i
        if (step >= 0 && item < stop || step < 0 && item > stop) {
            range.push(item)
        }
        else {
            break
        }
        i += 1
    }

    return range
}
