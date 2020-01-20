let namespace
if (typeof(global) !== 'undefined') {
    namespace = global
}
else if (typeof(window) !== 'undefined') {
    namespace = window
}

module.exports = namespace
