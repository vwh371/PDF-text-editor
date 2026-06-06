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
        const query = 'UPDATE sessions SET text_blocks = ?, status = "editing", updated_at = NOW() WHERE session_id = ?';
        const [result] = await promisePool.execute(query, [JSON.stringify(textBlocks), sessionId]);
        return result.affectedRows;
    }

    // Save edited PDF
    static async saveEditedPDF(sessionId, pdfBuffer) {
        const query = 'UPDATE sessions SET edited_pdf = ?, status = "saved", updated_at = NOW() WHERE session_id = ?';
        const [result] = await promisePool.execute(query, [pdfBuffer, sessionId]);
        return result.affectedRows;
    }

    // Get edited PDF
    static async getEditedPDF(sessionId) {
        const query = 'SELECT edited_pdf, original_pdf FROM sessions WHERE session_id = ?';
        const [rows] = await promisePool.execute(query, [sessionId]);
        return rows[0];
    }

    // Add edit history
    static async addEditHistory(sessionId, blockId, oldText, newText, oldFontSize, newFontSize, oldColor, newColor) {
        const query = `
            INSERT INTO edit_history (session_id, block_id, old_text, new_text, old_font_size, new_font_size, old_color, new_color)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await promisePool.execute(query, [
            sessionId, blockId, oldText, newText, oldFontSize, newFontSize, oldColor, newColor
        ]);
        return result.insertId;
    }

    // Get edit history
    static async getEditHistory(sessionId) {
        const query = 'SELECT * FROM edit_history WHERE session_id = ? ORDER BY edited_at DESC';
        const [rows] = await promisePool.execute(query, [sessionId]);
        return rows;
    }

    // Delete old sessions (older than 24 hours)
    static async deleteOldSessions() {
        const query = 'DELETE FROM sessions WHERE created_at < DATE_SUB(NOW(), INTERVAL 24 HOUR) AND status = "saved"';
        const [result] = await promisePool.execute(query);
        return result.affectedRows;
    }
}

module.exports = Session;