import requests

IP_SERVER = ""  # your ip
PORT = ""  # your port
url = f'http://{IP_SERVER}:{PORT}/post_data/123'
data = {'name': 'Alice', 'age': 25}

response = requests.post(url, data=data)

print(response.text)
