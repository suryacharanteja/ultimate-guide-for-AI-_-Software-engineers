# 🌍 Lesson 7: Where JSON-RPC Shows Up in the Real World

---

## What You Just Built

A server that exposes **functions** (`add`, `greet`, `get_weather`) and a client that calls them remotely using JSON messages. This is **exactly** what MCP does.

---

## 🤖 Real Places JSON-RPC Shows Up in AI Engineering

### 1. MCP — The Entire Protocol IS JSON-RPC

```
Claude Desktop                        MCP Server
     │                                    │
     │  { "jsonrpc": "2.0",              │
     │    "method": "tools/call",         │
     │    "params": {                     │
     │      "name": "search_db",    ────► │
     │      "arguments": {                │
     │        "query": "revenue 2024"     │
     │      }                             │
     │    }                               │
     │  }                                 │
     │                                    │
     │  ◄──── { "result": [...] } ──────│
```

MCP's tool calling, resource fetching, prompt templates — **all JSON-RPC 2.0**. The lesson you just completed IS the foundation of MCP.

---

### 2. Language Server Protocol (LSP) — Your IDE Uses This

```
VS Code                               TypeScript Language Server
     │                                    │
     │  { method: "textDocument/hover",   │
     │    params: { position: {2, 15} }   │
     │  }  ──────────────────────────────►│
     │                                    │
     │  ◄──── { result: "Returns the     │
     │          type of the variable" }   │
```

Every time VS Code shows you a tooltip, autocomplete, or error — it's making JSON-RPC calls to a language server. Same protocol as MCP!

---

### 3. Ethereum / Blockchain

```
Your DApp                             Ethereum Node
     │                                    │
     │  { method: "eth_getBalance",       │
     │    params: ["0xabc...", "latest"]   │
     │  }  ──────────────────────────────►│
     │                                    │
     │  ◄──── { result: "0x1234..." }    │
```

Every blockchain interaction uses JSON-RPC. MetaMask, ethers.js — all JSON-RPC clients.

---

### 4. The RPC Evolution Timeline

```
 1980s         1990s          2007           2016          2024+
 Sun RPC ──► CORBA/SOAP ──► Thrift ────► gRPC ────► JSON-RPC (MCP)
 (binary)    (XML mess)     (Facebook)   (Google)    (AI standard)
```

| System | Data Format | Speed | Human Readable? | Used By |
| :--- | :--- | :--- | :--- | :--- |
| SOAP | XML | Slow | Barely | Legacy banks |
| gRPC | Protobuf | Fast | No | Google, microservices |
| **JSON-RPC** | **JSON** | **Good** | **Yes** | **MCP, LSP, Ethereum** |

---

## 🧠 The Mental Model

> **RPC = calling a function on another computer.**
> **JSON-RPC = doing it with JSON messages.**
> **MCP = JSON-RPC with standardized tool/resource/prompt methods.**

```
 LESSON 7 (what you built):          MCP (real world):
 ──────────────────────────          ──────────────────
 method: "add"                       method: "tools/call"
 params: { a: 5, b: 3 }             params: { name: "search_db",
                                               arguments: { query: "..." } }
 result: 8                           result: { content: [...] }
```

Same protocol. Same JSON. MCP just standardizes the vocabulary.

---

**Next:** Let's ditch the network entirely and use STDIO pipes → [Lesson 8: STDIO](../L8_STDIO/)
