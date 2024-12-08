CREATE DATABASE propertyManagement;

CREATE TABLE owners(
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    middlename VARCHAR(255),
    llc_name VARCHAR(255),
    driver_ln VARCHAR(255),
    phone01 VARCHAR(255),
    p01_type PHONE_TYPE,
    phone02 VARCHAR(255),
    p02_type PHONE_TYPE,
    phone03 VARCHAR(255),
    p03_type PHONE_TYPE,
    contact_method VARCHAR(255),
    _address VARCHAR(255),
    city VARCHAR(255),
    _state VARCHAR(255),
    zip VARCHAR(255),
    dob DATE,
    ssna VARCHAR(255),
    ssnb VARCHAR(255),
    econtact VARCHAR(255) references emergency_c(_name)
);

CREATE TABLE managers(
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    middlename VARCHAR(255),
    llc_name VARCHAR(255),
    driver_ln VARCHAR(255),
    phone01 VARCHAR(255),
    p01_type PHONE_TYPE,
    phone02 VARCHAR(255),
    p02_type PHONE_TYPE,
    phone03 VARCHAR(255),
    p03_type PHONE_TYPE,
    contact_method VARCHAR(255),
    _address VARCHAR(255),
    city VARCHAR(255),
    _state VARCHAR(255),
    zip VARCHAR(255),
    dob DATE,
    ssna VARCHAR(255),
    ssnb VARCHAR(255),
    econtact VARCHAR(255) references emergency_c(_name)
);
 
CREATE TYPE phone_type AS ENUM ('cell', 'home', 'work');
CREATE TYPE income_type AS ENUM ('weekly', 'biweekly', 'monthly', 'yearly');

CREATE TABLE occupants(id SERIAL PRIMARY KEY,  _name UNIQUE VARCHAR(255), relationship VARCHAR(255), occupation VARCHAR(255), age VARCHAR(255));

CREATE TABLE emergency_c( id SERIAL PRIMARY KEY, _name VARCHAR(255), relationship VARCHAR(255), occupation VARCHAR(255), age VARCHAR(255), phone_primary VARCHAR(255), phone_p_type PHONE_TYPE,email VARCHAR(255),_address VARCHAR(255),);

CREATE TABLE pets(id SERIAL PRIMARY KEY,_name VARCHAR(255),_type VARCHAR(255),breed VARCHAR(255),_weight VARCHAR(255));

CREATE TABLE vehicles(id SERIAL PRIMARY KEY,_year SMALLINT,make VARCHAR(255),color VARCHAR(255),plate_num VARCHAR(255),_state VARCHAR(255),);

CREATE TABLE tenants(id SERIAL PRIMARY KEY, username VARCHAR(255) UNIQUE,email VARCHAR(255) UNIQUE,_password VARCHAR(255),firstname VARCHAR(255),lastname VARCHAR(255),middlename VARCHAR(255),dob DATE,ssna VARCHAR(255),ssnb VARCHAR(255),married BOOLEAN,divorce_date DATE,phone_primary VARCHAR(255),phone_p_type phone_type,phone_secondary VARCHAR(255),occupant01 VARCHAR(255) references occupants(_name),occupant02 VARCHAR(255) references occupants(_name),occupant03 VARCHAR(255) references occupants(_name),econtact VARCHAR(255) references emergency_c(_name),vehicle VARCHAR(255) references vehicles(plate_num),employer VARCHAR(255),occupation VARCHAR(255),hpw VARCHAR(255),supervisor VARCHAR(255),employer_phone VARCHAR(255),employer_phone_type phone_type,employer_ext VARCHAR(255),employer_email VARCHAR(255),years_employed INTEGER,employer_address VARCHAR(255),income VARCHAR(255),i_type INCOME_TYPE,_signature VARCHAR(255),signed_date DATE);