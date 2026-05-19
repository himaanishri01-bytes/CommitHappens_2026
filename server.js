const express = require('express');
const cors = require('cors');
const { generateForensicHash } = require('./hasher'); // Pulls in your Step 2 utility

const app = express();

// Enable cross-origin requests so your teammates' frontends can talk to your server
app.use(cors());
app.use(express.json());

const PORT = 5000;

/**
 * Primary Evidence Ingestion Endpoint
 * Matches the POST request format specified in your team's API schema documentation
 */
app.post('/api/evidence', (req, res) => {
    const { url, timestamp, evidenceText } = req.body;

    // Direct backend data validation
    if (!url || !evidenceText) {
        return res.status(400).json({ 
            status: "error", 
            message: "Automated forensic capture payload incomplete." 
        });
    }

    const evidencePayload = {
        url: url,
        timestamp: timestamp || new Date().toISOString(),
        evidenceText: evidenceText
    };

    try {
        // Calculate the SHA-256 integrity seal
        const cryptographicSeal = generateForensicHash(evidencePayload);
        
        // Generate a matching mock download URL string for the final PDF report
        const randomIncidentId = Math.floor(10000000 + Math.random() * 90000000);
        const reportDownloadUrl = `http://localhost:5000/vault/report-${randomIncidentId}.pdf`;

        // Console logger so you can watch your backend work in real-time
        console.log(`\n==================================================`);
        console.log(`🚨 [INBOUND FORENSIC ACQUISITION INTERCEPTED]`);
        console.log(`URL: ${evidencePayload.url}`);
        console.log(`Calculated Security Seal: ${cryptographicSeal}`);
        console.log(`==================================================`);

        // Returns the exact structured JSON response promised in the README schema
        return res.status(200).json({
            status: "success",
            hash: cryptographicSeal,
            downloadUrl: reportDownloadUrl
        });

    } catch (error) {
        console.error("Backend pipeline error:", error);
        return res.status(500).json({ 
            status: "error", 
            message: "Internal cryptographic validation failure." 
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Core Infrastructure engine active and running on http://localhost:${PORT}`);
});