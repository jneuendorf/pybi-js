import builtins
from dataclasses import dataclass, field
from typing import Callable, Dict

from _utils import generate


@dataclass
class Meta:
    namespaces: list
    serializers: Dict[str, Callable] = field(default_factory=dict)


tests = {
    'converters': Meta([builtins], {}),
    'iterables': Meta([builtins], {
        'enumerate': list,
        'iter': list,
    }),
    'math': Meta([builtins]),
    'stdtypes': Meta([builtins], {
        'bytearray': list,
        'bytes': list,
        'range': list,
    }),
}

if __name__ == "__main__":
    try:
        for testname, meta in tests.items():
            generate(testname, meta.namespaces, meta.serializers)
    except Exception as e:
        raise RuntimeError(f'Error while generating "{testname}"') from e
