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


def run(data, namespaces, serializers):
    namespace_dicts = [
        namespace if isinstance(namespace, dict) else vars(namespace)
        for namespace in namespaces
    ]
    results = {}
    for funcname, args2d in data.items():
        print(funcname, '..............')
        serializer = serializers.get(funcname)
        func_results = []
        for args in args2d:
            func = _get_func(funcname, namespace_dicts)
            try:
                result = func(*args)
                if callable(serializer):
                    # print(serializer)
                    result = serializer(result)
            except Exception as e:
                result = {
                    '__error__': {
                        'type': type(e).__name__,
                        'message': (
                            e.message
                            if hasattr(e, 'message')
                            else ', '.join(e.args)
                        ),
                    },
                }
                print('encoded caught error', str(e), 'as', str(result))
            func_results.append(result)
        results[funcname] = func_results
    return results


def _get_func(funcname, namespace_dicts):
    for namespace_dict in namespace_dicts:
        if funcname in namespace_dict:
            return namespace_dict[funcname]
    raise ValueError(f'Could not find {funcname} in namespaces.')


def save_json(testname, data):
    json_file = os.path.join(TESTS_DIR, f'{testname}_expected.json')
    # print(json_file)
    try:
        with open(json_file, 'w') as f:
            json.dump(data, f, indent=2)
    except TypeError:
        print(data)
        raise
    return json_file


def generate(testname, namespaces, serializer):
    filename = save_json(
        testname,
        run(
            load_json(testname),
            namespaces,
            serializer,
        )
    )
    print('generated', filename)
