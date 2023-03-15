class Place:
    id_counter = 0

    def __init__(self, place_name):
        Place.id_counter += 1
        self.id = Place.id_counter
        self.name = place_name
        self.floors = []

    def add_floor(self, f):
        self.floors.append(f)
