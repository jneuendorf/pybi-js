
module.exports =  (target, name, descriptor) => {
    const cls = target.constructor
    // TODO: is this actually correct?
    const method = descriptor.value.bind(null)
    cls[name] = method
}
