from flask import Flask, request
from flask_restful import Resource, Api
from utils.db_functions import get_floor_data, insert_student_submission, extend_student_time, clear_students_and_update_tables
from datetime import datetime, timedelta
from time import sleep
import threading

app = Flask(__name__)
api = Api(app)

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
        floor = request.args.get("floor_id")
        table_num = request.args.get("table_id")
        student_id = request.args.get("id")
        email = request.args.get("email")
        time = request.args.get("time")
        time_splitted = time.split(':')
        hours = int(time_splitted[0])
        minutes = int(time_splitted[1])
        current_time = datetime.now()
        stay_interval = timedelta(hours=hours, minutes=minutes)
        leave_time = current_time + stay_interval
        insert_student_submission(id=student_id,
                                  email=email,
                                  leave_time=leave_time,
                                  floor=floor,
                                  table_num=table_num)


class extend_stay(Resource):
    def post(self):
        student_id = request.args.get("id")
        extend_time = request.args.get("extend_time")
        extend_student_time(student_id, extend_time)


api.add_resource(floor_one, "/f1")
api.add_resource(floor_two, "/f2")
api.add_resource(floor_three, "/f3")
api.add_resource(floor_four, "/f4")
api.add_resource(submit_form, "/submit")
api.add_resource(extend_stay, "/enter_extend")

if __name__ == '__main__':
    app.run(host='0.0.0.0')
    print("started db cleaning thread")
