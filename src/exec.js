const fac = require('./_eval-factory')

const exec = fac('exec', false)

// See https://stackoverflow.com/a/29456463/6928824
module.exports = (...args) => {
    exec(...args)
    return undefined
}
