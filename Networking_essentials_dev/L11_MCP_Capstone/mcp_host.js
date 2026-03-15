// ============================================================
//  LESSON 11: MCP HOST — Simulates Claude Desktop
//  Run this with:  node mcp_host.js
//  (It automatically spawns mcp_server.js)
// ============================================================

const { spawn } = require('child_process');
const path = require('path');
const readline = require('readline');

console.log('🤖 MCP Host starting (simulating Claude Desktop)...\n');

// --- STEP 1: Spawn the MCP server (like Claude Desktop does) ---
const server = spawn('node', [path.join(__dirname, 'mcp_server.js')], {
    stdio: ['pipe', 'pipe', 'inherit']
});

let msgId = 0;
const pending = new Map();

// --- STEP 2: Handle responses from the server ---
const rl = readline.createInterface({ input: server.stdout });
rl.on('line', (line) => {
    try {
        const response = JSON.parse(line);
        const resolve = pending.get(response.id);
        if (resolve) {
            pending.delete(response.id);
            resolve(response);
        }
    } catch (e) {
        console.log('Raw:', line);
    }
});

// --- Helper: Send a JSON-RPC request and wait for response ---
function sendRequest(method, params = {}) {
    return new Promise((resolve) => {
        const id = ++msgId;
        const request = { jsonrpc: '2.0', id, method, params };
        pending.set(id, resolve);
        server.stdin.write(JSON.stringify(request) + '\n');
    });
}

// --- Helper: Send notification (no response expected) ---
function sendNotification(method, params = {}) {
    const request = { jsonrpc: '2.0', method, params };
    server.stdin.write(JSON.stringify(request) + '\n');
}

// --- STEP 3: Run the MCP lifecycle ---
async function main() {
    // Phase 1: Initialize
    console.log('─── Phase 1: Initialize ───');
    const initResult = await sendRequest('initialize', {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'lesson-11-host', version: '1.0.0' }
    });
    console.log('✅ Server info:', initResult.result.serverInfo);
    console.log('   Protocol:', initResult.result.protocolVersion);

    // Send initialized notification
    sendNotification('notifications/initialized');
    console.log('📤 Sent: initialized notification\n');

    // Phase 2: Discover tools
    console.log('─── Phase 2: Discover Tools ───');
    const toolsResult = await sendRequest('tools/list');
    console.log(`📋 Server has ${toolsResult.result.tools.length} tools:`);
    toolsResult.result.tools.forEach(t => {
        console.log(`   🔧 ${t.name} — ${t.description}`);
    });
    console.log();

    // Phase 3: Call tools (like an AI deciding to use tools)
    console.log('─── Phase 3: Use Tools ───\n');

    // Call 1: Weather
    console.log('🤖 AI thinks: "User asked about weather in Dubai, I should use get_weather"');
    const weather = await sendRequest('tools/call', {
        name: 'get_weather',
        arguments: { city: 'Dubai' }
    });
    console.log('📨 Result:', weather.result.content[0].text);
    console.log();

    // Call 2: Database search
    console.log('🤖 AI thinks: "User wants revenue data, I should search the database"');
    const search = await sendRequest('tools/call', {
        name: 'search_database',
        arguments: { query: 'Q4 revenue 2024', limit: 2 }
    });
    console.log('📨 Results:', search.result.content[0].text);
    console.log();

    // Call 3: Calculation
    console.log('🤖 AI thinks: "User wants to know 15% of 2500, I should calculate"');
    const calc = await sendRequest('tools/call', {
        name: 'calculate',
        arguments: { expression: '2500 * 0.15' }
    });
    console.log('📨 Result:', calc.result.content[0].text);
    console.log();

    // Call 4: Unknown tool (error handling)
    console.log('🤖 AI thinks: "Let me try a tool that doesn\'t exist"');
    const unknown = await sendRequest('tools/call', {
        name: 'fly_to_moon',
        arguments: {}
    });
    console.log('❌ Error:', unknown.error || unknown.result.error);
    console.log();

    // Done
    console.log('─── Complete ───');
    console.log('🎓 You just simulated the FULL MCP lifecycle!');
    console.log('   1. Initialize handshake');
    console.log('   2. Discover available tools');
    console.log('   3. Call tools based on AI reasoning');
    console.log('   4. Handle errors gracefully');
    console.log('\n🏗️ Layers used in this demo:');
    console.log('   L1: TCP concepts (pipe communication)');
    console.log('   L6: JSON (data format)');
    console.log('   L7: JSON-RPC 2.0 (messaging protocol)');
    console.log('   L8: STDIO (transport)');

    server.stdin.end();
}

server.on('close', () => {
    console.log('\n🔌 MCP server process exited');
});

main().catch(console.error);

// ============================================================
//  THIS IS CLAUDE DESKTOP (simplified):
//
//  1. Reads claude_desktop_config.json
//  2. Spawns each MCP server as a child process
//  3. Sends "initialize" handshake
//  4. Discovers tools via "tools/list"
//  5. When the AI model decides to use a tool:
//     - Sends "tools/call" via stdin
//     - Reads result from stdout
//     - Feeds result back to the AI model
//
//  You just built both sides of this system!
// ============================================================
