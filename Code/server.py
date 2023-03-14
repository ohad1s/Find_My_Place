from flask import Flask, request

app = Flask(__name__)
IP_SERVER = ""  # your ip
PORT = 0  # your port


@app.route('/post_data/<id>', methods=['POST'])
def post_data(id):
    param1 = request.args.get('param1')
    param2 = request.args.get('param2')
    # data = request.form
    return 'Received POST request for ID {}, with parameters: param1={}, param2={}'.format(id, param1, param2)


@app.route('/get_data/<id>', methods=['GET'])
def get_data(id):
    ip_address = request.remote_addr
    # your code here
    return 'Data requested for id {} from IP address {}'.format(id, ip_address)


if __name__ == '__main__':
    app.run(host=IP_SERVER, port=PORT, debug=True)
