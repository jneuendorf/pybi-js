const Console = console.Console

const defaultKwargs = {
    sep: ' ',
    end: '',
    file: (
        typeof(process) !== 'undefined'
        ? process.stdout
        : undefined
    ),
    // 'flush' is standard in NodeJS: https://stackoverflow.com/a/12510946/6928824
    flush: false,
}

module.exports = {
    simple: console.log,
    extended: (...args) => {
        let kwargs = defaultKwargs
        if (args.length > 0) {
            const lastArg = args.slice(-1)[0]
            if (lastArg && lastArg.hasOwnProperty('__kwargs__')) {
                delete lastArg.__kwargs__
                kwargs = Object.assign({}, kwargs, lastArg)
                args = args.slice(0, -1)
            }
        }

        let c = console
        if (Console) {
            c = new Console({stdout: defaultKwargs.file})
        }

        args.push(kwargs.end)

        if (kwargs.sep !== defaultKwargs.sep) {
            // NOTE: Wrapping in Array to prevent the String being used as
            // iterable so that all chars are logging separately.
            args = [args.join(kwargs.sep)]
        }

        if (kwargs.flush && c.clear) {
            c.clear()
        }
        c.log(...args)
    }
}
