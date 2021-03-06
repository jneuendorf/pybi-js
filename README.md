![coverage](https://img.shields.io/badge/coverage-96.22-brightgreen)



# pybi

An implementation of most of Python's built-in functions in JavaScript.

These functions can be attached to a certain namespace -- including the global namespace (`globalThis`, `global` / `window`).

<!-- Fix Atom's syntax highlighting: *** //-->

## Install

```bash
npm install --save pybi
# or
yarn add pybi
```


## Usage

```javascript
import {install} from 'pybi'
// or
// const {install} = require('pybi')


// The global namespace is polluted by default:
install()
// Now you can do something like
print(list(zip([1,2,3], [4,5,6], [7,8,9,10])))

// Optionally install into a certain namespace:
install(MyApp)

// or just have all functions in one place:
const py3funcs = install({})
// Now you could also use the functions without pollution:
(function({print, list, zip}) {
    print(list(zip([1,2,3], [4,5,6], [7,8,9,10])))
})(py3funcs)
// or shorter:
(function({print, list, zip}) {
    print(list(zip([1,2,3], [4,5,6], [7,8,9,10])))
})(install({}))
```


## What's included?

### Literals

The following literals are (or can) be used:

- boolean: `True`, `False`
- `None`
- string literals: ``r`\n` ``, f-strings are currently not explicitly supported
  because you can just use JavaScript's template strings.
- binary literals: ``b`\a` ``, ``br`\a` ``, ``rb`\a` ``


### [Python3 built-in functions](https://docs.python.org/3/library/functions.html)

- [ ] :x: `__import__()`
    - Nope sorry, not messin' with this kinda stuff.
- [x] `abs()`
- [x] `all()`
- [x] `any()`
- [x] :ok_hand: `ascii()`
    - This lib's implementation should be ok.
- [x] `bin()`
- [x] `bool()`
- [x] `breakpoint()` :triangular_flag_on_post:
    - This is just a function calling `debugger`.
      Thus when used for debugging 1 up-step is necessary.
- [x] `bytearray()` :triangular_flag_on_post:
    - :warning: Only works on Node.js.
      It will not be installed unless there is a global `process` variable.
    - There is no (third) `errors` argument.
- [x] `bytes()`
- [x] `callable()`
- [x] `chr()`
- [x] `classmethod()`
    - There are 3 different behavoirs depending on the usage and environment.
      See section `Caveats` for details.
- [ ] :stop_sign: `compile()`
    - I guess I could do that using babylon but not for now. :wink:
- [ ] :x: `complex()`
    - There is no JS built-in equivalent (or something similar) that I am aware of.
      We don't want to auto inject whole libraries (like [math.js](https://mathjs.org/docs/datatypes/complex_numbers.html)) into somewhere. :wink:
- [x] `delattr()`
- [x] `dict()`
- [x] `dir()` :triangular_flag_on_post:
    - Calling this function without arguments is not supported (and throws a
      `NotImplementedError`).
- [x] `divmod()`
- [x] `enumerate()` :triangular_flag_on_post:
    - Returns an `Array` instead of an `enumerate` instance.
- [x] `eval()` :triangular_flag_on_post:
    - There already is a global `eval` function in JS. :earth_africa:
      But this lib's version wraps the passed expression string in parentheses
      so that its value is returned.
- [x] `exec()`
- [x] `filter()`
- [x] `float()`
- [x] `format()` :triangular_flag_on_post:
    - :warning: The [format specification mini-language](https://docs.python.org/3/library/string.html#format-specification-mini-language) is not supported.
      The implementation supports the basic behavoir and optionally uses [sprintf-js](https://github.com/alexei/sprintf.js) under the hood.
      Thus the format specification of sprintf-js must be used instead of Python's.
- [x] `frozenset()`
- [x] `getattr()`
- [ ] :x: `globals()`
    - Just use `globalThis` (or `window`/`global` respectively) please. :wink:
- [x] `hasattr()`
- [x] `hash()`
    - Using [`hash-sum`](https://www.npmjs.com/package/hash-sum)
      if the dependant project has it installed.
- [ ] :x: `help()`
- [x] `hex()`
- [x] `id()`
- [x] `input()` :triangular_flag_on_post:
    - :warning: Only works on Node.js.
      It will not be installed unless there is a global `process` variable.
    - :exclamation: Asynchronous by default.
      There is a 2nd argument `async` (default `true`).
      If `false`, busy waiting is used but [`system-sleep`](https://www.npmjs.com/package/system-sleep) can be used to relax the busy waiting.
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
- [x] `next()`
- [x] `object()` :triangular_flag_on_post:
    - Assigning properties is not forbidden like in Python.
- [x] `oct()`
- [ ] `open()`
    - Arguments are interpreted in a special way:
      If the last argument is an object it is interpreted as keyword arguments.
      Those keyword arguments have precedence over positional arguments (but
      should not overlap them for clarity).
      For example, the following 2 calls are equivalent:
      `open('/path', 'rb', {encoding: 'utf8'})` and
      `open('/path', 'rb', undefined, 'utf8')`
    - `mode` allows more than in Python.
      That way it may be more convenient for people used to the `fs.open` interface.
      E.g. `'ax'` is not allowed in Python but it is in `fs`.
- [x] `ord()`
- [x] `pow()`
- [x] `print()`
    - `kwargs` can be passed by passing an object with the following shape as
      the last argument, for example:
      `{__kwargs__, end='-------'}`.
      `__kwargs__` is a named export of `pybi`.
      Note that the `end` keyword argument is prepended to the default (unavoidable?) line break.
      This means it behaves differently than in Python.
- [ ] :x: `property()`
    - I couldn't find a good way to make it nice enough to be actually useful:
      `Proxy` didn't work the way I wanted and making this function an alias
      for `Object.defineProperty` is pointless IMHO.
      The built-in [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
      and [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)
      are easy to use and save using `property` as a decorator.
      The only added value would be reacting to `delete`
      (which could indeed be accomplished with a `Proxy`).
      [This](https://babeljs.io/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABABwE52QU1VAngCgHMAaRAZ1IBMBKRAbwChFEIEy4AbTAOg7kPwByKAAsYZAFyDSo8dSYs2nHnwEBDVIRABbTGChluENRy6Z5zVmDJREUDYUy2AvPQC-C1E5CokYTADuiAAK6AAeBPaaTqSMzMyOUBKIJArMZE7JFAwAkJSYXFCYoRjYeMmUxApuFoheUD5IDB4MEBxqZGSIAIL0aYhhiK5opTgE_cygkLAI-LR09Y12YoYA-mFuVfHxU9DwYPhh87Jrg64b_fI5uEOIAEwMuQD0TwO3APIARgBWmNDc-WAMH8JSwYzmj222jmfW22ys7C4vH4-DutWYHhajwRtjUt38QW6EIRymR6m4RwYagptwALK0lEjVPhqUcgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=unambiguous&lineWrap=true&presets=es2015%2Creact%2Cstage-0%2Cstage-2&prettier=false&targets=&version=7.8.3&externalPlugins=%40babel%2Fplugin-proposal-class-properties%407.8.3) is as far as I got. :wink:
- [x] `range()`
- [x] :ok_hand: `repr()`
    - No memory address but most classes have a good `eval`able representation by their `.toString` method.
      Otherwise `<${object.constructor.name} object>` is returned.
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
- [x] `staticmethod()`
- [x] `str()`
- [x] `sum()`
- [ ] :x: `super()` (keyword)
- [x] `tuple()` :triangular_flag_on_post:
    - It works like in Python but returns an instance of `Array` which is mutable!
- [x] :ok_hand: `type()`
    - This lib's implementation should be ok.
      Passing more than 1 base is not supported due to JavaScript's single
      inheritance model.
      But passing a single base without wrapping it in a tuple is supported, because it is a very likely case.
      Not sure how e.g. the `classmethod` decorator works when using `type` in Python.
      The created class has the `__name__`, `__bases__` and `__dict__` attributes like in Python.
- [x] `vars()` :triangular_flag_on_post:
    - This libs implementation only works if an argument is passed
      and returns this arg's `__dict__`.
- [x] `zip()`


### Config

There are some configuration flags for some of the functions.
`config` is just an object and can be reset using the `reset` function:

```javascript
const {config, reset} = require('pybi')
// or
import {config, reset} from 'pybi'

console.log(config) // {
//     classmethod_firstArgClass: true,
//     hash_useHashSum: true,
//     hash_warnNoHashSum: true,
//     type_warnArrow: true,
// }
*/

config.classmethod_firstArgClass = false
reset('classmethod_firstArgClass')
console.log(config.classmethod_firstArgClass) // true

// or: reset everything
reset()

```


## Caveats

### `classmethod`

There are 3 different ways to use this function and 3 according behaviors which can be slightly different.

#### TL;DR

Since you're probably using babel (for either `babel-plugin-proposal-class-properties` or `babel-plugin-proposal-decorators`) the most powerful and most pythonic way is using actual decorators in legacy mode, because

- it's pythonic to write decorators using the `@` syntax,
- the class is bound to the method immediately so it can be called without dot notation,
- it allows calls on different classes, and
- it allows calls on the prototype.



#### as decorator according to the legacy proposal


This is the most robust and flexible implementation:
It behaves like in Python (I think :wink:).


#### as decorator according to the current proposal

Internally, the same function as for `as wrapper function` (below) is used,
thus see that section.


#### as wrapper function

When using `classmethod` beware that the returned functions cannot be used with multiple/different classes like you could do in Python.
This is due to the fact that in JavaScript we cannot determine the class that contains the according method definition (without additional effort like additional class decorators).
Thus, the 1st class, the method is called on, is cached (in order to support "standalone-calls" (see below)).
In particular, this means that the following is invalid:

```javascript
const f = classmethod(cls => cls)

class A {
    static m1 = f
}
class B {
    static m2 = f
}
// still no errors thrown

A.m1()
// all good
const m1 = A.m1
m1()
// still all good
B.m2()
// THROWING UP!
```

Additionally, decorators in JavaScript can only result in a single descriptor
which means, that the classmethod can only be defined either on the class or in
the prototype with a single call/assignment (unlike in Python where
classmethods can also be accessed called from instances).

There is another slight difference to Python:
`classmethod` returns functions, so `f` can be called but in Python `classmethod` objects are not callable.
