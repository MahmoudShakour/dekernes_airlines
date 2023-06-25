USE dekernes_airlines;

DROP TABLE IF EXISTS flight_seat;
DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS flight;
DROP TABLE IF EXISTS airplane_seat;
DROP TABLE IF EXISTS purchaser;
DROP TABLE IF EXISTS traveler;
DROP TABLE IF EXISTS customer_phone_number;
DROP TABLE IF EXISTS purchase;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS airplane;


CREATE TABLE airplane(
    airplane_code CHAR(3) PRIMARY KEY,
    model VARCHAR(10) NOT NULL,
    manufacturer_company VARCHAR(20) NOT NULL
);

CREATE TABLE flight(
    flight_number VARCHAR(10),
    flight_date DATE,
    flight_time TIME NOT NULL,
    source_airport CHAR(3) NOT NULL ,
    destination_airport CHAR(3) NOT NULL ,
    flight_type VARCHAR(15)  NOT NULL,
    airplane_code VARCHAR(15) NOT NULL,
    PRIMARY KEY(flight_number,flight_date),
    CHECK(flight_type IN ('domestic','international')),
    FOREIGN KEY (airplane_code) REFERENCES airplane(airplane_code)
);


CREATE TABLE airplane_seat(
    seat_number CHAR(5),
    airplane_code VARCHAR(15) NOT NULL,
    seat_class VARCHAR(20) NOT NULL,
    seat_type CHAR(7) NOT NULL,
    is_exit_row BOOLEAN NOT NULL,
    PRIMARY KEY(seat_number,airplane_code),
    FOREIGN KEY (airplane_code) REFERENCES airplane(airplane_code),
    CHECK(seat_type IN ('aisle','middle','window'))
);

CREATE TABLE customer(
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(15) NOT NULL,
    email VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE customer_phone_number(
    customer_id INT,
    phone_number VARCHAR(20),
    PRIMARY KEY(customer_id,phone_number),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE purchaser(
    customer_id INT PRIMARY KEY,
    credit_card CHAR(16),
    expiration_date DATE,
    verification_code CHAR(3),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE traveler(
    customer_id INT PRIMARY KEY,
    passport_number VARCHAR(40),
    country VARCHAR(20),
    emergency_contact VARCHAR(30),
    emergency_number VARCHAR(20),
    frequent_flyer CHAR(7),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE purchase(
    purchase_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    purchase_date DATE NOT NULL,
    comfirmation_code  CHAR(6) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);


CREATE TABLE ticket(
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    purchase_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (purchase_id) REFERENCES purchase(purchase_id)
);

CREATE TABLE flight_seat(
    flight_number VARCHAR(10),
    flight_date DATE,
    seat_number CHAR(5),
    ticket_id INT NOT NULL UNIQUE,
    PRIMARY KEY(flight_number,flight_date,seat_number),
    FOREIGN KEY (flight_number,flight_date) REFERENCES flight(flight_number,flight_date),
    FOREIGN KEY (seat_number) REFERENCES airplane_seat(seat_number),
    FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id)
);