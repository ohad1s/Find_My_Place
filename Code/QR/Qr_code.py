from PIL import Image, ImageDraw
from qrcode import constants, QRCode

IP_SERVER = "localhost"  # your ip
PORT = 3000  # your port


def create_new_qr(floor_id: int, table_id: int) -> QRCode:
    qr = QRCode(version=1, error_correction=constants.ERROR_CORRECT_L, box_size=10, border=4)
    url = f"http://{IP_SERVER}:{PORT}/scan?floor_id={floor_id}&table_id={table_id}"
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    # Add floor_id and table_id to the image
    draw = ImageDraw.Draw(img)
    draw.text((5, 5), f"Floor {floor_id}, Table {table_id}", fill="black")

    img.save(f"Floor_{floor_id}_Table_{table_id}_qr.png")
    return qr


if __name__ == '__main__':
    create_new_qr(floor_id=1, table_id=3)