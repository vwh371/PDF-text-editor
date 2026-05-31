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

    // Update text blocks
    static async updateTextBlocks(sessionId, textBlocks) {
        const query = 'UPDATE sessions SET text_blocks = ?, status = 'editing', updated_at = NOW() WHERE session_id = ?';
        const [result] = await promisePool.execute(query, [JSON.stringify(textBlocks), sessionId]);
        return result.affectedRows;
    }

    // Save edited PDF
    static async saveEditedPDF(sessionId, pdfBuffer) {
        const query = 'UPDATE sessions SET edited_pdf = ?, status = 'saved', updated_at = NOW() WHERE session_id = ?';
        const [result] = await promisePool.execute(query, [pdfBuffer, sessionId]);
        return result.affectedRows;
    }

    // Get edited PDF
    static async getEditedPDF(sessionId) {
        const query = 'SELECT edited_pdf, original_pdf FROM sessions WHERE session_id = ?';
        const [rows] = await promisePool.execute(query, [sessionId]);
        return rows[0];
    }
