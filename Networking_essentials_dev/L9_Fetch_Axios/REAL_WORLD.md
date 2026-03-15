# 🌍 Lesson 9: Where fetch() / axios Show Up in the Real World

---

## What You Just Built

A practical toolkit for making HTTP calls — the same thing every AI engineer does daily when calling APIs.

---

## 🤖 Real Places fetch/axios Show Up in AI Engineering

### 1. Calling OpenAI API (The Most Common Use)

```javascript
// This is real production code (simplified)
const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'Explain TCP' }]
    })
});
const data = await response.json();
console.log(data.choices[0].message.content);
```

> This is literally L2 (HTTP) + L6 (JSON) + L9 (fetch) combined.

---

### 2. Calling Claude API

```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{ role: 'user', content: 'Explain TCP' }]
    })
});
```

Same pattern. Different URL, different headers. fetch() works for all.

---

### 3. Error Handling in Production

```javascript
// WRONG (beginner mistake):
const data = await fetch(url).then(r => r.json());

// RIGHT (production code):
const res = await fetch(url);
if (!res.ok) {
    if (res.status === 429) throw new Error('Rate limited! Slow down.');
    if (res.status === 401) throw new Error('Bad API key!');
    throw new Error(`API error: ${res.status}`);
}
const data = await res.json();
```

| Status Code | Meaning | Your Action |
| :--- | :--- | :--- |
| `200` | Success | Parse response |
| `401` | Bad API key | Check credentials |
| `429` | Rate limited | Wait and retry |
| `500` | Server error | Retry with backoff |

---

### 4. fetch() vs axios — When to Use What

| Feature | fetch() | axios |
| :--- | :--- | :--- |
| Built-in? | **Yes** (Node 18+, all browsers) | No (npm install) |
| Auto JSON parse? | No (need `.json()`) | **Yes** |
| Timeout support? | AbortController (manual) | **Built-in** |
| Interceptors? | No | **Yes** (great for auth) |
| Error on 404/500? | **No** (must check `.ok`) | **Yes** (throws) |

> **Rule of thumb:** Use fetch() for simple calls. Use axios when you need interceptors, retries, or cleaner error handling.

---

## 🧠 The Mental Model

> **fetch/axios = your toolbox for talking HTTP.**

```
 Your Code
     │
     │  fetch('https://api.openai.com/...')
     │
     ▼
 fetch() wraps:
     ├── TCP connection (L1)
     ├── HTTP formatting (L2)
     ├── TLS encryption (L3)
     ├── JSON parsing (L6)
     └── Error handling
```

---

**Next:** Let's design proper APIs with REST conventions → [Lesson 10: REST APIs](../L10_REST_APIs/)
