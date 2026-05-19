const crypto = require('crypto');

/**
 * Generates an immutable SHA-256 cryptographic hash acting as a digital fingerprint.
 * @param {Object} evidenceData - Incoming structured automated payload
 * @returns {string} Hexadecimal tamper-proof verification signature
 */
function generateForensicHash(evidenceData) {
    // Rigidly sequence the core fields to preserve strict data integrity
    const rawSequenceString = [
        evidenceData.url,
        evidenceData.timestamp,
        evidenceData.evidenceText
    ].join('||');
    
    return crypto
        .createHash('sha256')
        .update(rawSequenceString)
        .digest('hex');
}

module.exports = { generateForensicHash };