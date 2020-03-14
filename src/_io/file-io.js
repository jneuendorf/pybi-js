const RawIOBase = require('./raw-ios-base')


class FileIO extends RawIOBase {
    constructor(name, mode='r', closefd=true, opener=undefined) {
        super(name, mode, closefd, opener)
        this._name = name
        this._mode = mode
    }

    get name() {
        return this._name
    }

    get mode() {
        return this._mode
    }
}


module.exports = FileIO
