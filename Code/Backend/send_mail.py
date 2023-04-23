import smtplib
import ssl
from email.message import EmailMessage


def send_email(sender_email: str, email_password: str, context, receiver_email: str, msg: EmailMessage) -> None:
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            smtp.login(sender_email, email_password)
            smtp.sendmail(sender_email, receiver_email, msg.as_string())
    except ValueError:
        print(f"Try to send email to: {receiver_email} and Failed")


def create_mail(sender_email: str, receiver_email: str, subject: str, body: str) -> EmailMessage:
    # create a message object
    msg = EmailMessage()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.set_content(body)
    return msg


def create_and_send(receiver_email: str, body: str):
    sender_email = 'finalprojectariel123@gmail.com'
    email_password = 'svsmxreohtisxrki'
    subject = 'תזכורת זמן ישיבה'
    context = ssl.create_default_context()
    msg = create_mail(sender_email, receiver_email, subject, body)
    send_email(sender_email, email_password, context, receiver_email, msg)
