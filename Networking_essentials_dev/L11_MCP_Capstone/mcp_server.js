// ============================================================
//  LESSON 11: MCP CAPSTONE — A Working MCP Server (STDIO)
//  This ties together everything from L1-L10
//
//  This is the SERVER that an AI host spawns and communicates with.
//  Run it via mcp_host.js (not directly)
// ============================================================

const readline = require('readline');

// ============================================================
//  TOOLS — The functions this MCP server exposes to AI models
// ============================================================
const tools = {
    get_weather: {
        description: 'Get the current weather for a city',
        inputSchema: {
            type: 'object',
            properties: {
                city: { type: 'string', description: 'City name' }
            },
            required: ['city']
        },
        handler: (args) => {
            const temps = { 'Dubai': 35, 'London': 12, 'Tokyo': 22, 'New York': 18 };
            const temp = temps[args.city] || Math.floor(Math.random() * 30 + 5);
            const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Windy'];
            return {
                content: [{
                    type: 'text',
                    text: `Weather in ${args.city}: ${temp}°C, ${conditions[Math.floor(Math.random() * conditions.length)]}`
                }]
            };
        }
    },

    search_database: {
        description: 'Search for records in the database',
        inputSchema: {
            type: 'object',
            properties: {
                query: { type: 'string', description: 'Search query' },
                limit: { type: 'number', description: 'Max results (default: 5)' }
            },
            required: ['query']
        },
        handler: (args) => {
            // Simulated database search
            const results = [
                { id: 1, title: `Result for "${args.query}"`, score: 0.95 },
                { id: 2, title: `Related to "${args.query}"`, score: 0.87 },
                { id: 3, title: `Also matches "${args.query}"`, score: 0.72 },
            ].slice(0, args.limit || 5);
            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(results, null, 2)
                }]
            };
        }
    },

    calculate: {
        description: 'Perform a math calculation',
        inputSchema: {
            type: 'object',
            properties: {
                expression: { type: 'string', description: 'Math expression (e.g., "2 + 2")' }
            },
            required: ['expression']
        },
        handler: (args) => {
            try {
                // Safe math eval (in production, use a proper math parser)
                const result = Function('"use strict"; return (' + args.expression + ')')();
                return { content: [{ type: 'text', text: `${args.expression} = ${result}` }] };
            } catch (e) {
                return { content: [{ type: 'text', text: `Error: ${e.message}` }], isError: true };
            }
        }
    }
};

// ============================================================
//  JSON-RPC 2.0 MESSAGE HANDLER (L7)
// ============================================================
function handleMessage(request) {
    // Initialize
    if (request.method === 'initialize') {
        return {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {} },
            serverInfo: { name: 'lesson-11-mcp-server', version: '1.0.0' }
        };
    }

    // List tools
    if (request.method === 'tools/list') {
        return {
            tools: Object.entries(tools).map(([name, t]) => ({
                name,
                description: t.description,
                inputSchema: t.inputSchema
            }))
        };
    }

    // Call a tool
    if (request.method === 'tools/call') {
        const tool = tools[request.params?.name];
        if (!tool) {
            return { error: { code: -32602, message: `Unknown tool: ${request.params?.name}` } };
        }
        return tool.handler(request.params?.arguments || {});
    }

    // Notifications (no response needed)
    if (request.method === 'notifications/initialized') {
        return null;  // No response for notifications
    }

    return { error: { code: -32601, message: `Method not found: ${request.method}` } };
}

// ============================================================
//  STDIO TRANSPORT (L8) — Read stdin, Write stdout
// ============================================================
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
    try {
        const request = JSON.parse(line);
        const result = handleMessage(request);

        // Don't respond to notifications
        if (result === null) return;

        // Build JSON-RPC response
        const response = result.error
            ? { jsonrpc: '2.0', id: request.id, error: result.error }
            : { jsonrpc: '2.0', id: request.id, result };

        process.stdout.write(JSON.stringify(response) + '\n');
    } catch (err) {
        const errorResponse = {
            jsonrpc: '2.0', id: null,
            error: { code: -32700, message: 'Parse error: ' + err.message }
        };
        process.stdout.write(JSON.stringify(errorResponse) + '\n');
    }
});

// Log to stderr (so it doesn't interfere with stdout JSON-RPC)
process.stderr.write('🚀 MCP Server started (waiting for messages on stdin)\n');

// ============================================================
//  THE FULL STACK IN THIS ONE FILE:
//
//  L1  TCP       → stdio pipes (same concept, no network)
//  L6  JSON      → all messages are JSON
//  L7  JSON-RPC  → request/response protocol
//  L8  STDIO     → stdin/stdout transport
//  L10 REST-like → tools/list, tools/call (resource-oriented)
//
//  This is a REAL MCP server. If you add it to
//  claude_desktop_config.json, Claude can use these tools!
// ============================================================
