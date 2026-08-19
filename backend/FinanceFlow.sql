CREATE DATABASE FinanceFlow;

USE FinanceFlow;

CREATE TABLE User(
	id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone_no BIGINT NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(50),
    
    age INT
    
    
);