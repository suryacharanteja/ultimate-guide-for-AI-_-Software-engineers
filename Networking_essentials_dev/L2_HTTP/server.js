// ============================================================
//  LESSON 2: HTTP SERVER — Built on top of TCP
//  Run this with:  node server.js
//  Then open browser:  http://localhost:3000
// ============================================================

const http = require('http');  // Node's built-in HTTP module

// --- STEP 1: Create an HTTP server ---
// Under the hood, this STILL uses TCP (net module)
// HTTP just adds RULES about how the bytes should be formatted
const server = http.createServer((req, res) => {
    // 'req' = the incoming request (what the client asked for)
    // 'res' = the outgoing response (what we send back)

    console.log(`📨 ${req.method} ${req.url}`);
    console.log('   Headers:', JSON.stringify(req.headers, null, 2));

    // --- STEP 2: Route based on URL ---
    if (req.url === '/' && req.method === 'GET') {
        // Send HTML back to the browser
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
            <body style="font-family: Arial; padding: 40px; background: #1a1a2e; color: #eee;">
                <h1>🚀 Lesson 2: HTTP Server</h1>
                <p>This HTML was sent over HTTP, which runs over TCP.</p>
                <p>Try these routes:</p>
                <ul>
                    <li><a href="/json" style="color: #0ff;">/json</a> — Get a JSON response</li>
                    <li><a href="/headers" style="color: #0ff;">/headers</a> — See your request headers</li>
                </ul>
                <hr>
                <p><strong>KEY INSIGHT:</strong> In Lesson 1, we sent raw bytes.
                   Now we send <em>structured</em> bytes with headers and status codes.</p>
            </body>
            </html>
        `);
    }
    else if (req.url === '/json' && req.method === 'GET') {
        // Send JSON — this is exactly what APIs do
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            lesson: 2,
            topic: "HTTP",
            message: "This is a JSON response — the same format MCP uses!",
            timestamp: new Date().toISOString()
        }, null, 2));
    }
    else if (req.url === '/headers' && req.method === 'GET') {
        // Echo back what the client sent
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            yourMethod: req.method,
            yourUrl: req.url,
            yourHeaders: req.headers
        }, null, 2));
    }
    else {
        // 404 — resource not found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
    }
});

// --- STEP 3: Start listening ---
server.listen(3000, '127.0.0.1', () => {
    console.log('🚀 HTTP server listening on http://localhost:3000');
    console.log('👉 Open your browser to http://localhost:3000');
});

// ============================================================
//  WHAT'S HAPPENING:
//
//  Browser                          Your Server
//  ┌──────────┐                     ┌──────────┐
//  │  Chrome  │── GET / HTTP/1.1 ──►│  Node.js │
//  │          │◄── 200 OK + HTML ───│  :3000   │
//  └──────────┘                     └──────────┘
//
//  Compare with Lesson 1:
//  - L1: Raw TCP → you send ANY bytes
//  - L2: HTTP    → bytes follow a strict format:
//        "METHOD URL HTTP/version\r\nHeaders\r\n\r\nBody"
//
//  HTTP is just an AGREEMENT layered on top of TCP!
// ============================================================
