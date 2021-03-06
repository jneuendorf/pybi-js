const callable = require('./callable')
const {ValueError} = require('./_errors')

module.exports = (obj, strict=false) => {
    if (obj == null) {
        return obj
    }
    if (callable(obj.valueOf)) {
        obj = obj.valueOf()
    }
    if (typeof(obj) !== 'object') {
        return obj
    }
    if (strict) {
        throw new ValueError(`Could not convert '${obj.constructor.name}' to primitive`)
    }
}

/*
from babel:

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
*/
