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
        
        res.json({ 
            success: true, 
            message: 'Text blocks updated successfully' 
        });
        
    } catch (error) {
        console.error('Update blocks error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to update text blocks' 
        });
    }
});

// @route   POST /api/edit/reset/:sessionId
// @desc    Reset to original text blocks
// @access  Public
router.post('/reset/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await Session.findBySessionId(sessionId);
        
        if (!session) {
            return res.status(404).json({ 
                success: false, 
                error: 'Session not found' 
            });
        }
        
        // Get original text blocks
        const originalBlocks = JSON.parse(session.text_blocks);
        
        // Reset text to original values
        const resetBlocks = originalBlocks.map(block => ({
            ...block,
            text: block.originalText || block.text
        }));
        
        // Update database with reset blocks
        await Session.updateTextBlocks(sessionId, resetBlocks);
        
        console.log(`🔄 Session ${sessionId} reset to original`);
        
        res.json({
            success: true,
            textBlocks: resetBlocks,
            message: 'Reset to original text successfully'
        });
        
    } catch (error) {
        console.error('Reset error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to reset' 
        });
    }
});

// @route   GET /api/edit/history/:sessionId
// @desc    Get edit history
// @access  Public
router.get('/history/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const history = await Session.getEditHistory(sessionId);
        
        res.json({
            success: true,
            history
        });
        
    } catch (error) {
        console.error('Get history error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to get edit history' 
        });
    }
});

// @route   DELETE /api/edit/block/:sessionId/:blockId
// @desc    Delete a specific text block
// @access  Public
router.delete('/block/:sessionId/:blockId', async (req, res) => {
    try {
        const { sessionId, blockId } = req.params;
        const session = await Session.findBySessionId(sessionId);
        
        if (!session) {
            return res.status(404).json({ 
                success: false, 
                error: 'Session not found' 
            });
        }
        
        let textBlocks = JSON.parse(session.text_blocks);
        const deletedBlock = textBlocks.find(block => block.id === blockId);
        
        // Remove the block
        textBlocks = textBlocks.filter(block => block.id !== blockId);
        
        // Update database
        await Session.updateTextBlocks(sessionId, textBlocks);
        
        console.log(`🗑 Deleted block ${blockId} from session ${sessionId}`);
        