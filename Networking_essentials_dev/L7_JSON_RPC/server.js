// ============================================================
//  LESSON 7: JSON-RPC — Calling remote functions with JSON
//  Run this with:  node server.js
//  Then run:  node client.js
// ============================================================

const http = require('http');

// --- STEP 1: Define the "tools" (functions) the server exposes ---
const tools = {
    add: (params) => ({ result: params.a + params.b }),
    greet: (params) => ({ result: `Hello, ${params.name}!` }),
    get_weather: (params) => ({
        result: {
            city: params.city,
            temperature: `${Math.floor(Math.random() * 35 + 10)}°C`,
            condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]
        }
    }),
    list_tools: () => ({
        result: Object.keys(tools).map(name => ({ name, description: `Tool: ${name}` }))
    })
};

// --- STEP 2: Create JSON-RPC server ---
const server = http.createServer((req, res) => {
    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('JSON-RPC requires POST\n');
        return;
    }

    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        console.log('📨 Received:', body);

        try {
            const request = JSON.parse(body);

            // Validate JSON-RPC 2.0 structure
            if (request.jsonrpc !== '2.0' || !request.method) {
                throw new Error('Invalid JSON-RPC request');
            }

            // Look up and execute the method
            const fn = tools[request.method];
            if (!fn) {
                // Method not found error
                const errorResponse = {
                    jsonrpc: '2.0',
                    id: request.id,
                    error: { code: -32601, message: `Method not found: ${request.method}` }
                };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(errorResponse, null, 2));
                return;
            }

            // Execute and return result
            const result = fn(request.params || {});
            const response = {
                jsonrpc: '2.0',
                id: request.id,
                result: result.result
            };

            console.log('📤 Response:', JSON.stringify(response));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response, null, 2));

        } catch (err) {
            const errorResponse = {
                jsonrpc: '2.0',
                id: null,
                error: { code: -32700, message: 'Parse error: ' + err.message }
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(errorResponse, null, 2));
        }
    });
});

server.listen(3000, '127.0.0.1', () => {
    console.log('🚀 JSON-RPC server listening on http://localhost:3000');
    console.log('👉 Run client.js to call remote functions');
    console.log('\nAvailable methods:', Object.keys(tools).join(', '));
});

// ============================================================
//  WHAT'S HAPPENING:
//
//  Client                               Server
//  ┌──────────┐                         ┌──────────┐
//  │ client.js│── POST JSON-RPC ──────►│  server  │
//  │          │   { method: "add",      │          │
//  │          │     params: {a:5,b:3} } │  tools:  │
//  │          │                         │   add()  │
//  │          │◄── JSON-RPC response ──│   greet()│
//  │          │   { result: 8 }         │          │
//  └──────────┘                         └──────────┘
//
//  This is EXACTLY how MCP works!
//  MCP Server = JSON-RPC server exposing "tools"
//  MCP Client = JSON-RPC client calling those tools
//  The only difference: MCP adds structure (tools/call, etc.)
// ============================================================
