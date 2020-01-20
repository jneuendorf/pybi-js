const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor

module.exports = x => {
    return x instanceof Function || x instanceof AsyncFunction
}
