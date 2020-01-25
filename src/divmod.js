const mod = require('./_mod')


function floordir(x, y) {
    return (
        x === Infinity || x === -Infinity
        ? NaN
        : Math.floor(x / y)
    )
}


module.exports = (x, y) => {
    return [
        floordir(x, y),
        mod(x, y),
    ]
}
