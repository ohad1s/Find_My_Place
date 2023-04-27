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


def generic_query(query, fetch_one=False):
    cursor, connection = connect_to_db()
    query = query
    cursor.execute(query)
    if fetch_one:
        res = cursor.fetchone()
    else:
        res = cursor.fetchall()
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


def update_student_is_reminded(id):
    query = f"""
    UPDATE Students
    SET IsReminded = 1
    WHERE ID = {id}
    """
    res = generic_query(query)
    return res
