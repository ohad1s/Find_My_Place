import socket

ips=("10.0.0.4","10.0.0.5","10.0.0.8","8.8.8.8")
def check_senders():
    while True:
        for ip in ips:
            try:
                socket.gethostbyaddr(ip)
            except socket.herror:
                print(f"{ip} has left the network")

check_senders()