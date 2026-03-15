// ============================================================
//  LESSON 2: HTTP CLIENT — Making requests programmatically
//  Run this with:  node client.js  (while server.js is running)
// ============================================================

// --- Using Node's built-in fetch (Node 18+) ---

async function makeRequests() {
    const BASE = 'http://localhost:3000';

    // --- Request 1: Get HTML ---
    console.log('=== Request 1: GET / (HTML) ===');
    const htmlRes = await fetch(`${BASE}/`);
    console.log('Status:', htmlRes.status, htmlRes.statusText);
    console.log('Content-Type:', htmlRes.headers.get('content-type'));
    console.log('Body (first 100 chars):', (await htmlRes.text()).substring(0, 100), '...\n');

    // --- Request 2: Get JSON ---
    console.log('=== Request 2: GET /json ===');
    const jsonRes = await fetch(`${BASE}/json`);
    const data = await jsonRes.json();  // parse JSON automatically
    console.log('Parsed JSON:', data, '\n');

    // --- Request 3: Hit a 404 ---
    console.log('=== Request 3: GET /nonexistent ===');
    const notFound = await fetch(`${BASE}/doesnt-exist`);
    console.log('Status:', notFound.status, '— This is a 404!\n');

    // --- Request 4: See your own headers ---
    console.log('=== Request 4: GET /headers ===');
    const headersRes = await fetch(`${BASE}/headers`);
    const headersData = await headersRes.json();
    console.log('Server saw these headers from us:', headersData);
}

makeRequests().catch(err => {
    console.error('❌ Error:', err.message);
    console.error('   Is the server running? Start it with: node server.js');
});

// ============================================================
//  KEY INSIGHT:
//  fetch() is doing the SAME thing as the TCP client in L1,
//  but it automatically formats the request as HTTP and
//  parses the response.
//
//  Under the hood:
//  1. Opens a TCP connection to localhost:3000
//  2. Sends: "GET /json HTTP/1.1\r\nHost: localhost:3000\r\n\r\n"
//  3. Reads the response bytes
//  4. Parses headers and body for you
//
//  The browser does the EXACT same thing when you type a URL!
// ============================================================
