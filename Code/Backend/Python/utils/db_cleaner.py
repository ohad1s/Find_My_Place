from time import sleep
import db_functions

while True:
    db_functions.clear_students_and_update_tables()
    sleep(60)
