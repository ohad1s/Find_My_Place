import mysql.connector
from datetime import datetime, timedelta, timezone
from pprint import pprint
from pathlib import Path
import sys
import json

secrets_json_path = Path(__file__).parent / "jsons/secrets.json"


class Get_secrets():

    def __init__(self) -> None:
        with secrets_json_path.open() as secrets_json:
            secrets = json.load(secrets_json)
        self.db_host = secrets["db_host"]
        self.db_password = secrets["db_password"]
        self.db_user = secrets["db_user"]
        self.db = secrets["db"]


secrets: Get_secrets = Get_secrets()


def connect_to_db():
    connection = mysql.connector.connect(
        host=secrets.db_host,
        user=secrets.db_user,
        password=secrets.db_password,
        database=secrets.db
    )
    cursor = connection.cursor(dictionary=True)
    return cursor, connection


def generic_query(query: str, fetch_one=False):
    cursor, connection = connect_to_db()
    query = query
    cursor.execute(query)
    if fetch_one:
        res = cursor.fetchone()
    else:
        res = cursor.fetchall()

    cursor.close()
    connection.close()
    return res


def generic_change_query(query: str):
    cursor, connection = connect_to_db()
    query = query
    res = cursor.execute(query)
    connection.commit()
    cursor.close()
    connection.close()
    return res


def get_floor_data(floor_num: int):
    query = f"""
    SELECT * FROM Tables
    WHERE Floor = {floor_num}
    """
    res = generic_query(query)
    return res


def get_students_to_send_mail():
    now = datetime.now(timezone.utc)
    fifteen_minutes = timedelta(minutes=15)
    leave_time_to_remind = now + fifteen_minutes
    query = f"""
    SELECT ID,Email FROM Students
    WHERE IsReminded = 0
    AND LeaveTime > NOW()
    AND LeaveTime < '{str(leave_time_to_remind)}'
    """
    res = generic_query(query)
    return res


def update_student_is_reminded(id: int):
    query = f"""
    UPDATE Library.Students
    SET IsReminded = 1
    WHERE ID = {id}
    """
    res = generic_change_query(query)
    return res


def insert_student_submission(id: int,
                              email: str,
                              leave_time: datetime,
                              floor: int,
                              table_num: int):
    query = f"""
    INSERT INTO Students (ID, Email, EntryTime, LeaveTime, Floor, TableNum, IsReminded)
    VALUES ({id}, '{email}', NOW(), '{str(leave_time)}', {floor}, {table_num}, 0)
    """
    print(query)
    res = generic_change_query(query)
    return res


def update_current_students(floor: int,
                            table_num: int):
    query = f"""
        UPDATE Tables
        SET CurrentStudents = CurrentStudents + 1
        WHERE Floor = {floor}
        AND TableNum = {table_num}
    """
    res = generic_change_query(query)
    return res


def extend_student_time(student_id: int, extend_time: str):
    query = f"""
    UPDATE Library.Students
    SET LeaveTime = DATE_ADD(LeaveTime, INTERVAL '{extend_time}' HOUR_MINUTE)
    WHERE ID = {student_id}
    """
    res = generic_change_query(query)
    return res


def get_students_left_tables():
    query = f"""
        SELECT ID,Floor,TableNum FROM Students
        WHERE LeaveTime < NOW()
        """
    res = generic_query(query)
    return res


def delete_student(id):
    query = f"""
       DELETE FROM Students
       WHERE ID = {id}
    """
    res = generic_change_query(query)
    print(res)


def update_table_current_students(floor, table_num):
    query = f"""
        UPDATE Tables
        SET CurrentStudents = CurrentStudents - 1
        WHERE Floor = {floor}
        AND TableNum = {table_num}
    """
    res = generic_change_query(query)
    print(f"Updated Floor {floor} Table Number {table_num}")


def clear_students_and_update_tables():
    tables_to_update = get_students_left_tables()
    for student_data in tables_to_update:
        pprint(student_data)
        stuednt_id = student_data['ID']
        floor = student_data['Floor']
        table_num = student_data['TableNum']
        update_table_current_students(floor, table_num)
        delete_student(stuednt_id)
    print("finished round!!")
