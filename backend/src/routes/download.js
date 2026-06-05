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
