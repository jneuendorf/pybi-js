const fs = require('fs')

const {SEEK_SET, SEEK_CUR} = require('./constants')
const {NotImplementedError, OSError} = require('../_errors')

/*
See https://github.com/python/cpython/blob/942f7a2dea2e95a0fa848329565c0d0288d92e47/Modules/_io/iobase.c
*/
class IOBase {
    constructor(fd, {readable, writable, encoding, bufferSize=16*1024}) {
        this.fd = fd
        this._closed = false
        this._pos = 0
        if (readable) {
            this._readStream = fs.createReadStream(
                undefined,
                {fd, encoding, highWaterMark: bufferSize}
            )
        }
        else {
            this._readStream = null
        }
        if (writable) {
            this._writeStream = fs.createWriteStream(undefined, {fd, encoding})
        }
        else {
            this._writeStream = null
        }

        // if (!bufferSize) {
        //     this.read = undefined
        //     this.write = undefined
        // }
    }

    close() {
        if (this.closed) {
            return
        }

        this._closed = true
        this.flush()
        fs.closeSync(this.fd)
    }

    get closed() {
        return this._closed
    }

    // stub
    fileno() {
        // NotImplementedError?
        return this.fd
    }

    flush() {
        if (this.writable()) {
            // TODO: this._writeStream.end() ?
            // https://stackoverflow.com/a/7127162/6928824
        }
    }

    isatty() {
        // return this._readStream && this._readStream.isTTY
        return false
    }

    read() {
        if (this.closed()) {
            throw new ValueError(``)
        }
        if (!this.readable()) {
            throw new OSError()
        }
    }

    readable() {
        // return this._readStream !== null
        return false
    }

    readline(size=-1) {
        let buffer = new Uint8Array(0)
        while (size < 0 || buffer.length < size) {
            let nreadahead = 1
            let readahead
            if (this.peek) {
                readahead = this.peek()
                // if (!isinstance(readahead, Bytes)) {
                //     throw new OSError(
                //         `peek() should have returned a bytes object, `
                //         + `not '${typeStr(readahead)}'`
                //     )
                // }
                if (readahead.length > 0) {
                    let n = 0
                    const buf = readahead
                    do {
                        if (n >= readahead.length || (size >= 0 && n >= size)) {
                            break
                        }
                        if (chr(buf[n++]) === '\n') {
                            break
                        }
                    } while (true)
                    nreadahead = n
                }
            }

            const b = this.read(nreadahead)
            // if (!isinstance(b, Bytes)) {
            //     throw new OSError(
            //         `read() should have returned a bytes object, `
            //         + `not '${typeStr(readahead)}'`
            //     )
            // }
            const b_size = b.length
            if (b_size === 0) {
                break
            }

            // Extend the buffer by b.
            // TODO: This could maybe be made more efficient by using
            //       ArrayBuffer.transfer in the future.
            const oldSize = buffer.length
            const newSize = oldSize + b_size
            const resizedBuffer = new Uint8Array(newSize)
            resizedBuffer.set(buffer)
            resizedBuffer.set(b, oldSize)
            buffer = resizedBuffer

            if (String.fromCodePoint(buffer[newSize - 1]) === '\n') {
                break
            }
        }
    }

    readlines(hint=-1) {

    }

    // stub
    seek(offset, whence=SEEK_SET) {
        if (!this.seekable()) {
            throw new OSError()
        }
        // https://stackoverflow.com/a/39990849/6928824
    }

    /* > This method may need to do a test seek(). */
    seekable() {
        return false
    }

    tell() {
        return this.seek(0, SEEK_CUR)
    }

    // stub
    truncate() {
        if (!this.seekable()) {
            throw new OSError()
        }
        if (!this.writable()) {
            throw new OSError()
        }
    }

    write() {
        if (this.closed()) {
            throw new ValueError(``)
        }
        if (!this.writable()) {
            throw new OSError()
        }
    }

    writable() {
        // return this._writeStream !== null
        return false
    }

    writelines() {

    }

    __del__() {
        this.close()
    }

    // TODO iterator/iterable
}


module.exports = IOBase
