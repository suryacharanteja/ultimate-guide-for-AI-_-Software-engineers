# 🌍 Lesson 6: Where Data Formats Show Up in the Real World

---

## Why Do Formats Matter?

The pipe (TCP) doesn't care what you send. But the **receiver** needs to know how to unpack it.

```
 Same data, different packaging:
 ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
 │ {"name":"AI"} │   │ name: AI      │   │ <name>AI</name>│
 │    JSON       │   │    YAML       │   │    XML         │
 └──────────────┘   └──────────────┘   └──────────────┘
```

---

## 🤖 Real Places Data Formats Show Up in AI Engineering

### 1. MCP — JSON Exclusively

```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": { "city": "Dubai" }
  }
}
```

Every MCP message — tool calls, results, notifications — is **JSON**. No exceptions. No XML. No YAML.

---

### 2. Config Files — YAML Everywhere

```yaml
# docker-compose.yml for your AI app
services:
  api:
    image: my-ai-api:latest
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=sk-...
  
  vector-db:
    image: qdrant/qdrant
    ports:
      - "6333:6333"
```

Docker, Kubernetes, GitHub Actions, CI/CD pipelines — all YAML. You'll write YAML daily as an AI engineer.

---

### 3. API Responses — JSON Standard

```
OpenAI API Response:
{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "TCP is a protocol that..."
    }
  }],
  "usage": { "total_tokens": 42 }
}
```

Every modern API (OpenAI, Claude, Hugging Face, Stripe) speaks JSON. Understanding its structure is non-negotiable.

---

### 4. Training Data — CSV and JSON Lines

```csv
text,label
"Great product!",positive
"Terrible experience",negative
```

```jsonl
{"text": "Great product!", "label": "positive"}
{"text": "Terrible experience", "label": "negative"}
```

Training datasets are typically **CSV** (tabular) or **JSONL** (one JSON object per line).

---

### 5. High-Performance Internal — Protobuf

```
gRPC between microservices:
     ┌──────────┐    Protobuf     ┌──────────┐
     │ Service A │───(binary)────►│ Service B │
     └──────────┘   ~10x faster   └──────────┘
                    than JSON
```

Google's gRPC uses Protocol Buffers — binary, fast, compact. Used when JSON is too slow.

---

## 🧠 The Format Decision Tree

```
 Need human readability?
 ├── YES → Is it a config file?
 │         ├── YES → YAML
 │         └── NO  → JSON
 └── NO  → Need max speed?
           ├── YES → Protobuf
           └── NO  → JSON (default choice)
```

| Format | When to Use | AI Engineering Example |
| :--- | :--- | :--- |
| **JSON** | APIs, MCP, data exchange | OpenAI responses, MCP tool calls |
| **YAML** | Configuration | Docker, K8s, CI/CD pipelines |
| **CSV** | Flat tabular data | Training datasets, exports |
| **XML** | Legacy systems only | Old enterprise APIs |
| **Protobuf** | Max speed internal comms | gRPC microservices |

---

**Next:** Let's call remote functions with JSON → [Lesson 7: JSON-RPC](../L7_JSON_RPC/)
