CREATE DATABASE testing;
USE testing;
CREATE TABLE notes
(
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    title    TEXT NOT NULL,
    datetime DATETIME NOT NULL,
    note     LONGTEXT NOT NULL
);
