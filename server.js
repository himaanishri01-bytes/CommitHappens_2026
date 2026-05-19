const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { generateHash } = require('./hasher');
const PDFDocument = require('pdfkit');

const app = express();
const PORT = 5000;

// Setup secure storage vault folder
const vaultDir = path.join(__dirname, 'vault');
if (!fs.existsSync(vaultDir)) {
    fs.mkdirSync(vaultDir);
}

app.use(cors());
app.use(express.json());
app.use('/vault', express.static(vaultDir));

// STRICTLY FOR DESKTOP CHROME EXTENSION AUTOMATION
app.post('/api/evidence', async (req, res) => {
    try {
        const { url, timestamp, evidenceText } = req.body;

        if (!url || !evidenceText) {
            return res.status(400).json({ error: 'Missing required automated evidence fields.' });
        }

        // Create the tamper-evident cryptographic seal
        const hash = generateHash(url, timestamp, evidenceText);
        const filename = `evidence-${Date.now()}.pdf`;
        const filePath = path.join(vaultDir, filename);

        // Generate the automated PDF report
        const doc = new PDFDocument({ margin: 50 });
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        doc.fillColor('#1a1a1a').fontSize(20).text('AUTOMATED DIGITAL EVIDENCE REPORT', { align: 'center', underline: true });
        doc.moveDown(1.5);
        doc.fontSize(12).fillColor('#333333');
        doc.text(`Captured Timestamp: ${timestamp}`);
        doc.text(`Source URL: ${url}`, { lineGap: 12 });
        doc.moveDown();
        doc.fillColor('#1a1a1a').fontSize(14).text('Scraped Webpage Content:', { bold: true, lineGap: 8 });
        doc.fontSize(11).fillColor('#444444').text(evidenceText, { align: 'left', lineGap: 15 });
        doc.moveDown();
        doc.rect(doc.x, doc.y, 500, 55).fillAndStroke('#f4f6f9', '#cbd5e1');
        doc.fillColor('#b91c1c').fontSize(10).text('CRYPTOGRAPHIC TAMPER-EVIDENT SEAL (SHA-256):', 60, doc.y + 10);
        doc.fillColor('#0f172a').font('Courier').fontSize(10).text(hash, 60, doc.y + 15);
        
        doc.end();

        writeStream.on('finish', () => {
            res.status(200).json({
                status: 'success',
                hash: hash,
                downloadUrl: `http://localhost:${PORT}/vault/${filename}`
            });
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server failure.' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`AUTOMATED BACKEND ACTIVE: Listening on http://localhost:${PORT}`);
});
