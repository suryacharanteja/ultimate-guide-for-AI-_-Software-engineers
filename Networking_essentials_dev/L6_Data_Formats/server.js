// ============================================================
//  LESSON 6: DATA FORMATS — JSON, XML, YAML in action
//  Run this with:  node server.js
//  Then open browser:  http://localhost:3000
// ============================================================

const http = require('http');

// --- The SAME data, represented in 3 formats ---
const userData = {
    user: "Alice",
    id: 101,
    isActive: true,
    skills: ["Python", "JavaScript", "MCP"]
};

// --- Manual format converters (to show what's happening) ---

function toJSON(data) {
    return JSON.stringify(data, null, 2);
}

function toXML(data) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<user>
  <name>${data.user}</name>
  <id>${data.id}</id>
  <isActive>${data.isActive}</isActive>
  <skills>
${data.skills.map(s => `    <skill>${s}</skill>`).join('\n')}
  </skills>
</user>`;
}

function toYAML(data) {
    return `# User Profile
user: ${data.user}
id: ${data.id}
isActive: ${data.isActive}
skills:
${data.skills.map(s => `  - ${s}`).join('\n')}`;
}

function toCSV(data) {
    return `user,id,isActive,skills
${data.user},${data.id},${data.isActive},"${data.skills.join(';')}"`;
}

// --- HTTP Server with format routes ---
const server = http.createServer((req, res) => {
    console.log(`📨 ${req.method} ${req.url}`);

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
        <html>
        <body style="font-family: monospace; padding: 30px; background: #0d1117; color: #c9d1d9;">
            <h1>📦 Lesson 6: Data Formats</h1>
            <p>Same data, different formats. Click each to compare:</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                <a href="/json" style="display:block; background:#1a2332; padding:20px; border-radius:8px;
                   color:#58a6ff; text-decoration:none; text-align:center; font-size:18px;">
                   📦 JSON</a>
                <a href="/xml" style="display:block; background:#1a2332; padding:20px; border-radius:8px;
                   color:#f0883e; text-decoration:none; text-align:center; font-size:18px;">
                   🏷️ XML</a>
                <a href="/yaml" style="display:block; background:#1a2332; padding:20px; border-radius:8px;
                   color:#3fb950; text-decoration:none; text-align:center; font-size:18px;">
                   📄 YAML</a>
                <a href="/csv" style="display:block; background:#1a2332; padding:20px; border-radius:8px;
                   color:#d2a8ff; text-decoration:none; text-align:center; font-size:18px;">
                   📊 CSV</a>
            </div>
            <hr style="margin-top:30px; border-color:#30363d;">
            <p><strong>KEY INSIGHT:</strong> The data is identical — only the <em>packaging</em> changes.<br>
               APIs choose JSON. Config files choose YAML. Legacy systems choose XML.</p>
        </body>
        </html>
        `);
    }
    else if (req.url === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(toJSON(userData));
    }
    else if (req.url === '/xml') {
        res.writeHead(200, { 'Content-Type': 'application/xml' });
        res.end(toXML(userData));
    }
    else if (req.url === '/yaml') {
        res.writeHead(200, { 'Content-Type': 'text/yaml' });
        res.end(toYAML(userData));
    }
    else if (req.url === '/csv') {
        res.writeHead(200, { 'Content-Type': 'text/csv' });
        res.end(toCSV(userData));
    }
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('🚀 Data Formats server on http://localhost:3000');
});

// ============================================================
//  WHAT'S HAPPENING:
//
//  Same JavaScript object → 4 different text formats
//
//  { user: "Alice", id: 101 }
//       │         │         │         │
//       ▼         ▼         ▼         ▼
//     JSON      XML      YAML      CSV
//
//  The Content-Type header tells the browser what format it is.
//  This is why HTTP headers matter — they describe the payload.
//
//  MCP uses JSON exclusively. But understanding ALL formats
//  helps you work with the wider ecosystem.
// ============================================================
