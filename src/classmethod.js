/*
From https://github.com/wycats/javascript-decorators:
Because descriptor decorators operate on targets, they also naturally work on static methods. The only difference is that the first argument to the decorator will be the class itself (the constructor) rather than the prototype, because that is the target of the original Object.defineProperty.
*/
module.exports = (target, name, descriptor) => {
    // TODO: is this actually correct?
    target.constructor[name] = descriptor.value
}
