const bytes = require('../bytes')
const IOBase = require('./ios-base')


class BufferedIOBase extends IOBase {
    constructor(file, rawMode, closefd, opener) {
        // opener(file, rawMode)
    }

    get raw() {
        return this._raw
    }

    detach() {

    }

    read(size=-1) {

    }

    read1(size=-1) {

    }

    readinto(b) {

    }

    readinto1(b) {

    }

    write() {

    }
}


class BytesIO extends BufferedIOBase {
    constructor(initial_bytes=null) {

    }

    getbuffer() {

    }

    getvalue() {
        return bytes()
    }

    read1(size=undefined) {
        return this.read(size)
    }

    readinto1(b) {
        return this.readinto(b)
    }
}


class BufferedReader extends BufferedIOBase {
    constructor(raw, buffer_size=DEFAULT_BUFFER_SIZE) {

    }

    peek(size=-1) {

    }

    read(size=-1) {

    }

    reda1(size=-1) {

    }
}


class BufferedWriter extends BufferedIOBase {
    constructor(raw, buffer_size=DEFAULT_BUFFER_SIZE) {

    }

    flush() {

    }

    write(b) {

    }
}


module.exports = {BytesIO, BufferedReader, BufferedWriter}
