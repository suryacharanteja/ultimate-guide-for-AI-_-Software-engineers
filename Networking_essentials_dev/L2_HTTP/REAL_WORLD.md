# 🌍 Lesson 2: Where HTTP Shows Up in the Real World

---

## What You Just Built vs. Production

```
 LESSON (your laptop)                  PRODUCTION (cloud)
 ┌────────────────────┐                ┌──────────────────────────┐
 │ node server.js     │                │ Express / Next.js server │
 │ localhost:3000     │                │ api.yourapp.com:443      │
 │ 1 user (you)       │                │ millions of users        │
 └────────────────────┘                └──────────────────────────┘
```

The code is nearly identical. Production just adds load balancers, caching, and HTTPS.

---

## 🤖 Real Places HTTP Shows Up in AI Engineering

### 1. Calling OpenAI / Claude API

```
Your Backend                         OpenAI Servers
     │                                    │
     │  POST /v1/chat/completions ──────► │
     │  Headers: Authorization: Bearer sk-│
     │  Body: { model, messages }         │
     │                                    │
     │  ◄──── 200 OK ────────────────── │
     │  Body: { choices: [{message}] }    │
```

Every time your AI app calls GPT-4 or Claude, it sends an **HTTP POST** request with JSON — exactly what our server.js handles.

---

### 2. Serving ML Model Predictions

```
Mobile App / Browser                  Your AI Backend
     │                                    │
     │  POST /predict ───────────────────►│
     │  Body: { image: "base64..." }      │
     │                                    │
     │  ◄──── { label: "cat", conf: 0.97 }│
```

You build the server (like our server.js), deploy it, and clients send data for inference.

---

### 3. Webhook Receivers (AI Pipeline Triggers)

```
GitHub / Stripe / Slack               Your Webhook Server
     │                                    │
     │  POST /webhook ──────────────────► │
     │  Body: { event: "push", ... }      │
     │                                    │
     │  ◄──── 200 OK ────────────────── │
```

AI pipelines often start with a webhook — an HTTP POST that triggers retraining, data processing, or alerts.

---

### 4. Health Checks & Monitoring

```
Kubernetes / Load Balancer            Your AI Server
     │                                    │
     │  GET /health ────────────────────► │
     │  ◄──── { status: "ok", gpu: 80% } │
```

Every production AI server exposes an HTTP health endpoint. If it stops responding, the system restarts it automatically.

---

## 🧠 The Mental Model

> **HTTP = the language every service on the internet speaks.**

| What You Do | HTTP Method | Example |
| :--- | :--- | :--- |
| Get a webpage | `GET` | `GET /index.html` |
| Send data to an API | `POST` | `POST /v1/chat/completions` |
| Update a record | `PUT` | `PUT /users/42` |
| Delete something | `DELETE` | `DELETE /models/old-v1` |
| Check if server is alive | `GET` | `GET /health` |

---

**Next:** Let's encrypt this HTTP traffic → [Lesson 3: HTTPS/SSL](../L3_HTTPS_SSL/)
