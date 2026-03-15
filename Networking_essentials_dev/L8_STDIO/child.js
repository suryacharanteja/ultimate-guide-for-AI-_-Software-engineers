// ============================================================
//  LESSON 8: STDIO CHILD — A mini MCP Server
//  This file is spawned BY parent.js — don't run it directly.
// ============================================================

const readline = require('readline');

// --- Define available tools (just like a real MCP server) ---
const tools = {
    get_time: {
        description: 'Returns the current date and time',
        handler: () => ({ content: [{ type: 'text', text: new Date().toISOString() }] })
    },
    greet: {
        description: 'Greets someone by name',
        handler: (args) => ({ content: [{ type: 'text', text: `Hello, ${args.name}! 👋` }] })
    }
};

// --- Read JSON-RPC messages from stdin (line by line) ---
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
    try {
        const request = JSON.parse(line);

        // Route based on method (just like MCP spec)
        if (request.method === 'tools/list') {
            const toolList = Object.entries(tools).map(([name, t]) => ({
                name,
                description: t.description,
                inputSchema: { type: 'object' }
            }));
            respond(request.id, toolList);
        }
        else if (request.method === 'tools/call') {
            const tool = tools[request.params.name];
            if (!tool) {
                respondError(request.id, -32602, `Unknown tool: ${request.params.name}`);
                return;
            }
            const result = tool.handler(request.params.arguments || {});
            respond(request.id, result);
        }
        else {
            respondError(request.id, -32601, `Method not found: ${request.method}`);
        }
    } catch (err) {
        respondError(null, -32700, 'Parse error: ' + err.message);
    }
});

// --- Send JSON-RPC response via stdout ---
function respond(id, result) {
    const response = { jsonrpc: '2.0', id, result };
    process.stdout.write(JSON.stringify(response) + '\n');
}

function respondError(id, code, message) {
    const response = { jsonrpc: '2.0', id, error: { code, message } };
    process.stdout.write(JSON.stringify(response) + '\n');
}

// ============================================================
//  THIS IS A MINI MCP SERVER!
//
//  It reads JSON-RPC from stdin, processes it, writes to stdout.
//  No network required. No ports. No HTTP.
//
//  Real MCP servers (Python/TypeScript) do the exact same thing,
//  just with more tools and proper SDK wrappers.
//
//  stdin  → receives JSON-RPC requests
//  stdout → sends JSON-RPC responses
//  stderr → used for logging (shared with parent)
// ============================================================
