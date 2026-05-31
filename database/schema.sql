
-- Create database
CREATE DATABASE IF NOT EXISTS pdflow_edit;
USE pdflow_edit;

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT,
    page_count INT DEFAULT 1,
    original_pdf LONGBLOB NOT NULL,
    edited_pdf LONGBLOB,
    text_blocks JSON,
    status ENUM('uploaded', 'editing', 'saved') DEFAULT 'uploaded',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_session_id (session_id),
    INDEX idx_status (status)
);

-- Edit history table for tracking changes
CREATE TABLE IF NOT EXISTS edit_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(255) NOT NULL,
    block_id VARCHAR(100),
    old_text TEXT,
    new_text TEXT,
    old_font_size INT,
    new_font_size INT,
    old_color VARCHAR(20),
    new_color VARCHAR(20),
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE,
    INDEX idx_session_id (session_id)
);

-- Create user for application
CREATE USER IF NOT EXISTS 'pdflow_user'@'localhost' IDENTIFIED BY 'Pdflow@2024Secure!';
GRANT ALL PRIVILEGES ON pdflow_edit.* TO 'pdflow_user'@'localhost';
FLUSH PRIVILEGES;