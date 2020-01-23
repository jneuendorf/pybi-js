# pyllute

Pollute a namespace (global, window supported) with JS implementation of (most of) Python's built-in functions


## Install

```bash
npm install --save pyllute
# or
yarn add pyllute
```


## Usage

```javascript
import {install} from 'pyllute'
// or
// const {install} = require('pyllute')


// The global namespace is polluted by default:
install()
// Now you can do something like
print(list(zip([1,2,3], [4,5,6], [7,8,9,10])))

// Optionally install into a certain namespace:
install(MyApp)

// or just have all functions in one place:
py3funcs = install({})
// Now you could also use the functions without pollution:
(function({print, list, zip}) {
    print(list(zip([1,2,3], [4,5,6], [7,8,9,10])))
})(py3funcs)
// or shorter:
(function({print, list, zip}) {
    print(list(zip([1,2,3], [4,5,6], [7,8,9,10])))
})(install({}))
```


## [Python3 built-in functions](https://docs.python.org/3/library/functions.html)

- [ ] :x: `__import__()`
    - Nope sorry, not messin' with this kinda stuff.
- [x] `abs()`
- [x] `all()`
- [x] `any()`
- [x] `ascii()`
    - This lib's implementation should be :ok_hand:.
- [x] `bin()`
- [x] `bool()`
- [x] `breakpoint()`
- [x] `bytearray()`
- [x] `bytes()`
- [x] `callable()`
- [x] `chr()`
- [x] `classmethod()`
- [ ] :stop_sign: `compile()`
    - I guess I could do that using babylon but not for now. :wink:
- [ ] :x: `complex()`
    - There is no JS built-in equivalent (or something similar) that I am aware of.
      We don't want to pollute whole libraries (like [math.js](https://mathjs.org/docs/datatypes/complex_numbers.html)) into somewhere. :wink:
- [x] `delattr()`
- [x] `dict()`
- [x] `dir()`
- [x] `divmod()`
- [x] `enumerate()`
- [x] `eval()` :triangular_flag_on_post:
    - There already is a global `eval` function in JS. :earth_africa:
      But this lib's version wraps the passed expression string in parentheses
      so that its value is returned.
- [x] `exec()`
- [x] `filter()`
- [x] `float()`
- `format()`
- [x] `frozenset()`
- [x] `getattr()`
- [ ] :x: `globals()`
    - Just use `globalThis` (or `window`/`global` respectively) please. :wink:
- [x] `hasattr()`
- [ ] `hash()`
    - Looks like using [`hash-sum`](https://www.npmjs.com/package/hash-sum)
      may be a better idea than an own implementation.
- [ ] :x: `help()`
- [x] `hex()`
- [x] `id()`
- [x] `input()` :triangular_flag_on_post:
    - :exclamation: Asynchronous
- [x] `int()`
- [x] `isinstance()`
- [x] `issubclass()`
- [x] `iter(object, sentinel=undefined, equality=(x, y) => x === y)`  :triangular_flag_on_post:
    - There is an additional argument `equality` that is used for comparing the
      `sentinel` to each iteration's value (i.e. `object()`) because equality
      is not defined as well as in Python.
- [x] `len()`
- [x] `list()`
- [ ] :x: `locals()`
    - There seems to be no way in JavaScript to get the local scope and its variables.
- [x] `map()`
- [x] `max()` :triangular_flag_on_post:
    - Without the keyword arguments.
- [ ] :x: `memoryview()`
    - I am afraid that's not possible.
- [x] `min()`
- [x] `next()` :triangular_flag_on_post:
    - Addition boolean argument `throwWhenDone` to indicate whether to throw a
      `StopIteration` error if the iterator is done/exhausted (default: `false`).
- [x] `object()`
- [x] `oct()`
- [x] `open()`
- [x] `ord()`
- [x] `pow()`
- [x] `print()`
    - `kwargs` can be passed by passing an object with the following shape as
      the last argument, for example:
      `{__kwargs__, end='-------'}`.
      `__kwargs__` is a named export of `pyllute`.
      Note that the `end` keyword argument is prepended to the default line break. This means it behaves differently than in Python.
- [ ] `property()`
- [x] `range()`
- [ ] `repr()`
- [x] `reversed()`
- [x] `round()`
- [x] `set()`
- [x] `setattr()`
- [x] `slice()`
    - Returns a custom instance of `Slice` but is currently not really usable,
      because it can't be used on any built-in functionality of JavaScript.
      I guess, there could be an `Array` `Proxy` that intercepts the array 
      accessor (see [this question](https://stackoverflow.com/questions/44097191/))
      and uses the `Slice` class.
- [x] `sorted(iterable, key=undefined, reversed=false)`
- `staticmethod()`
- [x] `str()`
- [x] `sum()`
- [ ] :x: `super()` (keyword)
- [x] `tuple()`
- [x] `type()`
    - This lib's implementation should be :ok_hand:.
      Passing more than 1 base is not supported due to JavaScript's single 
      inheritance model.
      Not sure how e.g. the `classmethod` decorator works when using `type` in Python.
      The created class has t the `__name__`, `__bases__` and `__dict__` attributes like in Python.
- [x] `vars()`
- `zip()`
