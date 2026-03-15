# 🌍 Lesson 10: Where REST APIs Show Up in the Real World

---

## What Is REST?

REST is **not a protocol**. It's a **design pattern** — a set of conventions for organizing HTTP APIs.

```
 REST says:
 ┌────────────────────────────────────────────────┐
 │  URLs = RESOURCES    (nouns, not verbs)         │
 │  Methods = ACTIONS   (GET, POST, PUT, DELETE)   │
 │  Status codes = RESULTS (200, 404, 500)        │
 └────────────────────────────────────────────────┘
```

---

## 🤖 Real Places REST APIs Show Up in AI Engineering

### 1. OpenAI API — Pure REST

```
POST   /v1/chat/completions     → Generate text
POST   /v1/embeddings           → Create embeddings
GET    /v1/models                → List available models
DELETE /v1/files/:id             → Delete an uploaded file
```

OpenAI's entire API follows REST conventions. Every AI engineer calls these daily.

---

### 2. Your AI App's Backend

```
Your typical AI application API:

POST   /api/predict              → Run inference
GET    /api/models               → List deployed models
PUT    /api/models/:id           → Update model config
DELETE /api/models/:id           → Remove a model
GET    /api/jobs                 → List training jobs
POST   /api/jobs                 → Start new training
```

You'll BUILD these REST APIs to serve your AI models to frontend apps.

---

### 3. Vector Database APIs (Pinecone)

```
POST   /vectors/upsert           → Add vectors
POST   /query                    → Search similar vectors
DELETE /vectors/delete           → Remove vectors
GET    /describe_index_stats     → Get index info
```

---

### 4. MCP vs REST — Key Difference

```
 REST API:                         MCP:
 ─────────                         ────
 GET  /api/weather?city=Dubai      { method: "tools/call",
 POST /api/search                    params: { name: "get_weather",
 PUT  /api/users/42                           arguments: {city: "Dubai"} }
                                   }

 Multiple endpoints                Single endpoint
 HTTP methods = actions            JSON-RPC method = action
 URL = resource                    params.name = tool name
```

> **REST** = many URLs, each a different resource.
> **MCP** = one channel, many tools via JSON-RPC.

---

## 🧠 The Mental Model

> **REST = organizing your HTTP API so it makes sense.**

| CRUD | HTTP Method | URL Pattern | Example |
| :--- | :--- | :--- | :--- |
| **C**reate | `POST` | `/api/agents` | Add new agent |
| **R**ead | `GET` | `/api/agents` or `/api/agents/:id` | List or get one |
| **U**pdate | `PUT` | `/api/agents/:id` | Modify agent |
| **D**elete | `DELETE` | `/api/agents/:id` | Remove agent |

---

**Next:** The grand finale — build a real MCP server → [Lesson 11: MCP Capstone](../L11_MCP_Capstone/)
