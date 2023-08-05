DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;
SELECT DATABASE();

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    
    FOREIGN KEY (department_id) REFERENCES departments(id),
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,

    FOREIGN KEY (role_id) REFERENCES roles(id), 

    PRIMARY KEY (id)
);

CREATE TABLE managers (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    department_id INT NOT NULL,

    FOREIGN KEY (department_id) REFERENCES departments(id),
    PRIMARY KEY (id)
);