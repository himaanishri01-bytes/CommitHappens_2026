# Digital Safety Vault (DSV)

An automated, full-stack, and tamper-evident digital evidence preservation system built to secure web data with cryptographic integrity seals.

## Problem Statement and Core Solution

### The Problem
In the modern digital landscape, online harassment, intellectual property theft, corporate non-compliance, and digital fraud are rampant. However, standard screenshots or text copies are legally unreliable because they can be easily manipulated via browser developer tools (Inspect Element) or image editing software. Proving the authenticity of web-based evidence at a specific point in time remains a major hurdle for individuals, legal professionals, and corporations.

### Our Solution
Digital Safety Vault introduces a decentralized approach to digital forensics. With a single click from a lightweight browser extension, the system securely isolates, extracts, and transmits active web content to an automated backend server. 

The backend instantly compiles this data into a structured PDF report and seals it using SHA-256 cryptographic hashing. Any attempt to modify the report post-capture breaks the cryptographic chain, making this tool a definitive source of truth for legally admissible digital evidence.

## Tech Stack and Architecture

* Frontend: HTML5, CSS3, JavaScript (Chrome Extension Manifest V3 API)
* Backend: Node.js, Express.js
* Cryptographic Engine: Node crypto library (SHA-256 Hashing)
* Document Processor: pdfkit (Dynamic Forensic PDF Compilation)

## Step-by-Step Walkthrough (How to Verify Our Work)

Follow these precise steps to initialize the automated ecosystem locally and generate your first secured asset.

### Step 1: Initialize and Launch the Backend Server
1. Open your terminal or Command Prompt.
2. Navigate into the project's backend directory:
   cd backend
3. Install the required Node dependencies specified in the manifest:
   npm install
4. Boot up the automated server listener:
   node server.js
   Verification Check: The terminal will immediately flash: "AUTOMATED BACKEND ACTIVE: Listening on http://localhost:5000"

### Step 2: Inject the Forensic Extension into Chrome
1. Launch Google Chrome and navigate to the extensions panel by entering: chrome://extensions/
2. In the upper-right corner, toggle the Developer mode switch to ON.
3. In the upper-left corner, click the Load unpacked button.
4. Select the Extension folder from this project directory.
   Verification Check: You will see the "Digital Safety Vault Evidence Capture 1.0" card drop cleanly onto your active browser environment.

### Step 3: Trigger the Evidence Pipeline
1. Open a new tab and head to a live, public webpage (such as https://en.wikipedia.org or https://www.google.com).
2. Click the puzzle piece icon in your extensions toolbar and open Digital Safety Vault.
3. Click the blue CAPTURE EVIDENCE button.
4. Watch the status text beneath the button. It will instantly change to "Capturing..." and then lock into "Evidence secured successfully!"

### Step 4: Inspect the Forensic Vault Archive
1. Open your file explorer and navigate into the project directory at backend/vault/.
2. A newly generated, timestamped PDF file will be sitting inside.
3. Open the file to review the compiled structure, absolute timestamp metrics, extracted text strings, and the SHA-256 tamper-evident cryptographic block printed at the bottom.

## Business and Monetization Strategy

To ensure scalable growth, long-term commercial sustainability, and market penetration, Digital Safety Vault implements a flexible, monthly subscription matrix tailored for individual, corporate, and enterprise consumers.

### Free / Retail Tier
* Quota: 30 Captures / Month
* Pricing: Free
* Target Demographic: Everyday Internet Users
* Use-Case: Storing personal proof of online cyberbullying, retail scam receipts, or social media harassment on an occasional basis.

### Premium Pro Tier
* Quota: 100 Captures / Month
* Pricing: 599/- per month
* Target Demographic: Independent Investigators, Freelancers, and Journalists
* Use-Case: Logging active investigative leads, securing whistleblowing records, and archiving digital footprints across multiple ongoing projects.

### Enterprise / Corporate Tier (Level 1)
* Quota: 250 Captures / Month
* Pricing: 1999/- per month
* Target Demographic: Mid-Market SMBs, Legal Firms, and Specialized Agencies
* Use-Case: Managing ongoing compliance records, tracking corporate copyright infringement across the web, and case-building for active litigation.

### Enterprise / Corporate Tier (Level 2)
* Quota: 500 Captures / Month
* Pricing: 3999/- per month
* Target Demographic: Large Conglomerates, Tech Corporates, and Academic Institutions
* Use-Case: High-frequency auditing of digital assets, university research validation, preventing academic fraud, and continuous enterprise risk mitigation.

### Enterprise Customization
For global corporations and Tier-1 academic institutions requiring infinite throughput, custom organizational licenses can be provisioned with dedicated server clustering, automated backup nodes, and custom API webhooks integrated directly into existing internal security dashboards.

## Conclusion

Digital Safety Vault successfully bridges the gap between web browsing and legal enforceability. By pairing a lightweight, user-friendly Chrome extension frontend with a robust, automated backend server, the platform transforms volatile web pages into permanent, cryptographically sealed forensic documents. The strict adherence to Chrome Manifest V3 security standards ensures safety and compliance, while the scalable, tiered enterprise model establishes a clear path toward market monetization. This architecture provides an accessible, un-editable, and definitive framework for protecting digital truth and authenticity across the internet.
