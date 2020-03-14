// const fs = require('fs')


/*
https://github.com/python/cpython/blob/942f7a2dea2e95a0fa848329565c0d0288d92e47/Modules/_io/_iomodule.c#L273-L374
*/
function decodeMode(mode) {
    let creating = 0,
        reading = 0,
        writing = 0,
        appending = 0,
        updating = 0,
        text = 0,
        binary = 0,
        universal = 0
    let i = 0
    for (const c of mode) {
        switch (c) {
            case 'x':
                creating = 1
                break
            case 'r':
                reading = 1
                break
            case 'w':
                writing = 1
                break
            case 'a':
                appending = 1
                break
            case '+':
                updating = 1
                break
            case 't':
                text = 1
                break
            case 'b':
                binary = 1
                break
            case 'U':
                universal = 1
                reading = 1
                break
            default:
                throw new ValueError(`invalid mode: '${mode}'`)
        }
        /* c must not be duplicated */
        if (mode.slice(i + 1).includes(c)) {
            throw new ValueError(`invalid mode: '${mode}'`)
        }

        i += 1
    }

    /* Parameters validation */
    if (universal) {
        if (creating || writing || appending || updating) {
            throw new ValueError(
                `mode U cannot be combined with 'x', 'w', 'a', or '+'`
            )
        }
        console.warn(`DeprecationWarning: 'U' mode is deprecated`)
        reading = 1
    }
    if (text && binary) {
        throw new ValueError(
            `can't have text and binary mode at once`
        )
    }
    if (creating + reading + writing + appending > 1) {
        throw new ValueError(
            `must have exactly one of create/read/write/append mode`
        )
    }
    return {
        creating,
        reading,
        writing,
        appending,
        updating,
        binary,
    }
}

function modeToFlags(mode) {
    /* NODE:
    The following flags are available wherever the flag option takes a string.
    'a': Open file for appending. The file is created if it does not exist.
    'ax': Like 'a' but fails if the path exists.
    'a+': Open file for reading and appending. The file is created if it does not exist.
    'ax+': Like 'a+' but fails if the path exists.
    'as': Open file for appending in synchronous mode. The file is created if it does not exist.
    'as+': Open file for reading and appending in synchronous mode. The file is created if it does not exist.
    'r': Open file for reading. An exception occurs if the file does not exist.
    'r+': Open file for reading and writing. An exception occurs if the file does not exist.
    'rs+': Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache.
    This is primarily useful for opening files on NFS mounts as it allows skipping the potentially stale local cache. It has a very real impact on I/O performance so using this flag is not recommended unless it is needed.
    This doesn't turn fs.open() or fsPromises.open() into a synchronous blocking call. If synchronous operation is desired, something like fs.openSync() should be used.
    'w': Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
    'wx': Like 'w' but fails if the path exists.
    'w+': Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
    'wx+': Like 'w+' but fails if the path exists.

    PYTHON:
    'r' open for reading (default)
    'w' open for writing, truncating the file first
    'x' open for exclusive creation, failing if the file already exists
    'a' open for writing, appending to the end of the file if it exists
    'b' binary mode
    't' text mode (default)
    '+' open for updating (reading and writing)
    */

    const {
        creating,
        reading,
        writing,
        appending,
        updating,
        binary,
    } = decodeMode(mode)

    let rawMode = ''
    if (creating) {
        rawMode += 'x'
    }
    if (reading) {
        rawMode += 'r'
    }
    if (writing) {
        rawMode += 'w'
    }
    if (appending) {
        rawMode += 'a'
    }
    if (updating) {
        rawMode += '+'
    }
    return {
        rawMode,
        creating,
        reading,
        writing,
        appending,
        updating,
        binary,
    }
}

const positionalArgs = [
    'file',
    'mode',
    'buffering',
    'encoding',
    'errors',
    'newline',
    'closefd',
    'opener',
]
const argIdxByName = {}
let i = 0
for (const posArg of positionalArgs) {
    argIdxByName[posArg] = i
    i += 1
}


module.exports = function(...args) {
    const lastArg = args.slice(-1)[0]
    // Keyword arguments provided
    if (lastArg && lastArg.constructor === Object) {
        for (const key in lastArg) {
            args[argIdxByName[key]] = lastArg[key]
        }
    }
    // else: Positional arguments only => don't change unpacked args.

    const [
        file,
        mode='r',
        ,
        encoding='utf8',
        errors=null,
        newline=null,
        closefd=true,
        opener=null,
    ] = args
    let [,,buffering=-1] = args

    if (file == null) {
        throw new TypeError(`open() missing required argument 'file' (pos 1)`)
    }

    const {
        rawMode,
        creating,
        reading,
        writing,
        appending,
        updating,
        binary,
    } = modeToFlags(mode)
    if (binary && encoding !== null) {
        throw new ValueError(
            `binary mode doesn't take an encoding argument`
        )
    }
    if (binary && errors !== null) {
        throw new ValueError(
            `binary mode doesn't take an errors argument`
        )
    }
    if (binary && newline !== null) {
        throw new ValueError(
            `binary mode doesn't take an newline argument`
        )
    }
    if (binary && buffering === 1) {
        console.warn(
            `RuntimeWarning: line buffering (buffering=1) isn't supported in `
            + `binary mode, the default buffer size will be used`
        )
        buffering = -1
    }

    // const raw = RawIOBase(file, rawMode, closefd, opener)
    const raw = FileIO(file, rawMode, closefd, opener)

    /* buffering */
    if (buffering < 0) {
        throw new ValueError('invalid buffering size')
    }
    let line_buffering
    // TODO: How to get 'isatty'?
    if (buffering === 1 /*|| isatty*/) {
        buffering = -1
        line_buffering = true
    }
    else {
        line_buffering = false
    }

    /* if not buffering, returns the raw file object */
    if (buffering === 0) {
        if (!binary) {
            throw new ValueError(`can't have unbuffered text I/O`)
        }
        else {
            return raw
        }
    }

    /* wraps into a buffered file */
    let BufferedClass
    if (updating) {
        BufferedClass = BufferedIOBase
    }
    else if (creating || writing || appending) {
        BufferedClass = BufferedWriter
    }
    else if (reading) {
        BufferedClass = BufferedReader
    }
    else {
        throw new ValueError(`unknown mode: '${mode}'`)
    }
    buffer = new BufferedClass(raw, buffering)

    /* if binary, returns the buffered file */
    if (binary) {
        return buffer
    }

    /* wraps into a TextIOWrapper */
    return new TextIOWrapper(
        buffer, encoding, errors, newline, line_buffering
    )
    // try {
    //     const fd = fs.openSync(file, flags)
    //     return new IOBase(fd, {readable, writable, encoding, bufferSize})
    // }
    // catch (error) {
    //     throw new OSError(error.message)
    // }
}
