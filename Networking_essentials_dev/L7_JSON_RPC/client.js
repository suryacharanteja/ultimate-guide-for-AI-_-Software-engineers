// ============================================================
//  LESSON 7: JSON-RPC CLIENT — Calling remote tools
//  Run this with:  node client.js  (while server.js is running)
// ============================================================

async function callRPC(method, params = {}) {
    const request = {
        jsonrpc: '2.0',
        id: Math.floor(Math.random() * 10000),
        method: method,
        params: params
    };

    console.log(`\n📤 Calling: ${method}(${JSON.stringify(params)})`);

    const res = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    });

    const response = await res.json();

    if (response.error) {
        console.log(`❌ Error: ${response.error.message}`);
    } else {
        console.log(`✅ Result:`, response.result);
    }

    return response;
}

async function main() {
    console.log('=== JSON-RPC Client Demo ===\n');

    // Call 1: Add two numbers
    await callRPC('add', { a: 5, b: 3 });

    // Call 2: Greet someone
    await callRPC('greet', { name: 'Developer' });

    // Call 3: Get weather (like an MCP tool!)
    await callRPC('get_weather', { city: 'Dubai' });

    // Call 4: List available tools
    await callRPC('list_tools');

    // Call 5: Try a non-existent method
    await callRPC('fly_to_moon', { destination: 'Mars' });

    console.log('\n=== Done! ===');
    console.log('\n💡 KEY INSIGHT:');
    console.log('   You just did what Claude Desktop does when calling MCP tools!');
    console.log('   MCP is literally JSON-RPC with a specific set of methods.');
}

main().catch(err => {
    console.error('❌', err.message);
    console.error('   Is the server running? Start it with: node server.js');
});

// ============================================================
//  COMPARE WITH MCP:
//
//  What we just did:              What MCP does:
//  ─────────────────              ──────────────
//  method: "add"                  method: "tools/call"
//  params: {a:5, b:3}            params: {name:"get_weather",
//                                         arguments:{city:"Dubai"}}
//
//  Same protocol. Same structure. Same JSON-RPC 2.0.
//  MCP just standardizes the METHOD NAMES and PARAMS format.
// ============================================================
