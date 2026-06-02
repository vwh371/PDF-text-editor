const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const { testConnection } = require('./config/database');
const Session = require('./models/Session');
const PDFProcessor = require('./utils/pdfProcessor');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use('/api/', limiter);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 20 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    }
});

// Test database connection on startup
testConnection();

// Clean up old sessions every hour
setInterval(async () => {
    const deleted = await Session.deleteOldSessions();
    if (deleted > 0) {
        console.log(`🧹 Cleaned up ${deleted} old sessions`);
    }
}, 60 * 60 * 1000);

// Upload PDF endpoint
app.post('/api/upload', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const sessionId = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 16);
        const fileSize = req.file.size;
        const fileName = req.file.originalname;
        
        // Extract text blocks from PDF
        const textBlocks = await PDFProcessor.extractTextWithCoordinates(req.file.buffer);
        const pageCount = textBlocks.pageCount || 1;
        
        // Save to database
        await Session.create(
            sessionId,
            fileName,
            fileSize,
            pageCount,
            req.file.buffer,
            textBlocks
        );
        
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
        res.status(500).json({ error: 'Failed to process PDF: ' + error.message });
    }
});

// Get PDF data for rendering
app.get('/api/pdf-data/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await Session.findBySessionId(sessionId);
        
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        
        res.setHeader('Content-Type', 'application/pdf');
        res.send(session.original_pdf);
    } catch (error) {
        console.error('PDF data error:', error);
        res.status(500).json({ error: 'Failed to get PDF data' });
    }
});

// Get current text blocks
app.get('/api/text-blocks/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await Session.findBySessionId(sessionId);
        
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        
        res.json({
            textBlocks: JSON.parse(session.text_blocks),
            pageCount: session.page_count
        });
    } catch (error) {
        console.error('Get blocks error:', error);
        res.status(500).json({ error: 'Failed to get text blocks' });
    }
});

// Update text blocks
app.post('/api/update-blocks/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { textBlocks, editHistory } = req.body;
        
        const session = await Session.findBySessionId(sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        