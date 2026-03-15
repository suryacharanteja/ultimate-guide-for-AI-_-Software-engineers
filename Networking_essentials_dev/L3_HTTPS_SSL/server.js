// ============================================================
//  LESSON 3: HTTPS + SSL/TLS — Securing HTTP
//  Run this with:  node server.js
//  Then open browser:  https://localhost:3443  (accept the warning)
// ============================================================
//
//  FIRST: Generate self-signed certificates (run once):
//    openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"
//
//  This creates key.pem (private key) and cert.pem (certificate)
// ============================================================

const https = require('https');
const fs = require('fs');
const path = require('path');

// --- STEP 1: Load SSL certificates ---
const keyPath = path.join(__dirname, 'key.pem');
const certPath = path.join(__dirname, 'cert.pem');

// Check if certs exist
if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    console.error('❌ SSL certificates not found!');
    console.error('   Run this command first:');
    console.error('   openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"');
    process.exit(1);
}

const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
};

// --- STEP 2: Create HTTPS server (identical API to HTTP!) ---
const server = https.createServer(options, (req, res) => {
    console.log(`🔒 ${req.method} ${req.url} (encrypted)`);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <html>
        <body style="font-family: Arial; padding: 40px; background: #0d1117; color: #58a6ff;">
            <h1>🔒 Lesson 3: HTTPS Server</h1>
            <p>This page was delivered over an <strong>encrypted</strong> TLS connection.</p>
            <h3>What changed from Lesson 2?</h3>
            <ul>
                <li>Same HTTP protocol — same headers, same methods</li>
                <li>But wrapped in a TLS tunnel — data is <strong>encrypted</strong> in transit</li>
                <li>Port changed: 80 (HTTP) → <strong>443</strong> (HTTPS, we use 3443 here)</li>
            </ul>
            <h3>The Handshake (simplified):</h3>
            <pre style="background: #161b22; padding: 15px; border-radius: 8px;">
1. Client: "Hello, I support TLS 1.3"
2. Server: "Here's my certificate (cert.pem)"
3. Client: "Certificate looks valid, let's agree on a key"
4. Both:   *exchange keys using asymmetric crypto*
5. Both:   "Now all HTTP traffic is encrypted with this shared key"
            </pre>
            <p><strong>KEY INSIGHT:</strong> HTTPS = HTTP + TLS. The H in HTTPS stands for "secure."
               The actual HTTP messages are identical — they're just encrypted before sending.</p>
        </body>
        </html>
    `);
});

// --- STEP 3: Listen on port 3443 ---
server.listen(3443, '127.0.0.1', () => {
    console.log('🔒 HTTPS server listening on https://localhost:3443');
    console.log('⚠️  Browser will show a warning (self-signed cert) — click "Advanced" → "Proceed"');
});

// ============================================================
//  WHAT'S HAPPENING:
//
//  Browser                              Your Server
//  ┌──────────┐                         ┌──────────┐
//  │  Chrome  │── TLS Handshake ───────►│  Node.js │
//  │          │◄── Certificate ─────────│  :3443   │
//  │          │── Encrypted GET / ─────►│          │
//  │          │◄── Encrypted HTML ──────│          │
//  └──────────┘                         └──────────┘
//
//  Layer stack:
//  ┌─────────────────┐
//  │    HTTP (L2)     │  ← Same as Lesson 2
//  ├─────────────────┤
//  │    TLS/SSL       │  ← NEW: encryption layer
//  ├─────────────────┤
//  │    TCP (L1)      │  ← Same as Lesson 1
//  └─────────────────┘
// ============================================================
