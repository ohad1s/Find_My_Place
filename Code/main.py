import qrcode
import requests
import re
import uuid
import time


def get_mac_address():
    mac_addr = hex(uuid.getnode())[2:].upper()
    mac_addr = ':'.join(re.findall('..', mac_addr))
    return mac_addr


def send_mac_address(url, mac_address):
    data = {'mac_address': mac_address}
    response = requests.post(url, data=data)
    if response.status_code == 200:
        print('MAC address sent successfully')
    else:
        print('Failed to send MAC address')


def main():
    url = 'http://yourflaskserver.com/'
    mac_address = get_mac_address()
    if mac_address is not None:
        qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4)
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        img.show()
        input('Scan the QR code and press enter to send the MAC address')
        send_mac_address(url, mac_address)
    else:
        print('Failed to get MAC address')


if __name__ == '__main__':
    main()
