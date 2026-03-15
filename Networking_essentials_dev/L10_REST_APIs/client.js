// ============================================================
//  LESSON 10: REST Client — Full CRUD operations
//  Run this with:  node client.js  (while server.js runs)
// ============================================================

const BASE = 'http://localhost:3000/api/agents';

async function main() {
    // --- CREATE (POST) ---
    console.log('=== 1. CREATE — POST /api/agents ===');
    const created = await fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'SearchBot', tools: ['web_search', 'summarize'] })
    }).then(r => r.json());
    console.log(created, '\n');

    // --- READ ALL (GET) ---
    console.log('=== 2. READ ALL — GET /api/agents ===');
    const all = await fetch(BASE).then(r => r.json());
    console.log(`Found ${all.count} agents:`, all.agents.map(a => a.name), '\n');

    // --- READ ONE (GET) ---
    console.log('=== 3. READ ONE — GET /api/agents/1 ===');
    const one = await fetch(`${BASE}/1`).then(r => r.json());
    console.log('Agent 1:', one, '\n');

    // --- UPDATE (PUT) ---
    console.log('=== 4. UPDATE — PUT /api/agents/1 ===');
    const updated = await fetch(`${BASE}/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'paused', tools: ['get_weather'] })
    }).then(r => r.json());
    console.log(updated, '\n');

    // --- DELETE ---
    console.log('=== 5. DELETE — DELETE /api/agents/3 ===');
    const deleted = await fetch(`${BASE}/3`, { method: 'DELETE' }).then(r => r.json());
    console.log(deleted, '\n');

    // --- VERIFY ---
    console.log('=== 6. FINAL STATE ===');
    const final = await fetch(BASE).then(r => r.json());
    console.log(`${final.count} agents remaining:`, final.agents.map(a => `${a.name} (${a.status})`));
}

main().catch(err => {
    console.error('❌', err.message, '\n   Is server.js running?');
});

// ============================================================
//  CRUD MAPPING:
//  ─────────────
//  Create  →  POST   /api/agents         + body
//  Read    →  GET    /api/agents          (all)
//  Read    →  GET    /api/agents/:id      (one)
//  Update  →  PUT    /api/agents/:id      + body
//  Delete  →  DELETE /api/agents/:id
//
//  This is the design pattern behind every modern API.
// ============================================================
