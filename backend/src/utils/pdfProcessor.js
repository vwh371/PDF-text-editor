const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const pdfParse = require('pdf-parse');

class PDFProcessor {
    // Extract text with coordinates from PDF
    static async extractTextWithCoordinates(pdfBuffer) {
        try {
            // Parse text content
            const data = await pdfParse(pdfBuffer);
            const pdfDoc = await PDFDocument.load(pdfBuffer);
            const pageCount = pdfDoc.getPageCount();
            const allTextBlocks = [];
            
            const textLines = data.text.split('\n').filter(line => line.trim().length > 0);
            
            for (let pageNum = 0; pageNum < pageCount; pageNum++) {
                const page = pdfDoc.getPage(pageNum);
                const { width, height } = page.getSize();
                
                const linesPerPage = Math.ceil(textLines.length / pageCount);
                const startIdx = pageNum * linesPerPage;
                const endIdx = Math.min(startIdx + linesPerPage, textLines.length);
                const pageLines = textLines.slice(startIdx, endIdx);
                
                let yOffset = height - 80;
                pageLines.forEach((line, idx) => {
                    if (line.trim()) {
                        allTextBlocks.push({
                            id: `p${pageNum}_${idx}_${Date.now()}`,
                            page: pageNum,
                            text: line.trim(),
                            originalText: line.trim(),
                            x: 70,
                            y: yOffset,
                            fontSize: 12,
                            color: '#000000',
                            width: Math.max(200, line.length * 7.2),
                            height: 20
                        });
                        yOffset -= 25;
                    }
                });
            }
            