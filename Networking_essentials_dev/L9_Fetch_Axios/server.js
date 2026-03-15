// ============================================================
//  LESSON 9: A mock API server for testing fetch() and axios
//  Run this with:  node server.js
// ============================================================

const http = require('http');

// In-memory data store (simulates a database)
const items = [
    { id: 1, name: 'GPT-4', type: 'model', status: 'active' },
    { id: 2, name: 'Claude', type: 'model', status: 'active' },
    { id: 3, name: 'Whisper', type: 'model', status: 'deprecated' },
];

const server = http.createServer((req, res) => {
    // CORS headers (so browsers can call this)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    console.log(`📨 ${req.method} ${req.url}`);

    // --- Route: GET /api/models ---
    if (req.url === '/api/models' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ models: items }, null, 2));
    }
    // --- Route: GET /api/models/:id ---
    else if (req.url.match(/^\/api\/models\/\d+$/) && req.method === 'GET') {
        const id = parseInt(req.url.split('/').pop());
        const item = items.find(i => i.id === id);
        if (item) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(item, null, 2));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Model not found' }));
        }
    }
    // --- Route: POST /api/models ---
    else if (req.url === '/api/models' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const newItem = JSON.parse(body);
                newItem.id = items.length + 1;
                items.push(newItem);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ created: newItem }, null, 2));
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }
    // --- Route: Simulate slow response ---
    else if (req.url === '/api/slow' && req.method === 'GET') {
        setTimeout(() => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'This took 2 seconds!' }));
        }, 2000);
    }
    // --- Route: Simulate error ---
    else if (req.url === '/api/error' && req.method === 'GET') {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
    // --- Route: Auth check ---
    else if (req.url === '/api/protected' && req.method === 'GET') {
        const auth = req.headers['authorization'];
        if (auth === 'Bearer sk-test-key-123') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Authenticated!', secret: 'AI models are awesome' }));
        } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unauthorized. Send Authorization: Bearer sk-test-key-123' }));
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('🚀 Mock API server on http://localhost:3000');
    console.log('\nAvailable routes:');
    console.log('  GET    /api/models       — list all models');
    console.log('  GET    /api/models/:id   — get one model');
    console.log('  POST   /api/models       — create a model');
    console.log('  GET    /api/slow         — 2-second delay');
    console.log('  GET    /api/error        — returns 500');
    console.log('  GET    /api/protected    — needs auth header');
});
