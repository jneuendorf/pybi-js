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
- :ok_hand: `ascii()`
- [x] `bin()`
- [x] `bool()`
- [x] `breakpoint()`
- [x] `bytearray()`
- [x] `bytes()`
- [x] `callable()`
- [x] `chr()`
- `classmethod()`
- `compile()`
- `complex()`
- `delattr()`
- `dict()`
- `dir()`
- `divmod()`
- [x] `enumerate()`
- `eval()`
- `exec()`
- `filter()`
- `float()`
- `format()`
- `frozenset()`
- `getattr()`
- `globals()`
- `hasattr()`
- `hash()`
- `help()`
- `hex()`
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
- `print()`
    - `kwargs` can be passed by passing an object with the following shape as the last argument:
      `{__kwargs__, end='-------'}`
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
- :x: `super()` (keyword)
- `tuple()`
- `type()`
- `vars()`
- `zip()`
