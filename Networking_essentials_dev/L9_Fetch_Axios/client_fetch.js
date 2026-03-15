// ============================================================
//  LESSON 9: fetch() — The modern way to make HTTP requests
//  Run this with:  node client_fetch.js  (while server.js runs)
// ============================================================

async function main() {
    const BASE = 'http://localhost:3000';

    // --- 1. Simple GET request ---
    console.log('=== 1. GET /api/models (list all) ===');
    const res1 = await fetch(`${BASE}/api/models`);
    const data1 = await res1.json();
    console.log('Status:', res1.status);
    console.log('Data:', JSON.stringify(data1, null, 2), '\n');

    // --- 2. GET with specific ID ---
    console.log('=== 2. GET /api/models/1 (get one) ===');
    const res2 = await fetch(`${BASE}/api/models/1`);
    console.log('Model:', await res2.json(), '\n');

    // --- 3. POST — create a new resource ---
    console.log('=== 3. POST /api/models (create new) ===');
    const res3 = await fetch(`${BASE}/api/models`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Gemini', type: 'model', status: 'active' })
    });
    console.log('Created:', await res3.json(), '\n');

    // --- 4. Handle errors gracefully ---
    console.log('=== 4. GET /api/error (handle 500) ===');
    const res4 = await fetch(`${BASE}/api/error`);
    if (!res4.ok) {
        console.log('⚠️ Server error! Status:', res4.status);
        console.log('Body:', await res4.json(), '\n');
    }

    // --- 5. Handle 404 ---
    console.log('=== 5. GET /api/nonexistent (handle 404) ===');
    const res5 = await fetch(`${BASE}/api/nonexistent`);
    console.log('Status:', res5.status, '— Not Found');
    console.log('Body:', await res5.json(), '\n');

    // --- 6. Authentication header ---
    console.log('=== 6. GET /api/protected (with auth) ===');
    const res6 = await fetch(`${BASE}/api/protected`, {
        headers: { 'Authorization': 'Bearer sk-test-key-123' }
    });
    console.log('Authenticated:', await res6.json(), '\n');

    // --- 7. Without auth (should fail) ---
    console.log('=== 7. GET /api/protected (without auth) ===');
    const res7 = await fetch(`${BASE}/api/protected`);
    console.log('Rejected:', await res7.json(), '\n');

    // --- 8. Timeout handling ---
    console.log('=== 8. GET /api/slow (with timeout) ===');
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1000);  // 1s timeout
    try {
        await fetch(`${BASE}/api/slow`, { signal: controller.signal });
    } catch (err) {
        console.log('⏰ Timed out after 1s (server takes 2s)');
        console.log('   Error:', err.name, '\n');
    }
}

main().catch(err => {
    console.error('❌', err.message);
    console.error('   Is the server running? node server.js');
});

// ============================================================
//  KEY INSIGHT:
//  fetch() is wrapping everything from L1 + L2:
//    1. Opens TCP connection (L1)
//    2. Formats HTTP request (L2)
//    3. Sends it, reads response
//    4. Parses JSON for you
//
//  This is what you'll use daily to call:
//    - OpenAI API
//    - Claude API
//    - Any REST API
//    - MCP remote servers
// ============================================================
