import builtins

from _utils import generate


tests = {
    'math': [builtins],
}

for testname, namespaces in tests.items():
    generate(testname, namespaces)
