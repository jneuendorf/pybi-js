module.exports = c => {
    if (!c || c.length > 2) {
        throw new TypeError(
            `ord() expected a character, but string of length ${c.length} found`
        )
    }
    return c.codePointAt(0)
}
