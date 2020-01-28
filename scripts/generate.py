import builtins
from dataclasses import dataclass, field
from typing import Callable, Dict

from _utils import generate


@dataclass
class Meta:
    namespaces: list
    serializers: Dict[str, Callable] = field(default_factory=dict)


tests = {
    'math': Meta([builtins]),
    'iterables': Meta([builtins], {
        'enumerate': list,
        'iter': list,
    }),
}

for testname, meta in tests.items():
    generate(testname, meta.namespaces, meta.serializers)
