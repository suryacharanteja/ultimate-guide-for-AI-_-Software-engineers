// ============================================================
//  LESSON 10: REST API — A Full CRUD Server
//  Run this with:  node server.js
//  Then run:  node client.js
// ============================================================

const http = require('http');

// --- In-memory "database" ---
let agents = [
    { id: 1, name: 'WeatherBot', tools: ['get_weather', 'get_forecast'], status: 'active' },
    { id: 2, name: 'CodeHelper', tools: ['run_code', 'lint_code'], status: 'active' },
    { id: 3, name: 'EmailAgent', tools: ['send_email', 'read_inbox'], status: 'paused' },
];
let nextId = 4;

// --- Helper: Parse request body ---
function getBody(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => resolve(body ? JSON.parse(body) : {}));
    });
}

// --- Helper: Send JSON response ---
function json(res, status, data) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data, null, 2));
}

const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    console.log(`📨 ${method} ${url}`);

    // --- REST Routes ---

    // GET /api/agents — List all agents
    if (url === '/api/agents' && method === 'GET') {
        json(res, 200, { count: agents.length, agents });
    }

    // GET /api/agents/:id — Get one agent
    else if (url.match(/^\/api\/agents\/\d+$/) && method === 'GET') {
        const id = parseInt(url.split('/').pop());
        const agent = agents.find(a => a.id === id);
        agent ? json(res, 200, agent) : json(res, 404, { error: 'Agent not found' });
    }

    // POST /api/agents — Create new agent
    else if (url === '/api/agents' && method === 'POST') {
        const body = await getBody(req);
        const agent = { id: nextId++, ...body, status: body.status || 'active' };
        agents.push(agent);
        json(res, 201, { message: 'Agent created', agent });
    }

    // PUT /api/agents/:id — Update an agent
    else if (url.match(/^\/api\/agents\/\d+$/) && method === 'PUT') {
        const id = parseInt(url.split('/').pop());
        const idx = agents.findIndex(a => a.id === id);
        if (idx === -1) { json(res, 404, { error: 'Agent not found' }); return; }
        const body = await getBody(req);
        agents[idx] = { ...agents[idx], ...body };
        json(res, 200, { message: 'Agent updated', agent: agents[idx] });
    }

    // DELETE /api/agents/:id — Delete an agent
    else if (url.match(/^\/api\/agents\/\d+$/) && method === 'DELETE') {
        const id = parseInt(url.split('/').pop());
        const idx = agents.findIndex(a => a.id === id);
        if (idx === -1) { json(res, 404, { error: 'Agent not found' }); return; }
        const deleted = agents.splice(idx, 1)[0];
        json(res, 200, { message: 'Agent deleted', agent: deleted });
    }

    // 404
    else {
        json(res, 404, { error: 'Not found. Try /api/agents' });
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('🚀 REST API server on http://localhost:3000');
    console.log('\nREST Routes (CRUD):');
    console.log('  GET    /api/agents       — List all');
    console.log('  GET    /api/agents/:id   — Get one');
    console.log('  POST   /api/agents       — Create');
    console.log('  PUT    /api/agents/:id   — Update');
    console.log('  DELETE /api/agents/:id   — Delete');
});

// ============================================================
//  WHAT'S HAPPENING:
//
//  REST = a DESIGN PATTERN, not a protocol.
//  It says: use HTTP methods to map to CRUD operations:
//
//  Create → POST
//  Read   → GET
//  Update → PUT
//  Delete → DELETE
//
//  The URL represents the RESOURCE: /api/agents
//  The method represents the ACTION: GET, POST, PUT, DELETE
//
//  As an AI engineer, you'll build REST APIs to:
//  - Serve model predictions
//  - Manage AI agents
//  - Handle user data
//  - Expose tools for MCP
// ============================================================
