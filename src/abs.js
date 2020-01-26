const abs = Math.abs

module.exports = {
    simple: abs,
    extended: x => {
       if (x.__abs__) {
           return x.__abs__()
       }
       return abs(x)
   },
}
