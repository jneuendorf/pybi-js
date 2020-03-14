const IOBase = require('./ios-base')


class RawIOBase extends IOBase {
    constructor(file, rawMode, closefd, opener) {
        // opener(file, rawMode)
    }

    read(size=-1) {

    }

    readall() {

    }

    readinto(b) {

    }

    write(b) {

    }
}


module.exports = RawIOBase
