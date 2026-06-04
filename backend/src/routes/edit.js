const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// @route   GET /api/edit/text-blocks/:sessionId
// @desc    Get current text blocks
// @access  Public
router.get('/text-blocks/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await Session.findBySessionId(sessionId);
        
        if (!session) {
            return res.status(404).json({ 
                success: false, 
                error: 'Session not found' 
            });
        }
        
        const textBlocks = JSON.parse(session.text_blocks);
        
        res.json({
            success: true,
            textBlocks,
            pageCount: session.page_count
        });
        
    } catch (error) {
        console.error('Get text blocks error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to get text blocks' 
        });
    }
});
