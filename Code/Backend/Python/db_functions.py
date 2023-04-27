from secrets import Secrets
import mysql.connector
from datetime import datetime, timedelta
secrets: Secrets = Secrets()


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
    now = datetime.now()
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
    INSERT INTO Students (ID, Email, EntryTime, LeaveTime, Floor, Table_num, IsReminded)
    VALUES ({id}, {email}, NOW(), {leave_time}, {floor}, {table_num}, 0)
    """
