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

// @route   POST /api/edit/update-blocks/:sessionId
// @desc    Update text blocks
// @access  Public
router.post('/update-blocks/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { textBlocks, editHistory } = req.body;
        
        // Validate session exists
        const session = await Session.findBySessionId(sessionId);
        if (!session) {
            return res.status(404).json({ 
                success: false, 
                error: 'Session not found' 
            });
        }
        
        // Update text blocks in database
        await Session.updateTextBlocks(sessionId, textBlocks);
        
        // Save edit history if provided
        if (editHistory) {
            await Session.addEditHistory(
                sessionId,
                editHistory.blockId,
                editHistory.oldText || '',
                editHistory.newText || '',
                editHistory.oldFontSize || 12,
                editHistory.newFontSize || 12,
                editHistory.oldColor || '#000000',
                editHistory.newColor || '#000000'
            );
            console.log(`📝 Edit history saved for block: ${editHistory.blockId}`);
        }
        