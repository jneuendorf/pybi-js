done = set(['abs','all','any','ascii','bin','bool','bytearray','bytes','callable','chr','dict','divmod','enumerate','filter','float','frozenset','hex','int','iter','len','list','map','max','min','next','object','oct','ord','pow','range','repr','round','set','sorted','str','sum','tuple','zip'])

wont_fix = set(['__import__', 'compile', 'complex', 'globals', 'help', 'locals', 'memoryview', 'property', 'super'])

all = set([
    '__import__', 'abs', 'all', 'any', 'ascii', 'bin', 'bool', 'breakpoint',
    'bytearray', 'bytes', 'callable', 'chr', 'classmethod', 'compile',
    'complex', 'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'exec',
    'filter', 'float', 'format', 'frozenset', 'getattr', 'globals', 'hasattr',
    'hash', 'help', 'hex', 'id', 'input', 'int', 'isinstance', 'issubclass',
    'iter', 'len', 'list', 'locals', 'map', 'max', 'memoryview', 'min', 'next',
    'object', 'oct', 'open', 'ord', 'pow', 'print', 'property', 'range', 'repr',
    'reversed', 'round', 'set', 'setattr', 'slice', 'sorted', 'staticmethod',
    'str', 'sum', 'super', 'tuple', 'type', 'vars', 'zip',
])

print('left funcs:')
print(all - done - wont_fix)
