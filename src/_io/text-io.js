const IOBase = require('./ios-base')


class TextIOBase extends IOBase {
    constructor(buffer, encoding, errors, newline, line_buffering, write_through) {
        this._buffer = buffer
        this._encoding = encoding
        this._errors = errors
        this._newline = newline
        this._line_buffering = line_buffering
        this._write_through = write_through
    }

    get encoding() {
        return this._encoding
    }

    get errors() {
        return this._errors
    }

    get newlines() {
        return 0
    }

    get buffer() {
        return this._buffer
    }

    detach() {

    }

    read(size=-1) {

    }

    readline(size=-1) {

    }

    seek(offset, whence=SEEK_SET) {

    }

    tell() {

    }

    write(s) {

    }
}


class TextIOWrapper extends TextIOBase {
    constructor(buffer,
                encoding=undefined,
                errors=undefined,
                newline=undefined,
                line_buffering=false,
                write_through=false) {
        super(buffer, encoding, errors, newline)
        this._line_buffering = line_buffering
        this._write_through = write_through
    }

    get line_buffering() {
        return this._line_buffering
    }

    get write_through() {
        return this._write_through
    }

    reconfigure(encoding, errors, newline, line_buffering, write_through) {
        this.flush()

        if (encoding && !this._data_was_read) {
            this._encoding = encoding
        }
        if (errors) {
            this._errors = errors
        }
        else {
            if (encoding) {
                this._errors = 'strict'
            }
        }
        if (newline && !this._data_was_read) {
            this._newline = newline
        }
        if (line_buffering) {
            this._line_buffering = line_buffering
        }
        if (write_through) {
            this._write_through = write_through
        }
    }
}


class StringIO extends TextIOBase {
    constructor(initial_bytes='', newline='\n') {

    }

    getvalue() {

    }
}


module.exports = {
    TextIOWrapper,
    StringIO,
}
