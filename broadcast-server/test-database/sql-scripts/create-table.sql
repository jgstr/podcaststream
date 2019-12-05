-- noinspection SqlDialectInspectionForFile
-- noinspection SqlNoDataSourceInspectionForFile

-- This mocks the database used in the end-to-end test
CREATE DATABASE IF NOT EXISTS broadcast;

GRANT ALL PRIVILEGES ON broadcast.* TO 'root';

CREATE TABLE settings (
    broadcast_key VARCHAR(100) PRIMARY KEY,
    value VARCHAR(255) NOT NULL
    );