import qrcode

IP_SERVER = ""  # your ip
PORT = 0  # your port


class Table:
    id_counter = 0

    def __init__(self, num_seats):
        self.num_seats = num_seats
        Table.id_counter += 1
        self.id = Table.id_counter
        self.seat_taken = 0
        self.list_people = []
        self.qr = self.create_new_qr()

    def create_new_qr(self):
        qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4)
        url = f"http://{IP_SERVER}:{PORT}/get_data/{self.id}"
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        img.save(f"Table_{self.id}_qr.png")
        return qr
