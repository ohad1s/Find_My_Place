from flask import Flask, request

app = Flask(__name__)


@app.route('/', methods=['POST'])
def handle_post_request():
    mac_address = request.json.get('mac_address')
    print(mac_address)
    # Do something with the MAC address, such as establish a connection with the mobile device
    return 'Received MAC address: {}'.format(mac_address)


if __name__ == '__main__':
    app.run(debug=True)
