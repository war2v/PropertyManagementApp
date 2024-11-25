CREATE DATABASE propertyManagement;

CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255),
    email VARCHAR(255)
);