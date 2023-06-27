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
DROP TABLE IF EXISTS airport;

CREATE TABLE airport(
    airport_code CHAR(3) PRIMARY KEY,
    country VARCHAR(20) NOT NULL,
    city VARCHAR(20) NOT NULL
);

CREATE TABLE airplane(
    airplane_code CHAR(3) PRIMARY KEY,
    model VARCHAR(10) NOT NULL,
    manufacturer_company VARCHAR(20) NOT NULL
);




CREATE TABLE flight(
    flight_number VARCHAR(10),
    flight_date DATE NOT NULL,
    flight_time TIME NOT NULL,
    source_airport CHAR(3) NOT NULL ,
    destination_airport CHAR(3) NOT NULL ,
    flight_type VARCHAR(15)  NOT NULL,
    airplane_code VARCHAR(15) NOT NULL,
    PRIMARY KEY(flight_number),
    CHECK(flight_type IN ('domestic','international')),
    FOREIGN KEY (airplane_code) REFERENCES airplane(airplane_code),
    FOREIGN KEY (source_airport) REFERENCES airport(airport_code),
    FOREIGN KEY (destination_airport) REFERENCES airport(airport_code)
);


CREATE TABLE airplane_seat(
    seat_number CHAR(5),
    airplane_code VARCHAR(15) NOT NULL,
    seat_class VARCHAR(20) NOT NULL,
    seat_type CHAR(7) NOT NULL,
    PRIMARY KEY(seat_number,airplane_code),
    FOREIGN KEY (airplane_code) REFERENCES airplane(airplane_code),
    CHECK(seat_type IN ('aisle','middle','window'))
);

CREATE TABLE customer(
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(15) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE
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
    emergency_name VARCHAR(30),
    emergency_number VARCHAR(20),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE purchase(
    purchase_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    purchase_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);


CREATE TABLE ticket(
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_price NUMERIC (8,2) NOT NULL,
    customer_id INT NOT NULL,
    purchase_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (purchase_id) REFERENCES purchase(purchase_id)
);

CREATE TABLE flight_seat(
    flight_number VARCHAR(10),
    airplane_code VARCHAR(15),
    seat_number CHAR(5),
    ticket_id INT NOT NULL UNIQUE,
    PRIMARY KEY(flight_number,airplane_code,seat_number),
    FOREIGN KEY (flight_number) REFERENCES flight(flight_number),
    FOREIGN KEY (seat_number,airplane_code) REFERENCES airplane_seat(seat_number,airplane_code),
    FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id)
);


INSERT INTO airplane VALUES ("ABC","model1","comp1");
INSERT INTO airplane VALUES ("AAA","model2","comp1");
INSERT INTO airplane VALUES ("AAB","model2","comp1");

INSERT INTO airport VALUES ("CAI","egypt","cairo");
INSERT INTO airport VALUES ("DEK","egypt","dekernes");
INSERT INTO airport VALUES ("RDH","saudi","riyadh");
INSERT INTO airport VALUES ("GDH","saudi","gadah");
INSERT INTO airport VALUES ("DOH","quatar","doha");

INSERT INTO flight VALUES (1,'2023-06-27','12:00:00','DEK','CAI','domestic','AAA');
INSERT INTO flight VALUES (2,'2023-06-27','12:00:00','RDH','DOH','international','AAA');
INSERT INTO flight VALUES (3,'2023-06-27','12:00:00','CAI','GDH','international','AAA');


SELECT flight_number,flight_date,flight_type,flight_time,src.country as source_country,dest.country as dest_country 
FROM flight 
join airport as src on src.airport_code=flight.source_airport
join airport as dest  on dest.airport_code=flight.destination_airport
-- WHERE
-- (src.country="egypt") AND
-- (dest.country="saudi") AND
-- (flight_date>="2023-06-27")AND
-- (flight_date<="2023-06-27")AND
-- (flight_type="international");