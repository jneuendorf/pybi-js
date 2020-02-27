const defaultConfig = {
    classmethod_firstArgClass: true,
    hash_useHashSum: true,
    hash_warnNoHashSum: true,
    format_useSprintf: true,
    format_warnNoSprintf: true,
    type_warnArrow: true,
}

const config = Object.assign({}, defaultConfig)
const reset = (key) => {
    // Reset all
    if (!key) {
        Object.assign(config, defaultConfig)
    }
    // Reset single entry
    else {
        config[key] = defaultConfig[key]
    }
}

module.exports = {
    config,
    reset,
}
