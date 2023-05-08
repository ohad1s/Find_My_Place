import smtplib
import ssl
import time
from email.message import EmailMessage
from pprint import pprint

from db_functions import get_students_to_send_mail, update_student_is_reminded

PORT = '63342'
def send_email(sender_email: str, email_password: str, context, receiver_email: str, msg: EmailMessage) -> None:
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            smtp.login(sender_email, email_password)
            smtp.sendmail(sender_email, receiver_email, msg.as_string())
    except ValueError:
        print(f"Try to send email to: {receiver_email} and Failed")


def create_mail(sender_email: str, receiver_email: str, subject: str, button_link: str) -> EmailMessage:
    # create a message object
    msg = EmailMessage()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    html_body = f"""\
    <html>
    <head>
        <style>
            button {{
                  display: block;
                  margin: 0 auto;
                }}
              button {{
                  position: relative;
                  background: #444;
                  color: #fff;
                  text-decoration: none;
                  text-transform: uppercase;
                  border: none;
                  letter-spacing: 0.1rem;
                  font-size: 1rem;
                  padding: 1rem 3rem;
                  transition: 0.2s;
              }}

            /* right-to-left text direction for paragraphs */
            p {{
              direction: rtl;
            }}
        </style>
    </head>
    <body>
    <p> סטודנט יקר! כאן הספרייה, בעוד כ 15 דקות זמן הישיבה שלך נגמר. </p>
    <p> אם ברצונך להאריך את זמן הישיבה לחץ על הכפתור👇 </p>
    <p><a href="{button_link}">
        <button><span>Click Here</span><i></i></button>
    </a></p>
    </body>
    </html>
    """

    msg.add_alternative(html_body, subtype='html')
    return msg


def create_and_send(receiver_email: str, button_link: str):
    sender_email = 'finalprojectariel123@gmail.com'
    email_password = 'svsmxreohtisxrki'
    subject = 'תזכורת זמן ישיבה'
    context = ssl.create_default_context()
    msg = create_mail(sender_email, receiver_email, subject, button_link)
    send_email(sender_email, email_password, context, receiver_email, msg)


if __name__ == '__main__':
    while True:
        students_to_update = get_students_to_send_mail()
        for student_data in students_to_update:
            pprint(student_data)
            create_and_send(student_data["Email"], f"http://findmyplace.online/html/extend.html?id={student_data['ID']}")
            update_student_is_reminded(student_data['ID'])
        time.sleep(60)
