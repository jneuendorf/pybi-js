// Ported from https://github.com/python/cpython/blob/919f0bc8c904d3aa13eedb2dd1fe9c6b0555a591/Lib/string.py#L174

const ascii = require('./ascii')
const getattr = require('./getattr')
const repr = require('./repr')
const str = require('./str')
const {ValueError} = require('./_errors')


///////////////////////////////////////////////////////////////////////////////
// the Formatter class
// see PEP 3101 for details and purpose of this class
// The hard parts are reused from the C implementation.  They're exposed as "_"
// prefixed methods of str.
// The overall parser is implemented in _string.formatter_parser.
// The field name parser is implemented in _string.formatter_field_name_split

class Formatter {
    format(format_string, ...args) {
        return this.vformat(format_string, args)
    }

    vformat(format_string, args, kwargs={}) {
        const used_args = new Set()
        const [result, _] = self._vformat(format_string, args, kwargs, used_args, 2)
        self.check_unused_args(used_args, args, kwargs)
        return result
    }

    _vformat(format_string, args, kwargs, used_args, recursion_depth, auto_arg_index=0) {
        if (recursion_depth < 0) {
            throw new ValueError('Max string recursion exceeded')
        }
        const result = []
        for (const item of self.parse(format_string)) {
            let [literal_text, field_name, format_spec, conversion] = item

            // output the literal text
            if (literal_text) {
                result.push(literal_text)
            }

            // if there's a field, output it
            if (field_name !== undefined) {
                // this is some markup, find the object and do the formatting

                // handle arg indexing when empty field_names are given.
                if (field_name === '') {
                    if (auto_arg_index === false) {
                        throw new ValueError(
                            'cannot switch from manual field specification to '
                            + 'automatic field numbering'
                        )
                    }
                    field_name = str(auto_arg_index)
                    auto_arg_index += 1
                }
                else if (field_name.isdigit()) {
                    if (auto_arg_index) {
                        throw new ValueError(
                            'cannot switch from manual field specification to '
                            + 'automatic field numbering'
                        )
                    }
                    // disable auto arg incrementing, if it gets
                    //  used later on, then an exception will be raised
                    auto_arg_index = false
                }

                // given the field_name, find the object it references
                //  and the argument it came from
                obj, arg_used = self.get_field(field_name, args, kwargs)
                used_args.add(arg_used)

                // do any conversion on the resulting object
                obj = self.convert_field(obj, conversion)

                // expand the format spec, if needed
                ;[format_spec, auto_arg_index] = self._vformat(
                    format_spec, args, kwargs,
                    used_args, recursion_depth - 1,
                    auto_arg_index)

                // format the object and append to the result
                result.push(self.format_field(obj, format_spec))
            }
        }

        return [''.join(result), auto_arg_index]
    }

    get_value(key, args, kwargs) {
        if (Number.isInteger(key)) {
            return args[key]
        }
        else {
            return kwargs[key]
        }
    }

    check_unused_args(used_args, args, kwargs) {
        return
    }

    format_field(value, format_spec) {
        return format(value, format_spec)
    }

    convert_field(value, conversion) {
        // do any conversion on the resulting object
        if (conversion === undefined) {
            return value
        }
        else if (conversion === 's') {
            return str(value)
        }
        else if (conversion === 'r') {
            return repr(value)
        }
        else if (conversion === 'a') {
            return ascii(value)
        }
        throw new ValueError("Unknown conversion specifier {0!s}".format(conversion))
    }

    // returns an iterable that contains tuples of the form:
    // (literal_text, field_name, format_spec, conversion)
    // literal_text can be zero length
    // field_name can be None, in which case there's no
    //  object to format and output
    // if field_name is not None, it is looked up, formatted
    //  with format_spec and conversion and then used
    parse(format_string) {
        return _string.formatter_parser(format_string)
    }

    // given a field_name, find the object it references.
    //  field_name:   the field being looked up, e.g. "0.name"
    //                 or "lookup[3]"
    //  used_args:    a set of which args have been used
    //  args, kwargs: as passed in to vformat
    get_field(field_name, args, kwargs) {
        first, rest = _string.formatter_field_name_split(field_name)
        obj = self.get_value(first, args, kwargs)

        // loop through the rest of the field_name, doing
        //  getattr or getitem as needed
        for (const [is_attr, i] of rest) {
            if (is_attr) {
                obj = getattr(obj, i)
            }
            else {
                obj = obj[i]
            }
        }

        return [obj, first]
    }
}


module.exports = function() {

}
