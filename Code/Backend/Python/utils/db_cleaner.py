from time import sleep
import importlib
from pathlib import Path
from db_functions import clear_students_and_update_tables
# from db_functions import clear_students_and_update_tables

def clean_db():
    # db_functions = importlib.import_module("db_functions")
    while True:
        clear_students_and_update_tables()
        sleep(60)

if __name__ == "__main__":
    clean_db()