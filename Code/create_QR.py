import qrcode

# Define the text to encode in the QR code
text = "Hello, World!"

# Create a QR code instance
qr = qrcode.QRCode(version=1, box_size=10, border=5)

# Add the text to the QR code
qr.add_data(text)

# Compile the QR code and save it to a file
qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white")
img.save("my_qr_code.png")
img.show()
