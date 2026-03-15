// ============================================================
//  LESSON 1: TCP CLIENT
//  Run this with:  node client.js   (in a SECOND terminal)
// ============================================================

const net = require('net');

// --- STEP 1: Connect to the server ---
const client = net.createConnection({ host: '127.0.0.1', port: 3000 }, () => {
    console.log('✅ Connected to server!');
});

// --- STEP 2: Receive data FROM the server ---
client.on('data', (data) => {
    console.log('📨 Server says:', data.toString().trim());
});

// --- STEP 3: Read keyboard input and send to server ---
// This simulates what a browser does when you type a URL
process.stdin.setEncoding('utf8');
process.stdin.on('data', (input) => {
    const message = input.trim();
    console.log('📤 Sending:', message);
    client.write(message + '\n');  // send over the TCP pipe
});

// --- STEP 4: Handle server disconnect ---
client.on('end', () => {
    console.log('🔌 Server closed the connection');
    process.exit(0);
});

client.on('error', (err) => {
    console.error('❌ Connection error:', err.message);
});

// ============================================================
//  TRY THIS:
//  1. Run server.js in terminal 1
//  2. Run client.js in terminal 2
//  3. Type any message in terminal 2 → see it appear in terminal 1
//  4. Type "bye" to close the connection
//
//  KEY INSIGHT:
//  Notice — there's no HTTP here. No URL. No request/response.
//  Just raw bytes flowing through a pipe.
//  HTTP is just an AGREEMENT about the FORMAT of those bytes.
// ============================================================