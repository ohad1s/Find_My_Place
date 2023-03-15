class Floor:
    id_counter = 0

    def __init__(self, floor_number):
        Floor.id_counter+=1
        self.id=Floor.id_counter
        self.number=floor_number
        self.Tables=[]

    def addTable(self, t):
        self.Tables.append(t)