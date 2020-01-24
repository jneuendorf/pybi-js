import json
import os


SCRIPTS_DIR = os.path.dirname(__file__)
TESTS_DIR = os.path.join(
    os.path.dirname(os.path.dirname(SCRIPTS_DIR)),
    '__tests__',
)


def load_json(__file__):
    filename = os.path.basename(__file__)
    name, _ = filename.rsplit('.', maxsplit=1)
    json_file = os.path.join(TESTS_DIR, f'{name}.json')
    with open(json_file) as f:
        return json.load(f)
