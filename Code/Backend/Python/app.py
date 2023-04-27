from flask import Flask, request
from flask_restful import Resource, Api
from db_functions import get_floor_data, insert_student_submission
from datetime import datetime, timedelta


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
        id = request.args.get("id")
        email = request.args.get("email")
        time = request.args.get("time")
        time_splitted = time.split(':')
        hours = time_splitted[0]
        minutes = time_splitted[1]
        current_time = timedelta.now()
        stay_interval = timedelta(hours=hours, minutes=minutes)
        leave_time = current_time + stay_interval
        insert_student_submission(id=id,
                                  email=email,
                                  leave_time=leave_time,
                                  floor=floor,
                                  table_num=table_num)


class extend_stay(Resource):
    def post(self):
        pass


api.add_resource(floor_one, "/f1")
api.add_resource(floor_two, "/f2")
api.add_resource(floor_three, "/f3")
api.add_resource(floor_four, "/f4")
api.add_resource(submit_form, "/submit")
if __name__ == '__main__':
    app.run(host='0.0.0.0')
