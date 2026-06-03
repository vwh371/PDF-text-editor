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
