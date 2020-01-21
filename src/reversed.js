module.expors = seq => {
    if (seq.__reversed__) {
        return seq.__reversed__()
    }

    return [...seq].reverse()
}
