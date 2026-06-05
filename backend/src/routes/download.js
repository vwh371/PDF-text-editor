const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const PDFProcessor = require('../utils/pdfProcessor');

// @route   GET /api/download/pdf-data/:sessionId
// @desc    Get original PDF data for rendering
// @access  Public
router.get('/pdf-data/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await Session.findBySessionId(sessionId);
        
        if (!session) {
            return res.status(404).json({ 
                success: false, 
                error: 'Session not found' 
            });
        }
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="document.pdf"');
        res.send(session.original_pdf);
        
    } catch (error) {
        console.error('PDF data error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to get PDF data' 
        });
    }
});

// @route   POST /api/download/generate/:sessionId
// @desc    Generate and download edited PDF
// @access  Public
router.post('/generate/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { textBlocks } = req.body;
        
        console.log(`🔧 Generating edited PDF for session: ${sessionId}`);
        
        const session = await Session.findBySessionId(sessionId);
        if (!session) {
            return res.status(404).json({ 
                success: false, 
                error: 'Session not found' 
            });
        }
        
        // Apply edits to PDF
        const editedPdfBuffer = await PDFProcessor.applyEditsToPDF(
            session.original_pdf,
            textBlocks
        );
        
        // Save edited PDF to database
        await Session.saveEditedPDF(sessionId, editedPdfBuffer);
        
        console.log(`✅ Edited PDF generated and saved for session: ${sessionId}`);
        
        // Send the edited PDF for download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=PDFlow_Edit_Edited.pdf');
        res.send(editedPdfBuffer);
        
    } catch (error) {
        console.error('Generate PDF error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to generate PDF: ' + error.message 
        });
    }
});

// @route   GET /api/download/edited/:sessionId
// @desc    Download already edited PDF from database
// @access  Public
router.get('/edited/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const result = await Session.getEditedPDF(sessionId);
        
        if (!result) {
            return res.status(404).json({ 
                success: false, 
                error: 'Session not found' 
            });
        }
        
        const pdfBuffer = result.edited_pdf || result.original_pdf;
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=PDFlow_Edit_Edited.pdf');
        res.send(pdfBuffer);
        
    } catch (error) {
        console.error('Download edited PDF error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to download PDF' 
        });
    }
});

// @route   DELETE /api/download/session/:sessionId
// @desc    Delete session and associated files
// @access  Public
router.delete('/session/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        
        // MySQL doesn't have a direct delete method in our Session model
        // We'll add one
        const { promisePool } = require('../config/database');
        const [result] = await promisePool.execute(
            'DELETE FROM sessions WHERE session_id = ?',
            [sessionId]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Session not found' 
            });
        }
        
        console.log(`🗑 Session ${sessionId} deleted`);
        
        res.json({
            success: true,
            message: 'Session deleted successfully'
        });
        
    } catch (error) {
        console.error('Delete session error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to delete session' 
        });
    }
});

module.exports = router;