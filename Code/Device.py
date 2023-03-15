class Device:

    def __init__(self,ip,phone,time):
        self.ip=ip
        self.phone_number=phone
        self.time_to_sit=time

    def send_sms(self):
        # TODO: use twilo to send SMS if the person still sitting or not)
        pass

