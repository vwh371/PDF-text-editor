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
        