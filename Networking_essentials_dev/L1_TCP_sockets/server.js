// ============================================================
//  LESSON 1: TCP SOCKET — The raw foundation of all networking
//  Run this with:  node server.js
// ============================================================

const net = require('net');   // Node's built-in TCP module — no install needed

// --- STEP 1: Create a TCP server ---
const server = net.createServer((socket) => {
    // This function runs every time a client connects
    // 'socket' is the open pipe to that specific client

    console.log('✅ Client connected!', socket.remoteAddress, socket.remotePort);

    // --- STEP 2: Send a welcome message to the client ---
    socket.write('Hello from TCP server! Type something and press Enter.\n');

    // --- STEP 3: Listen for data coming FROM the client ---
    socket.on('data', (data) => {
        const message = data.toString().trim();
        console.log('📨 Client says:', message);

        // Echo it back with a server stamp
        socket.write(`Server received: "${message}"\n`);

        // If client says bye, close the connection
        if (message === 'bye') {
            socket.write('Goodbye!\n');
            socket.end();  // gracefully close
        }
    });

    // --- STEP 4: Handle disconnect ---
    socket.on('end', () => {
        console.log('🔌 Client disconnected');
    });

    // --- STEP 5: Handle errors ---
    socket.on('error', (err) => {
        console.error('❌ Socket error:', err.message);
    });
});

// --- STEP 6: Start listening on port 3000 ---
server.listen(3000, '127.0.0.1', () => {
    console.log('🚀 TCP server listening on port 3000');
    console.log('👉 Now run client.js in another terminal');
});

// ============================================================
//  WHAT'S HAPPENING:
//
//  Your machine         Client machine
//  ┌──────────┐         ┌──────────┐
//  │  server  │◄───────►│  client  │
//  │  :3000   │  TCP    │          │
//  └──────────┘  pipe   └──────────┘
//
//  Both sides can send data at any time over this open "pipe"
//  This is the SAME mechanism HTTP uses under the hood!
// ============================================================