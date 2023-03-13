import socket
import struct

# Extract sender IP address
def get_sender_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    sender_ip = s.getsockname()[0]
    s.close()
    return sender_ip

# Send ICMP packet with sender IP as data
def send_icmp_with_ip(dst_ip):
    sock = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_ICMP)
    packet_id = 12345
    packet_seq = 1
    checksum = 0
    header = struct.pack("!BBHHH", 8, 0, checksum, packet_id, packet_seq)
    data = get_sender_ip()
    print(data)
    data=data.encode()
    checksum = calc_checksum(header + data)
    header = struct.pack("!BBHHH", 8, 0, checksum, packet_id, packet_seq)
    packet = header + data
    sock.sendto(packet, (dst_ip, 1))
    sock.close()

# Calculate ICMP checksum
def calc_checksum(data):
    if len(data) % 2 == 1:
        data += b'\0'
    chksum = 0
    for i in range(0, len(data), 2):
        chksum += (data[i] << 8) + data[i+1]
    chksum = (chksum >> 16) + (chksum & 0xffff)
    chksum += chksum >> 16
    chksum = ~chksum & 0xffff
    return chksum

# Example usage
send_icmp_with_ip("8.8.8.8")
