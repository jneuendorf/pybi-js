const len = require('./len')

module.exports = x => {
    if (x instanceof Object) {
        return len(x) > 0
    }
    return !!x
}
