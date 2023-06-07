# Find My Place Project

![Project Logo](https://pasteboard.co/dbEET1ltP05i.png)

This project aims to provide a solution for live monitoring of people density, with a specific focus on the university library. The goal is to offer accurate and real-time data to students, enabling them to make informed decisions about available seating areas within the library. By implementing a user-friendly website interface, students can easily access information about seat availability and optimize their study time.

## Table of Contents
- [Introduction](#introduction)
- [Methods/Algorithms/Design Considerations](#methods-algorithms-design-considerations)
- [Selected Approach](#selected-approach)
- [Solution Description](#solution-description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Introduction

The Find My Place project focuses on providing students with accurate and real-time information about available seating areas within the university library. By leveraging a user-friendly website interface, students can conveniently access the system and make informed decisions regarding their study space.

The project utilizes Flask in the backend to handle requests and interact with the database, while the frontend is implemented using JavaScript and HTML to provide a responsive and intuitive user interface. By scanning QR codes placed on tables and submitting their expected duration of stay, students contribute to the live monitoring of people density in the library.

## Methods/Algorithms/Design Considerations

During the planning phase, several methods and algorithms were considered for monitoring people density. Raspberry Pis with Wi-Fi antennas were initially explored, but due to security features added in both Android and iOS devices, it was not feasible to track Wi-Fi signals accurately.

Another option was to utilize CCTV cameras combined with image processing techniques to estimate the number of people in the library. However, due to cost and scalability challenges, this approach was discarded.

IR sensors were also considered to track people passing by, but they couldn't provide accurate enough data about table occupancy. Hence, a different approach was chosen for the project.

## Selected Approach

The selected approach for the Find My Place project involves a user-based system where students can update their stay time and table location by scanning QR codes and submitting a form. The backend is built with Flask, providing efficient communication with the database, while the frontend utilizes JavaScript and HTML for a user-friendly and responsive interface.

This approach ensures real-time reporting and allows students to access the current people density information in different areas of the library. By providing accurate data, students can make informed decisions about where to sit, optimizing their study experience.

## Solution Description

### Data Collection
To collect data on people density, students can scan QR codes placed on tables and fill out a form indicating their expected duration of stay. This information is crucial for accurately determining the availability of seating areas within the library.

### Database Management
A relational database is utilized to store and manage the collected data. This ensures efficient retrieval and processing of information, enabling real-time reporting and quick decision-making for students.

### Backend Implementation
The backend of the system is implemented using the Flask library in Python. Flask provides a lightweight and flexible framework for handling requests from the frontend and interacting with the database. It ensures seamless communication and efficient data management.

### Algorithm for Alerting
A Python script has been developed to periodically check the database for users with less than 15 minutes remaining in their allocated time. When such users are identified, the script sends email alerts to notify them and provides an option to extend their stay if needed. This helps manage seat availability and ensures fairness among students.

## Installation

To install and run the Find My Place project, please follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/find-my-place.git`
2. Install the required dependencies: `pip install -r requirements.txt`
3. Configure the database settings in `config.py`.
4. Start the Flask server: `python app.py`

## Usage

1. Access the system by opening the website interface in your browser.
2. Scan the QR code placed on the table you wish to occupy.
3. Fill out the form indicating your expected duration of stay.
4. The system will update the database with your information.
5. View the real-time reporting to find available seating areas in the library.
6. Make informed decisions about your study space and optimize your productivity.

## Contributing

Contributions to enhance the Find My Place project are welcome. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request explaining your changes.

---

We hope that the Find My Place project improves the student experience in the university library by providing real-time information on seating availability.
