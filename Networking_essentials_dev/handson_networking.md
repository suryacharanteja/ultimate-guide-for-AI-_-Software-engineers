# 🛠️ Hands-On Networking: From TCP to MCP
## A Progressive, Code-First Tutorial for AI Engineers

Every lesson has **runnable code** (server + client) and a **REAL_WORLD.md** explaining where this concept appears in AI engineering and software development. Each lesson builds on the previous — by the end, it all clicks together as one big picture.

---

## 📚 Lesson Roadmap

### 🔌 Phase 1: The Pipe & Protocols (How data travels)

| # | Folder | Topic | What You Build | AI Engineering Use |
|---|--------|-------|----------------|-------------------|
| 1 | `L1_TCP_sockets/` | **TCP** — the raw pipe | Echo server + client | MCP stdio, DB connections, every network call |
| 2 | `L2_HTTP/` | **HTTP** — text format over that pipe | Web server + API routes | REST APIs, OpenAI/Claude API calls |
| 3 | `L3_HTTPS_SSL/` | **HTTPS/SSL** — HTTP + encryption | Secure server with certs | Production APIs, secure model endpoints |
| 4 | `L4_WebSocket/` | **WebSocket** — HTTP that stays open | Real-time browser chat | Streaming AI tokens, live agent updates |
| 5 | `L5_SMTP_FTP/` | **SMTP / FTP** — specialized protocols | Email + file transfer sim | AI email agents, automated file pipelines |

### 📦 Phase 2: Data & Patterns (What goes in the pipe)

| # | Folder | Topic | What You Build | AI Engineering Use |
|---|--------|-------|----------------|-------------------|
| 6 | `L6_Data_Formats/` | **JSON / XML / YAML** — data packaging | Format comparison server | MCP payloads, config files, API responses |
| 7 | `L7_JSON_RPC/` | **RPC + JSON-RPC** — remote function calls | Tool-calling server | MCP's core protocol (tools/call) |
| 8 | `L8_STDIO/` | **STDIO** — process-to-process pipes | Mini MCP server | Local MCP servers (Claude Desktop) |

### 🚀 Phase 3: Practical Tools & Capstone (Real-world usage)

| # | Folder | Topic | What You Build | AI Engineering Use |
|---|--------|-------|----------------|-------------------|
| 9 | `L9_Fetch_Axios/` | **fetch() / axios** — JS HTTP tools | API caller + error handling | Calling OpenAI, Stripe, any external API |
| 10 | `L10_REST_APIs/` | **REST APIs** — design pattern on HTTP | Full CRUD API server | Building backends for AI apps |
| 11 | `L11_MCP_Capstone/` | **MCP** — everything together | Working MCP server | The AI engineering capstone 🎓 |

---

## 🧱 Phase 1: The Pipe & Protocols

### Lesson 1: TCP Socket — The Raw Foundation ✅
**Folder:** `L1_TCP_sockets/`

```bash
# Terminal 1                    # Terminal 2
node server.js                  node clients.js
```

**What to try:** Type messages between terminals. Type `bye` to disconnect.
**Key insight:** No HTTP, no URLs — just raw bytes through a pipe.
**AI use:** Every MCP call, every DB query, every API request sits on top of TCP.

📄 See [REAL_WORLD.md](L1_TCP_sockets/REAL_WORLD.md) for AI engineering scenarios.

---

### Lesson 2: HTTP — Structured Rules on Top of TCP
**Folder:** `L2_HTTP/`

```bash
node server.js                  # Then open http://localhost:3000
node client.js                  # Or use the programmatic client
```

**What to try:** Visit `/json`, `/headers` in browser. Run client.js for programmatic calls.
**Key insight:** HTTP = rules about byte formatting over TCP. `GET /json HTTP/1.1\r\n...`
**AI use:** Every API call to OpenAI, Claude, Hugging Face is HTTP.

📄 See [REAL_WORLD.md](L2_HTTP/REAL_WORLD.md) for AI engineering scenarios.

---

### Lesson 3: HTTPS + SSL/TLS — Securing HTTP
**Folder:** `L3_HTTPS_SSL/`

```bash
# Generate certs first:
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"
node server.js                  # Then open https://localhost:3443
```

**Key insight:** Same HTTP, just encrypted. HTTPS = HTTP + TLS tunnel.
**AI use:** Every production AI API endpoint MUST use HTTPS.

📄 See [REAL_WORLD.md](L3_HTTPS_SSL/REAL_WORLD.md) for AI engineering scenarios.

---

### Lesson 4: WebSocket — HTTP That Stays Open
**Folder:** `L4_WebSocket/`

```bash
npm install ws                  # One-time setup
node server.js                  # Then open http://localhost:3000
```

**What to try:** Type messages in the browser, see them echoed with timestamps.
**Key insight:** HTTP closes after each response. WebSocket stays open — both sides talk freely.
**AI use:** ChatGPT-style token streaming, real-time agent dashboards.

📄 See [REAL_WORLD.md](L4_WebSocket/REAL_WORLD.md) for AI engineering scenarios.

---

### Lesson 5: SMTP / FTP — Specialized Protocols
**Folder:** `L5_SMTP_FTP/`

```bash
node server.js                  # Terminal 1 (starts both servers)
node client.js                  # Terminal 2 (interactive)
```

**What to try:** Choose SMTP or FTP, then type real protocol commands.
**Key insight:** SMTP, FTP, HTTP — all just text command agreements over TCP.
**AI use:** AI email agents, automated file transfer pipelines.

📄 See [REAL_WORLD.md](L5_SMTP_FTP/REAL_WORLD.md) for AI engineering scenarios.

---

## 📦 Phase 2: Data & Patterns

### Lesson 6: JSON / XML / YAML — Data Packaging
**Folder:** `L6_Data_Formats/`

```bash
node server.js                  # Then open http://localhost:3000
```

**What to try:** Click each format link to see the same data packaged differently.
**Key insight:** Data is identical. Only the packaging changes. Content-Type declares the format.
**AI use:** MCP uses JSON exclusively. YAML for configs. Protobuf for speed.

📄 See [REAL_WORLD.md](L6_Data_Formats/REAL_WORLD.md) for AI engineering scenarios.

---

### Lesson 7: JSON-RPC — Remote Function Calls
**Folder:** `L7_JSON_RPC/`

```bash
node server.js                  # Terminal 1
node client.js                  # Terminal 2
```

**What to try:** Watch the client call `add()`, `greet()`, `get_weather()` remotely.
**Key insight:** This IS what MCP does. Same JSON-RPC, just standardized method names.
**AI use:** MCP's entire communication layer is JSON-RPC 2.0.

📄 See [REAL_WORLD.md](L7_JSON_RPC/REAL_WORLD.md) for AI engineering scenarios.

---

### Lesson 8: STDIO — Process-to-Process Pipes
**Folder:** `L8_STDIO/`

```bash
node parent.js                  # Auto-spawns child.js
```

**What to try:** Watch parent list tools, call them, get results — all via stdin/stdout.
**Key insight:** No network needed. stdin/stdout pipes replace TCP entirely.
**AI use:** This is EXACTLY how Claude Desktop runs local MCP servers.

📄 See [REAL_WORLD.md](L8_STDIO/REAL_WORLD.md) for AI engineering scenarios.

---

## 🚀 Phase 3: Practical Tools & Capstone

### Lesson 9: fetch() / axios — JS HTTP Tools
**Folder:** `L9_Fetch_Axios/`

```bash
node server.js                  # Terminal 1 (mock API)
node client_fetch.js            # Terminal 2 (fetch examples)
node client_axios.js            # Terminal 2 (axios examples)
```

**What to try:** Compare fetch() vs axios patterns, error handling, headers.
**Key insight:** fetch/axios wrap the HTTP work from L2 into convenient functions.
**AI use:** Every OpenAI/Claude/Stripe API call you'll ever make uses these.

📄 See [REAL_WORLD.md](L9_Fetch_Axios/REAL_WORLD.md) for AI engineering scenarios.

---

### Lesson 10: REST APIs — Design Pattern on HTTP
**Folder:** `L10_REST_APIs/`

```bash
node server.js                  # Terminal 1 (REST API)
node client.js                  # Terminal 2 (CRUD operations)
```

**What to try:** Create, Read, Update, Delete items via the API.
**Key insight:** REST is a design PATTERN, not a protocol. It's conventions on top of HTTP.
**AI use:** Building backends for AI apps, serving model predictions, managing data.

📄 See [REAL_WORLD.md](L10_REST_APIs/REAL_WORLD.md) for AI engineering scenarios.

---

### Lesson 11: MCP Capstone — Everything Together 🎓
**Folder:** `L11_MCP_Capstone/`

```bash
node mcp_server.js              # The MCP server (stdio)
node mcp_host.js                # The AI host (spawns + calls the server)
```

**What to try:** Watch the host discover tools, call them, get results — real MCP!
**Key insight:** MCP = JSON-RPC (L7) + STDIO (L8) + JSON (L6), served over TCP (L1) or pipes.
**AI use:** This is the protocol powering next-gen AI tool integration.

📄 See [REAL_WORLD.md](L11_MCP_Capstone/REAL_WORLD.md) for the full picture.

---

## 🎯 The Big Picture

```
 ┌──────────────────────────────────────────────────────────────┐
 │  PHASE 3: PRACTICAL TOOLS                                    │
 │  L11: MCP Capstone (AI engineering goal)                     │
 │  L10: REST APIs (design pattern)                             │
 │  L9:  fetch/axios (developer tools)                          │
 ├──────────────────────────────────────────────────────────────┤
 │  PHASE 2: DATA & PATTERNS                                    │
 │  L8:  STDIO (process pipes — local MCP)                      │
 │  L7:  JSON-RPC (remote function calls — MCP's protocol)      │
 │  L6:  JSON/XML/YAML (data packaging)                         │
 ├──────────────────────────────────────────────────────────────┤
 │  PHASE 1: THE PIPE & PROTOCOLS                               │
 │  L5:  SMTP/FTP (specialized protocols)                       │
 │  L4:  WebSocket (persistent connection)                      │
 │  L3:  HTTPS/TLS (encryption)                                 │
 │  L2:  HTTP (structured request/response)                     │
 │  L1:  TCP Socket (raw byte pipe) ◄── EVERYTHING SITS ON THIS │
 └──────────────────────────────────────────────────────────────┘
```

### How MCP Uses All of This

```
 Claude Desktop (Host)
       │
       ├── Local MCP Server:  JSON-RPC (L7) over STDIO (L8)
       │                      using JSON (L6) data format
       │
       └── Remote MCP Server: JSON-RPC (L7) over HTTP (L2) over TCP (L1)
                              with TLS (L3) for security
                              called via fetch() (L9)
                              following REST conventions (L10)
```

**You now understand every layer of the stack that makes MCP possible.** 🚀
