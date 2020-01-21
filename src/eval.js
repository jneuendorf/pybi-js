// See https://stackoverflow.com/a/29456463/6928824
module.exports = expression => {
    return eval(`(${expression})`)
}
