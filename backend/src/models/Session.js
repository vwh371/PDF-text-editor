const { promisePool } = require('../config/database');

class Session {
    // Create new session
    static async create(sessionId, fileName, fileSize, pageCount, pdfBuffer, textBlocks) {
        const query = `
            INSERT INTO sessions (session_id, file_name, file_size, page_count, original_pdf, text_blocks, status)
            VALUES (?, ?, ?, ?, ?, ?, 'uploaded')
        `;
        const [result] = await promisePool.execute(query, [
            sessionId, fileName, fileSize, pageCount, pdfBuffer, JSON.stringify(textBlocks)
        ]);
        return result.insertId;
    }

    // Get session by ID
    static async findBySessionId(sessionId) {
        const query = 'SELECT * FROM sessions WHERE session_id = ?';
        const [rows] = await promisePool.execute(query, [sessionId]);
        return rows[0];
    }
