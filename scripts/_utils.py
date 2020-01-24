import json
import os


TESTS_DIR = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    '__tests__',
)


def load_json(testname):
    json_file = os.path.join(TESTS_DIR, f'{testname}.json')
    # print(json_file)
    with open(json_file) as f:
        return json.load(f)


def run(data, namespaces):
    namespace_dicts = [
        namespace if isinstance(namespace, dict) else vars(namespace)
        for namespace in namespaces
    ]
    result = {}
    for funcname, args2d in data.items():
        func_results = []
        for args in args2d:
            func_results.append(_get_func(funcname, namespace_dicts)(*args))
        result[funcname] = func_results
    return result


def _get_func(funcname, namespace_dicts):
    for namespace_dict in namespace_dicts:
        if funcname in namespace_dict:
            return namespace_dict[funcname]
    raise ValueError(f'Could not find {funcname} in namespaces.')


def save_json(testname, data):
    json_file = os.path.join(TESTS_DIR, f'{testname}_expected.json')
    # print(json_file)
    with open(json_file, 'w') as f:
        json.dump(data, f)
    return json_file


def generate(testname, namespaces):
    filename = save_json(
        testname,
        run(
            load_json(testname),
            namespaces,
        )
    )
    print('generated', filename)
