DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department_info (
    id INT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role_id (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INT NOT NULL
    PRIMARY KEY(id)
);

CREATE TABLE employee_id (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL
    PRIMARY KEY(id)
)

INSERT INTO department_id ()
VALUES ()

INSERT INTO role_id ()
VALUES ()

INSERT INTO employee_id()
VALUES ()

SELECT * FROM 