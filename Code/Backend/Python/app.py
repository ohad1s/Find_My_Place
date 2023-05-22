from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from utils.db_functions import get_floor_data, insert_student_submission, extend_student_time, \
    clear_students_and_update_tables, update_current_students
from utils.send_mail import send_email
from datetime import datetime, timedelta, timezone
from time import sleep
import threading

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


class floor_one(Resource):
    def get(self):
        data = get_floor_data(1)
        return data


class floor_two(Resource):
    def get(self):
        data = get_floor_data(2)
        return data


class floor_three(Resource):
    def get(self):
        data = get_floor_data(3)
        return data


class floor_four(Resource):
    def get(self):
        data = get_floor_data(4)
        return data


class submit_form(Resource):
    def post(self):
        data = request.json
        floor = data["floor_id"]
        table_num = data["table_id"]
        student_id = data["id"]
        email = data["email"]
        time = data["time"]
        time_splitted = time.split(':')
        hours = int(time_splitted[0])
        minutes = int(time_splitted[1])
        current_time = datetime.now(timezone.utc)
        stay_interval = timedelta(hours=hours, minutes=minutes)
        leave_time = current_time + stay_interval
        insert_student_submission(id=student_id,
                                  email=email,
                                  leave_time=leave_time,
                                  floor=floor,
                                  table_num=table_num)
        update_current_students(floor=floor,
                                table_num=table_num)


class extend_stay(Resource):
    def post(self):
        data = request.json
        student_id = data["id"]
        extend_time = data["extend_time"]
        extend_student_time(student_id, extend_time)


api.add_resource(floor_one, "/f1")
api.add_resource(floor_two, "/f2")
api.add_resource(floor_three, "/f3")
api.add_resource(floor_four, "/f4")
api.add_resource(submit_form, "/submit")
api.add_resource(extend_stay, "/enter_extend")

if __name__ == '__main__':
    clean_thread = threading.Thread(target=clear_students_and_update_tables)
    mail_thread = threading.Thread(target=send_email)
    clean_thread.start()
    mail_thread.start()
    print("started db cleaning thread")
    app.run(host='0.0.0.0')
