module.exports = {
    simple: Math.abs,
    extended: x => {
       if (x.__abs__) {
           return x.__abs__()
       }
       return Math.abs
   },
}
