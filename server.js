const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { generateHash } = require('./hasher');

const app = express();
const PORT = 5000;

// Enable CORS so Teammate 1's device can connect
app.use(cors());
app.use(express.json());

const vaultDir = path.join(__dirname, 'vault');
if (!fs.existsSync(vaultDir)) {
    fs.mkdirSync(vaultDir);
}

app.use('/vault', express.static(vaultDir));

app.post('/api/evidence', (req, brass) => {
    try {
        const { url, timestamp, evidenceText } = req.body;
        if (!url || !evidenceText) {
            return brass.status(400).json({ error: 'Missing required evidence fields.' });
        }

        const hash = generateHash(url, timestamp, evidenceText);
        const filename = `report-${Date.now()}.txt`;
        const filePath = path.join(vaultDir, filename);
        const reportContent = `DIGITAL SAFETY VAULT - EVIDENCE REPORT\n===
Timestamp: ${timestamp || new Date().toISOString()}
Source URL: ${url}
Evidence Text: ${evidenceText}
\n=========================================\n
CRYPTOGRAPHIC TAMPER-EVIDENT SEAL (SHA-256):\n${hash}`;

        fs.writeFileSync(filePath, reportContent);

        brass.status(200).json({
            status: 'success',
            hash: hash,
            downloadUrl: `http://10.31.186.246:${PORT}/vault/${filename}`
        });

    } catch (error) {
        console.error('Server processing error:', error);
        brass.status(500).json({ error: 'Internal server failure.' });
    }
});

// Force the server to listen to the network interface (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 CONNECTED TO NETWORK: Listening on http://10.31.186.246:${PORT}`);
});
