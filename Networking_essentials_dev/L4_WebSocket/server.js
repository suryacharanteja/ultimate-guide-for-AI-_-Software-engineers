// ============================================================
//  LESSON 4: WEBSOCKET — Upgrading HTTP to stay open
//  Run this with:  node server.js
//  Then open browser:  http://localhost:3000
// ============================================================
//
//  INSTALL FIRST:  npm install ws
// ============================================================

const http = require('http');
const { WebSocketServer } = require('ws');

// --- STEP 1: Create a regular HTTP server (for the web page) ---
const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
    <html>
    <body style="font-family: Arial; padding: 30px; background: #1a1a2e; color: #eee;">
        <h1>🔌 Lesson 4: WebSocket Chat</h1>
        <div id="messages" style="background: #16213e; padding: 15px; border-radius: 8px;
             height: 300px; overflow-y: auto; margin-bottom: 10px;"></div>
        <input id="input" type="text" placeholder="Type a message..."
               style="width: 70%; padding: 10px; font-size: 16px; border-radius: 6px; border: none;">
        <button onclick="send()"
                style="padding: 10px 20px; font-size: 16px; background: #0ff; border: none;
                       border-radius: 6px; cursor: pointer;">Send</button>

        <script>
            // --- BROWSER-SIDE WEBSOCKET CLIENT ---
            const ws = new WebSocket('ws://localhost:3000');
            const messages = document.getElementById('messages');
            const input = document.getElementById('input');

            ws.onopen = () => addMsg('✅ Connected to WebSocket server!', '#0f0');
            ws.onmessage = (event) => addMsg('📨 Server: ' + event.data, '#0ff');
            ws.onclose = () => addMsg('🔌 Disconnected', '#f55');

            function send() {
                const msg = input.value.trim();
                if (msg) {
                    ws.send(msg);
                    addMsg('📤 You: ' + msg, '#aaa');
                    input.value = '';
                }
            }

            input.addEventListener('keypress', (e) => { if (e.key === 'Enter') send(); });

            function addMsg(text, color) {
                messages.innerHTML += '<div style="color:' + color + '; margin: 5px 0;">' + text + '</div>';
                messages.scrollTop = messages.scrollHeight;
            }
        </script>

        <hr style="margin-top: 20px;">
        <h3>What's different from HTTP?</h3>
        <pre style="background: #0d1117; padding: 15px; border-radius: 8px; color: #8b949e;">
HTTP:       Client asks → Server answers → DONE (connection closes)
WebSocket:  Client connects → BOTH can send at ANY time → stays open

Step-by-step:
1. Browser sends HTTP request with "Upgrade: websocket" header
2. Server responds "101 Switching Protocols"
3. TCP connection stays open — now it's a WebSocket!
4. Either side can send messages whenever they want
        </pre>
    </body>
    </html>
    `);
});

// --- STEP 2: Attach WebSocket server to the HTTP server ---
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
    console.log('✅ WebSocket client connected!');

    ws.send('Welcome! You are connected via WebSocket.');

    ws.on('message', (data) => {
        const message = data.toString();
        console.log('📨 Client says:', message);

        // Echo back with timestamp
        ws.send(`[${new Date().toLocaleTimeString()}] Received: "${message}"`);
    });

    ws.on('close', () => {
        console.log('🔌 WebSocket client disconnected');
    });
});

// --- STEP 3: Start listening ---
httpServer.listen(3000, '127.0.0.1', () => {
    console.log('🚀 HTTP + WebSocket server on http://localhost:3000');
});

// ============================================================
//  WHAT'S HAPPENING:
//
//  Browser                              Your Server
//  ┌──────────┐  1. GET / HTTP/1.1      ┌──────────┐
//  │  Chrome  │────────────────────────►│  HTTP    │
//  │          │◄── 200 OK + HTML ───────│  :3000   │
//  │          │                         │          │
//  │  JS code │  2. Upgrade: websocket  │          │
//  │          │────────────────────────►│  WS      │
//  │          │◄── 101 Switching ───────│  server  │
//  │          │                         │          │
//  │          │◄═══════════════════════►│          │
//  └──────────┘  3. Full-duplex pipe!   └──────────┘
//
//  KEY INSIGHT: WebSocket STARTS as HTTP, then UPGRADES.
//  After upgrade, it's like a TCP pipe (L1) but in the browser!
//  This is how real-time apps (chat, gaming, MCP SSE) work.
// ============================================================
