import json
from pathlib import Path
secrets_json_path = Path(__file__).parent/"jsons/secrets.json"


class Get_secrets():

    def __init__(self) -> None:
        with secrets_json_path.open() as secrets_json:
            secrets = json.load(secrets_json)
        self.db_host = secrets["db_host"]
        self.db_password = secrets["db_password"]
        self.db_user = secrets["db_user"]
        self.db = secrets["db"]
