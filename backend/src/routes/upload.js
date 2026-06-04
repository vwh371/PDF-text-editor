const express = require('express');
const multer = require('multer');
const router = express.Router();
const Session = require('../models/Session');
const PDFProcessor = require('../utils/pdfProcessor');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    }
});

// @route   POST /api/upload
// @desc    Upload PDF file
// @access  Public
router.post('/', upload.single('pdf'), async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                error: 'No file uploaded' 
            });
        }

        // Generate unique session ID
        const sessionId = Date.now().toString() + '-' + 
                         Math.random().toString(36).substr(2, 16);
        
        const fileSize = req.file.size;
        const fileName = req.file.originalname;
        
        console.log(`📄 Processing PDF: ${fileName} (${fileSize} bytes)`);
        
        // Extract text blocks from PDF
        const textBlocks = await PDFProcessor.extractTextWithCoordinates(req.file.buffer);
        const pageCount = textBlocks.pageCount || 1;
        
        console.log(`📝 Extracted ${textBlocks.length} text blocks from ${pageCount} page(s)`);
        
        // Save to database
        await Session.create(
            sessionId,
            fileName,
            fileSize,
            pageCount,
            req.file.buffer,
            textBlocks
        );
        
        console.log(`💾 Session created: ${sessionId}`);
        
        res.json({
            success: true,
            sessionId,
            textBlocks,
            pageCount,
            fileName,
            message: 'PDF uploaded and processed successfully'
        });
        
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to process PDF: ' + error.message 
        });
    }
});

// @route   GET /api/upload/session/:sessionId
// @desc    Get session info
// @access  Public
router.get('/session/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await Session.findBySessionId(sessionId);
        
        if (!session) {
            return res.status(404).json({ 
                success: false, 
                error: 'Session not found' 
            });
        }
        
        res.json({
            success: true,
            sessionId: session.session_id,
            fileName: session.file_name,
            fileSize: session.file_size,
            pageCount: session.page_count,
            status: session.status,
            createdAt: session.created_at
        });
        
    } catch (error) {
        console.error('Session info error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to get session info' 
        });
    }
});

module.exports = router;