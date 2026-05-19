const crypto = require('crypto');

/**
 * Generates a unique SHA-256 cryptographic seal for the evidence data package.
 * @param {string} url - The web page address where harassment occurred.
 * @param {string} timestamp - The ISO format network timestamp of the capture.
 * @param {string} text - The raw text evidence scraped from the screen.
 * @returns {string} The SHA-256 hexadecimal validation hash.
 */
function generateHash(url, timestamp, text) {
    const backupTimestamp = timestamp || new Date().toISOString();
    
    // Combine fields into an immutable data string payload
    const dataPackage = `URL:${url}|TIME:${backupTimestamp}|TEXT:${text}`;
    
    // Create the SHA-256 digital signature
    return crypto.createHash('sha256').update(dataPackage).digest('hex');
}

module.exports = { generateHash };
