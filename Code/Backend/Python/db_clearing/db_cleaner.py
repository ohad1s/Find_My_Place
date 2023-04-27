from ..db_functions import clear_students_and_update_tables
from time import sleep


while True:
    clear_students_and_update_tables()
    sleep(60)
