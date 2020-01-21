// See https://stackoverflow.com/a/29456463/6928824
module.exports = codeString => {
    eval(codeString)
    return
}
