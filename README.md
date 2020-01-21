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


install()
// optionally into a certain namespace:
// install(MyApp)

// or just have all functions in one place:
// py3funcs = install({})
```


## [Python3 built-in functions](https://docs.python.org/3/library/functions.html)

- `__import__()`
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
    - Just use `window` or `global` please. :wink:
- [x] `hasattr()`
- [ ] `hash()`
    - Looks like using [`hash-sum`](https://www.npmjs.com/package/hash-sum)
      may be a better idea than an own implementation.
- [ ] :x: `help()`
- [x] `hex()`
- `id()`
- `input()`
- `int()`
- `isinstance()`
- `issubclass()`
- `iter()`
- [x] `len()`
- [x] `list()`
- `locals()`
- `map()`
- `max()`
- `memoryview()`
- `min()`
- `next()`
- `object()`
- `oct()`
- `open()`
- [x] `ord()`
- `pow()`
- [x] `print()`
    - `kwargs` can be passed by passing an object with the following shape as
      the last argument, for example:
      `{__kwargs__, end='-------'}`.
      `__kwargs__` is a named export of `pyllute`.
      Note that the `end` keyword argument is prepended to the default line break. This means it behaves differently than in python.
- `property()`
- `range()`
- `repr()`
- `reversed()`
- `round()`
- `set()`
- `setattr()`
- `slice()`
- `sorted()`
- `staticmethod()`
- `str()`
- `sum()`
- [ ] :x: `super()` (keyword)
- `tuple()`
- `type()`
- `vars()`
- `zip()`
