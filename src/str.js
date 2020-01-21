module.exports = object => {
    if (object.__str__) {
        return object.__str__()
    }

    // No 'new' => primitive string
    // (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Distinction_between_string_primitives_and_String_objects)
    return String(object)
}
