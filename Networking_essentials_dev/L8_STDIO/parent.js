// ============================================================
//  LESSON 8: STDIO — Programs talking to each other (no network!)
//  This is how LOCAL MCP servers communicate.
//
//  Run this with:  node parent.js
//  (It will automatically spawn child.js)
// ============================================================

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Parent process starting...');
console.log('   Spawning child process (the "MCP server")...\n');

// --- STEP 1: Spawn a child process ---
// This is EXACTLY what Claude Desktop does when starting a local MCP server
const child = spawn('node', [path.join(__dirname, 'child.js')], {
    stdio: ['pipe', 'pipe', 'inherit']  // pipe stdin/stdout, share stderr
});

// --- STEP 2: Listen for data FROM the child (via stdout) ---
child.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
        try {
            const response = JSON.parse(line);
            console.log('📨 Child responded:', JSON.stringify(response, null, 2));

            // If we got the tool list, now call a tool
            if (response.result && Array.isArray(response.result) && response.id === 1) {
                // Call get_time tool
                const toolCall = {
                    jsonrpc: '2.0',
                    id: 2,
                    method: 'tools/call',
                    params: { name: 'get_time', arguments: {} }
                };
                console.log('\n📤 Calling tool:', JSON.stringify(toolCall));
                child.stdin.write(JSON.stringify(toolCall) + '\n');
            }
            else if (response.id === 2) {
                // Got tool result, now try greet
                const greetCall = {
                    jsonrpc: '2.0',
                    id: 3,
                    method: 'tools/call',
                    params: { name: 'greet', arguments: { name: 'Developer' } }
                };
                console.log('\n📤 Calling tool:', JSON.stringify(greetCall));
                child.stdin.write(JSON.stringify(greetCall) + '\n');
            }
            else if (response.id === 3) {
                console.log('\n✅ All done! Closing child process...');
                child.stdin.end();
            }
        } catch (e) {
            console.log('📨 Child (raw):', line);
        }
    });
});

child.on('close', (code) => {
    console.log(`\n🔌 Child process exited with code ${code}`);
    console.log('\n💡 KEY INSIGHT:');
    console.log('   No TCP. No HTTP. No ports. No network card needed.');
    console.log('   Just stdin/stdout pipes between two processes.');
    console.log('   This is EXACTLY how Claude Desktop talks to local MCP servers!');
});

// --- STEP 3: Send the first request (list tools) ---
setTimeout(() => {
    const listTools = {
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/list',
        params: {}
    };
    console.log('📤 Asking child for tools:', JSON.stringify(listTools));
    child.stdin.write(JSON.stringify(listTools) + '\n');
}, 500);

// ============================================================
//  WHAT'S HAPPENING:
//
//  Parent Process (Host)          Child Process (MCP Server)
//  ┌──────────────┐               ┌──────────────┐
//  │  parent.js   │── stdin ────►│  child.js    │
//  │  (Claude     │               │  (MCP        │
//  │   Desktop)   │◄── stdout ───│   Server)    │
//  └──────────────┘               └──────────────┘
//
//  No network. No ports. Just pipes.
//  The JSON-RPC messages are identical to Lesson 7!
//  Only the TRANSPORT changed: HTTP → STDIO
// ============================================================
