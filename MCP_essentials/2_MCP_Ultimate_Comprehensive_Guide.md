# The Ultimate Comprehensive MCP (Model Context Protocol) Learning Guide
## From Human Mode to Developer Mode - Detailed, Practical, Interactive

**Version: 3.0 - Ultimate Edition**
**Last Updated: February 2026**
**Based on Official MCP Documentation (2025-11-25 Specification)**

> **📋 Prerequisites:** Read `1_MCP_Foundational_Guide.md` first. This guide builds on those foundations.
> If you haven't read it, start with Parts 0-4 below (which provide a concise recap).
> If you have, **skip to Part 5** for new material.

---

## 📖 Table of Contents

### **🟢 HUMAN MODE — Foundations** (Recap of Guide 1 + expanded)
- [Part 0: Introduction & Why MCP Matters](#part-0-introduction--why-mcp-matters)
- [Part 1: Understanding the N×M Problem](#part-1-understanding-the-problem---the-nm-complexity)
- [Part 2: Simple Analogies to Get Started](#part-2-simple-analogies-to-get-started)
- [Part 3: How MCP Works — The Complete Picture](#part-3-how-mcp-works---the-complete-picture)
- [Part 4: Real-World Industry Examples](#part-4-real-world-industry-examples)

### **🟢 HUMAN MODE — Core Concepts** (New — starts here if you read Guide 1)
- [Part 5: What is MCP? (Detailed Definition)](#part-5-what-is-mcp)
- [Part 2: MCP Architecture Deep Dive](#part-2-mcp-architecture-deep-dive)
- [Part 3: Understanding MCP Servers (Tools/Resources/Prompts)](#part-3-understanding-mcp-servers)
- [Part 4: Understanding MCP Clients (Elicitation/Roots/Sampling)](#part-4-understanding-mcp-clients)
- [Part 5: Client vs Host — Complete Clarity](#part-5-client-vs-host---complete-clarity)

### **🔵 DEVELOPER MODE** (For builders and developers)
- [Part 6: Using Local MCP Servers](#part-6-using-local-mcp-servers)
- [Part 7: Building Your Own MCP Server](#part-7-building-your-own-mcp-server)
- [Part 8: Building Custom MCP Clients](#part-8-building-custom-mcp-clients)
- [Part 9: Remote Servers & Cloud Deployment](#part-9-remote-servers--cloud-deployment)
- [Part 10: VSCode Integration & Marketplace](#part-10-vscode-integration--marketplace)

### **🔴 DEBUG MODE** (For troubleshooting and optimization)
- [Part 11: Available SDKs](#part-11-available-sdks)
- [Part 12: MCP Inspector Tool](#part-12-mcp-inspector-tool)
- [Part 13: Security & Best Practices](#part-13-security--best-practices)
- [Part 14: Learning Path & Mastery](#part-14-learning-path--mastery)

---

---

# 🟢 HUMAN MODE - FOUNDATIONAL UNDERSTANDING

> **⏩ Already read Guide 1?** You can skip to [Part 5: Core Concepts](#part-5-what-is-mcp) for new material.
> The sections below (Parts 0-4) are a concise recap of the same foundations covered in `1_MCP_Foundational_Guide.md`.

---

## Part 0: Introduction & Why MCP Matters

### The AI Integration Challenge Today

**Question: Why should you care about MCP?**

If you use AI tools like Claude, ChatGPT, or Gemini, you've probably noticed they work best when they have access to information and can perform actions. But connecting AI to your data sources, applications, and tools has traditionally been messy and complicated.

### The Reality Before MCP

Imagine you want an AI assistant that can:
- Access your calendar
- Read your emails
- Query your company database
- Check your GitHub repositories
- Send messages through Slack
- Analyze files in Google Drive

Before MCP, each of these connections required:
- A completely custom integration
- Different authentication methods
- Different error handling
- Different formats for data
- Different maintenance and updates

If you had 5 AI applications and 10 data sources, you'd need 50 custom integrations. This became known as the **N × M problem**.

### Why This Matters to You

**For End Users:**
- You get better, more capable AI assistants
- Your AI can actually access your real data
- Your AI can take actions on your behalf
- Everything works more smoothly together

**For Developers:**
- You spend less time on integration plumbing
- You focus on actual features
- Updates don't break everything
- You can reuse components

**For Companies:**
- Faster deployment of AI tools
- Better data security
- Lower development costs
- Easier to maintain systems

### The Vision: AI That Actually Works

MCP enables AI applications to become truly useful by:
- Accessing your personal data (calendar, emails, documents)
- Querying business systems (databases, CRMs, tools)
- Taking actions (booking meetings, sending messages, creating files)
- Learning from your context (your documents, your history, your preferences)

All through a single, standard protocol.

---

## Part 1: Understanding the Problem - The N×M Complexity

### The Integration Nightmare Before MCP

Let's visualize what it looked like before we had a standard:

**Without MCP:**
```
4 AI Applications × 5 Data Sources = 20 custom connectors needed

Applications:              Data Sources:
├─ Claude                  ├─ PostgreSQL Database
├─ ChatGPT                 ├─ Slack
├─ Gemini                  ├─ GitHub
└─ Custom LLM              ├─ Google Drive
                           └─ Your Company System

Each combination requires:
❌ Custom authentication
❌ Custom API parsing
❌ Custom error handling
❌ Custom testing
❌ Custom maintenance
❌ Custom documentation
```

### The Real Cost of N×M Complexity

**Development Time:**
- 20 integrations × 2 weeks per integration = 40 weeks of work
- That's 1 engineer for a whole year just on integration code
- Not counting bugs, updates, and maintenance

**Maintenance Burden:**
- When GitHub updates their API → everything breaks
- When Slack changes authentication → emergency fix needed
- When database schema changes → application crashes
- Each change requires updates in 4+ places

**Quality Issues:**
- More code = more bugs
- Different error handling = confusing behavior
- Inconsistent interfaces = harder to use
- Testing nightmare = hard to verify quality

### The MCP Solution: One Standard for Everything

**With MCP:**
```
4 AI Applications × 5 Data Sources = 9 standard implementations

Each AI tool implements MCP once  = 4 weeks
Each data source implements MCP once = 5 weeks
Total = 9 weeks (vs 40 weeks without MCP!)

Savings: 31 weeks of development
Or: $124,000+ at $100/hour rates
Plus: Fewer bugs, easier maintenance, faster updates
```

### Real Company Impact

**Slack's Integration Challenge (2015-2020):**

Before they had a standard (pre-MCP):
- 50+ integrations to maintain
- Each one different
- 10+ person team just on integrations
- High failure rates
- Slow feature additions

With something like MCP (hypothetically):
- 1 standard protocol
- Integrations manage themselves
- 1-2 people to oversee
- Lower failure rates
- Fast feature additions

### Visual Comparison

**Before MCP (Spaghetti Code):**
```
┌─────────────────────────────────────────────────┐
│          Claude Desktop                         │
│  ┌─────────────────────────────────────────┐   │
│  │ Code for connecting to:                 │   │
│  │ ├─ GitHub (custom API parser)           │   │
│  │ ├─ Database (custom SQL builder)        │   │
│  │ ├─ Slack (custom OAuth flow)            │   │
│  │ ├─ Google Drive (custom auth)           │   │
│  │ └─ Email (custom protocol handler)      │   │
│  │                                          │   │
│  │ Plus error handling, retries, timeouts  │   │
│  │ for EACH of the above...                │   │
│  │                                          │   │
│  │ Total: 1,000+ lines of integration code│   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

**With MCP (Clean & Standard):**
```
┌─────────────────────────────────────────────────┐
│          Claude Desktop (Host)                  │
│  ┌─────────────────────────────────────────┐   │
│  │ Standard MCP Protocol Handler           │   │
│  │ ├─ Connect to ANY server               │   │
│  │ ├─ Standard error handling             │   │
│  │ ├─ Standard authentication             │   │
│  │ ├─ Standard data format                │   │
│  │ └─ Standard timeout management         │   │
│  │                                          │   │
│  │ Total: 100+ lines of standard code    │   │
│  └─────────────────────────────────────────┘   │
           │        │          │         │
    ┌──────▼─┬──────▼────┬────▼────┬────▼──┐
    │ GitHub │ Postgres  │ Slack   │Google │
    │Server  │ Server    │ Server  │Drive  │
    │(MCP)   │ (MCP)     │ (MCP)   │Server │
    └────────┴───────────┴─────────┴───────┘
```

### Why This Matters Going Forward

Every new AI application
Every new data source
Every new tool
Can now connect instantly
Without building custom integration code

This is revolutionary for the AI industry.

---

## Part 2: Simple Analogies to Get Started

### Analogy 1: MCP as USB-C (The Universal Connector)

**The Old Days:**
```
Travelers with 3 devices (laptop, phone, tablet)
Visiting 3 countries (USA, Europe, UK)

USA: Type A outlet
Europe: Type C outlet  
UK: Type G outlet

= 9 different adapters needed (3 devices × 3 countries)

Every time you travel: "Did I pack the right adapter?"
Nightmare!
```

**Modern Times (USB-C everywhere):**
```
All devices have USB-C
All countries have USB-C
All chargers are USB-C

= 1 universal adapter (or just cables)

Plug in anywhere, instantly works.
This is MCP for AI!
```

**How it maps to MCP:**
```
Before: Claude needs custom connector for GitHub
        ChatGPT needs different connector for GitHub
        Gemini needs yet another connector for GitHub
        = 3 different integrations for the same service

After:  GitHub implements MCP once
        All AI tools use the same connection
        = 1 standard interface
```

### Analogy 2: MCP as a Universal Restaurant Order System

**Before MCP:**
```
You're hungry and want to order from 5 restaurants:

McDonald's:  Call by phone, their order system
Subway:      Order through their app, different system
Pizza Hut:   Order on website, different format
Taco Bell:   Call center, different process
Chipotle:    In-person only, walk-in only

You need to learn 5 different ordering systems!

What if you just want to say: "I want food"?
Too bad. Learn their systems or go hungry.
```

**With MCP (Universal Ordering):**
```
All restaurants implement ONE ordering system:

1. View menu (standard format)
2. Select items (same interface)
3. Check out (same process)
4. Track delivery (same system)
5. Get confirmation (same format)

Learn the system ONCE.
Order from ANY restaurant.
Everything works the same way.

This is what MCP does for AI and data sources.
```

### Analogy 3: MCP as a Smart Translator

**Without MCP:**
```
You (English speaker) need data from 5 sources:

Database (speaks SQL):           Learn SQL
GitHub API (speaks REST):        Learn REST format
Slack API (speaks their format): Learn Slack API
Google Drive (speaks Google):    Learn Google format
Email (speaks IMAP/SMTP):       Learn email protocols

You need to become fluent in 5 languages!
And learn new languages every time you add a source.
```

**With MCP (One Translator):**
```
You just speak English:
"I need data from database, GitHub, Slack, Drive, and email"

MCP Translator (Server) handles:
✓ Learning what database speaks (SQL)
✓ Learning what GitHub speaks (REST)
✓ Learning what Slack speaks (their API)
✓ Learning what Drive speaks (Google API)
✓ Learning what email speaks (IMAP)

You never deal with the complexity.
The translator handles all the dialects.
```

### Analogy 4: MCP as a Personal Assistant

**Without MCP:**
```
You're the CEO. You need information from:
- Your calendar (different system)
- Your email (different system)
- Company database (different system)
- GitHub repos (different system)
- Slack messages (different system)

You have to ask each system separately.
Each requires different procedures.
"What's my calendar?" "What are my emails?" "Show me GitHub..."

It's exhausting.
```

**With MCP (Personal Assistant):**
```
You have one assistant (Claude with MCP).

You just ask: "What's my schedule for tomorrow?"

The assistant:
✓ Checks calendar (via MCP)
✓ Checks email (via MCP)
✓ Checks Slack (via MCP)
✓ Checks GitHub (via MCP)

Synthesizes everything into one answer.
One interface for everything.
Effortless for you.
```

---

## Part 3: How MCP Works - The Complete Picture

### The Basic Flow: From Question to Answer

**Step 1: You Ask a Question**
```
User: "What meetings do I have tomorrow and what are they about?"
```

**Step 2: Claude Desktop (Host) Receives It**
```
Claude Desktop reads your question
↓
"I need to access the calendar, emails, and meeting notes"
```

**Step 3: Claude Discovers Available Tools**
```
Claude Desktop has 3 MCP Clients:
├─ Client 1 ←→ Calendar Server (has get_calendar tool)
├─ Client 2 ←→ Email Server (has get_emails tool)
└─ Client 3 ←→ Files Server (has read_file tool)
```

**Step 4: Claude Calls the Tools**
```
Client 1: "Give me tomorrow's calendar events"
↓ (Standard MCP format)
Calendar Server: "Returns events in standard format"

Client 2: "Give me unread emails from team"
↓ (Standard MCP format)
Email Server: "Returns emails in standard format"

Client 3: "Read meeting notes files"
↓ (Standard MCP format)
Files Server: "Returns file contents in standard format"
```

**Step 5: Claude Synthesizes**
```
Claude gets all the data back in standard format
Combines it all together
Creates a comprehensive answer
```

**Step 6: You Get the Answer**
```
Claude: "Tomorrow you have:
  9 AM - Team standup (Sarah leading, discussing Q1 roadmap)
  2 PM - Client call (About the project deadline)
  4 PM - 1:1 with manager (Your evaluation)"
```

### What's Happening Under the Hood

Each step uses MCP protocol:

```
Request Format (JSON-RPC 2.0):
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_calendar",
    "arguments": {
      "date": "tomorrow"
    }
  }
}

Response Format:
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [{
      "type": "text",
      "text": "[calendar events]"
    }]
  }
}
```

Same format for EVERY server, EVERY tool, EVERY request.

This standardization is what makes MCP powerful.

---

## Part 4: Real-World Industry Examples

### Example 1: Fortune 500 Financial Services Company

**The Scenario:**
A bank's financial analysis team wants an AI assistant that can:
- Access the credit risk database (PostgreSQL)
- Query the trading system (proprietary system)
- Pull regulatory documents (document management)
- Analyze market data (Bloomberg Terminal)
- Access compliance records (archival system)

**Before MCP (What Actually Happens):**
```
Project Timeline: 8 months

Month 1-2: Build custom PostgreSQL connector
Month 2-3: Build custom trading system connector
Month 3-4: Build custom document system connector
Month 4-5: Build custom Bloomberg connector
Month 5-6: Build custom compliance connector
Month 6-7: Debug all 5 integrations (they don't work together)
Month 7-8: Fix security and performance issues

Cost: $500K+ in engineering time
Problem: Any system update breaks everything
Reality: Project delayed 3 months
```

**With MCP (What Could Happen):**
```
Project Timeline: 6 weeks

Week 1: PostgreSQL team implements MCP server (1 person, 1 week)
Week 1: Trading team implements MCP server (1 person, 1 week)
Week 2: Document team implements MCP server (1 person, 1 week)
Week 2: Bloomberg team implements MCP server (1 person, 1 week)
Week 3: Compliance team implements MCP server (1 person, 1 week)
Week 4-5: All teams test, integrate, deploy
Week 6: Production launch

Cost: $50K in engineering time (all done by existing team members)
Benefit: Any system update? That team handles it independently
Reality: Project delivered on time and on budget
```

**Actual Result:**
```
With MCP: Analyst can now ask:
"Analyze credit risk for our largest customers, comparing against 
market conditions, regulatory requirements, and recent trading activity"

Claude automatically:
✓ Pulls customer data from database
✓ Gets trading info from trading system
✓ Retrieves regulatory documents
✓ Analyzes market data
✓ Checks compliance records
✓ Synthesizes into comprehensive analysis

Result: 2 hours of work done in 2 minutes.
```

### Example 2: E-Commerce Company (Shopify-like)

**The Scenario:**
Customer support chatbot needs to:
- Access order history (database)
- Check inventory (inventory system)
- Handle returns (returns system)
- Track shipments (shipping system)
- Access customer records (CRM)
- Send notifications (email system)

**Before MCP:**
```
Customer asks: "Where's my order? Can I return it?"

Chatbot needs to:
1. Query 5 different systems
2. Each system has different API
3. Each system has different error handling
4. Each system has different authentication
5. Each system has different data format

Then combine everything into one answer.

Code needed: 500+ lines of integration code
Bugs: Constant issues when systems update
Time to deploy: 3-4 weeks per new system
```

**With MCP:**
```
Customer asks: "Where's my order? Can I return it?"

Chatbot needs to:
1. Call get_order_status tool
2. Call get_shipment_tracking tool
3. Call get_return_policy tool
4. Call check_return_eligibility tool

Each tool returns data in standard MCP format.

Code needed: 50 lines of standard code
Bugs: Rare (each system handles its own)
Time to deploy: 1-2 days per new system

Real advantage: System updates don't break chatbot
```

### Example 3: Software Development Team

**The Scenario:**
AI pair programmer wants to:
- Read code from GitHub
- Check documentation (wiki)
- Query database schema (PostgreSQL)
- Check build status (CI/CD system)
- Access code analysis reports
- Look up similar patterns in past code

**Before MCP:**
```
AI Integration Team spent 6 months building custom connectors:
- GitHub API wrapper (2 weeks)
- Wiki documentation parser (2 weeks)
- Database schema query builder (2 weeks)
- CI/CD integration (2 weeks)
- Code analysis report reader (2 weeks)
- Debugging and fixing issues (2 months!)

Result: Fragile, breaks when systems update
Problem: Adding a new system takes weeks
```

**With MCP:**
```
GitHub team: "We built an MCP server for GitHub" (1 week)
Wiki team: "We built an MCP server for our wiki" (1 week)
Database team: "We built an MCP server for schemas" (1 week)
CI/CD team: "We built an MCP server for CI/CD" (1 week)
Analytics team: "We built an MCP server for reports" (1 week)

AI integrates with all 5 servers (1 week, standard MCP)

Result: Robust, each team maintains their own
Benefit: Adding a new system = 1 week of work
```

---

---

# 🟢 HUMAN MODE - CORE CONCEPTS

> **📌 Coming from Guide 1?** This is where the new material starts. Everything above was a recap.
> From here on, you'll dive deeper into architecture, servers, clients, and the host-client distinction.

---

## Part 5: What is MCP?


### The Big Picture: Solving the Connection Problem

**Question: What's the actual problem MCP solves?**

Before MCP, imagine you wanted to build an AI assistant that could:
- Access files on your computer
- Query your company database
- Check your calendar
- Send messages through Slack
- Search GitHub repositories

Each of these required building a unique, custom connector. If you wanted your AI to work with 10 data sources, you'd need 10 different custom integrations. If you had 5 different AI applications, you'd need 50 different connectors (5 AI apps × 10 data sources). This is the **N × M problem**.

### The Solution: MCP as a Universal Standard

MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems. Using MCP, AI applications like Claude or ChatGPT can connect to data sources (e.g. local files, databases), tools (e.g. search engines, calculators) and workflows (e.g. specialized prompts)—enabling them to access key information and perform tasks.

**Think of MCP like a USB-C port for AI:** Just as USB-C provides a standardized way to connect electronic devices, MCP provides a standardized way to connect AI applications to external systems.

### What Can MCP Actually Enable?


- Agents can access your Google Calendar and Notion, acting as a more personalized AI assistant.
- Claude Code can generate an entire web app using a Figma design.
- Enterprise chatbots can connect to multiple databases across an organization, empowering users to analyze data using chat.
- AI models can create 3D designs on Blender and print them out using a 3D printer.


### Why Does MCP Matter to Different People?


- **Developers**: MCP reduces development time and complexity when building, or integrating with, an AI application or agent.
- **AI applications or agents**: MCP provides access to an ecosystem of data sources, tools and apps which will enhance capabilities and improve the end-user experience.
- **End-users**: MCP results in more capable AI applications or agents which can access your data and take actions on your behalf when necessary.


### Real-World Example: Customer Support Chatbot

Imagine a company wants to build a customer support AI assistant. Without MCP:

```
Customer Service AI needs access to:
├─ Ticketing System (Custom API connector)
├─ Product Database (Custom SQL connector)
├─ Order History (Custom REST connector)
├─ Knowledge Base (Custom file system connector)
├─ Email System (Custom email connector)
└─ Slack (Custom Slack SDK connector)

= 6 custom connectors to maintain
= Different authentication methods for each
= Different error handling for each
= Breaks when any system updates
```

With MCP:

```
Customer Service AI needs access to:
├─ Ticketing MCP Server (Implements MCP standard)
├─ Product MCP Server (Implements MCP standard)
├─ Order MCP Server (Implements MCP standard)
├─ Knowledge MCP Server (Implements MCP standard)
├─ Email MCP Server (Implements MCP standard)
└─ Slack MCP Server (Implements MCP standard)

= 1 standard protocol
= Standard authentication
= Standard error handling
= Systems can update independently
= Easy to add new servers
```

---

## Part 2: MCP Architecture Deep Dive

### Understanding the Three Key Participants

MCP follows a client-server architecture where an MCP host — an AI application like Claude Code or Claude Desktop — establishes connections to one or more MCP servers. The MCP host accomplishes this by creating one MCP client for each MCP server. Each MCP client maintains a dedicated connection with its corresponding MCP server.

### The Three Core Participants Explained

#### 1. **MCP Host** (The AI Application)

**What it is:** The main application you interact with. Examples:
- Claude Desktop (the app on your computer)
- Claude.ai (the web interface)
- VSCode IDE
- Your custom application

**What it does:**
- Manages the overall user experience
- Coordinates multiple MCP clients
- Displays results to users
- Handles authentication and security
- Manages context for the AI model

**Real example:** When you open Claude Desktop and ask it a question, Claude Desktop is the MCP Host.

#### 2. **MCP Client**

**What it is:** A component created by the host application. For each MCP server you connect to, the host creates one client.

**What it does:**
- Maintains a dedicated connection to ONE MCP server
- Sends requests to the server
- Receives responses from the server
- Handles JSON-RPC communication
- Manages the protocol conversation

**Real example:** When Claude Desktop connects to a file system server, it creates one MCP Client specifically for that server. If it also connects to a GitHub server, it creates another separate MCP Client.

**Visual representation:**

```
Claude Desktop (Host)
│
├─ MCP Client 1 ──→ File System Server
├─ MCP Client 2 ──→ GitHub Server  
├─ MCP Client 3 ──→ Database Server
└─ MCP Client 4 ──→ Slack Server

Each Client is independent and manages its own connection.
```
![client-server relation](../images/imagecs.png)
#### 3. **MCP Server**

**What it is:** A program that provides data and functionality through the MCP protocol. Can run locally or remotely.

**What it does:**
- Exposes tools, resources, and prompts
- Listens for requests from clients
- Executes operations when asked
- Returns results in standard MCP format
- Can send notifications about changes

**Real example:** A database server that listens for queries and returns results.

**Two types of servers:**


Local MCP servers that use the STDIO transport typically serve a single MCP client, whereas remote MCP servers that use the Streamable HTTP transport will typically serve many MCP clients.


- **Local servers:** Run on your computer, accessed via direct pipes, single client connection
- **Remote servers:** Run on a server/cloud, accessed via HTTP, multiple client connections

### The Two Layers of MCP

MCP consists of two layers:

* **Data layer**: Defines the JSON-RPC based protocol for client-server communication, including lifecycle management, and core primitives, such as tools, resources, prompts and notifications.
* **Transport layer**: Defines the communication mechanisms and channels that enable data exchange between clients and servers, including transport-specific connection establishment, message framing, and authorization.

#### Layer 1: Data Layer

**What it is:** The protocol rules that define how to communicate.

**Key responsibilities:**
- Lifecycle management (starting connections, negotiating capabilities)
- Core primitives (tools, resources, prompts)
- Notifications (real-time updates)
- JSON-RPC 2.0 message format

**Think of it like:** The language used in a conversation - the words, grammar, and meanings.

#### Layer 2: Transport Layer

**What it is:** The mechanism for physically moving messages between client and server.

**Two transport options:**


* **Stdio transport**: Uses standard input/output streams for direct process communication between local processes on the same machine, providing optimal performance with no network overhead.
* **Streamable HTTP transport**: Uses HTTP POST for client-to-server messages with optional Server-Sent Events for streaming capabilities. This transport enables remote server communication and supports standard HTTP authentication methods including bearer tokens, API keys, and custom headers. MCP recommends using OAuth to obtain authentication tokens.


**Think of it like:** The delivery method - is it a local conversation or sending a letter across the country?

### The Core Primitives: The Building Blocks

MCP primitives are the most important concept within MCP. They define what clients and servers can offer each other.

**What servers expose:**


MCP defines three core primitives that *servers* can expose:

* **Tools**: Executable functions that AI applications can invoke to perform actions (e.g., file operations, API calls, database queries)
* **Resources**: Data sources that provide contextual information to AI applications (e.g., file contents, database records, API responses)
* **Prompts**: Reusable templates that help structure interactions with language models (e.g., system prompts, few-shot examples)


**What clients expose:**


MCP also defines primitives that *clients* can expose. These primitives allow MCP server authors to build richer interactions.

* **Sampling**: Allows servers to request language model completions from the client's AI application.
* **Elicitation**: Allows servers to request additional information from users.
* **Logging**: Enables servers to send log messages to clients for debugging and monitoring purposes.


### Complete Architecture Visualization

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE LAYER                     │
│   (Web browser, Desktop app, IDE, etc.)                     │
└──────────────────────┬────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│            MCP HOST (Claude Desktop, IDE, etc.)             │
│                                                             │
│  Responsibilities:                                         │
│  • Manages user experience                                │
│  • Coordinates multiple MCP clients                       │
│  • Passes data to/from LLM                               │
│  • Handles security & permissions                        │
└──────────────────────┬────────────────────────────────────┘
        │              │              │              │
        │              │              │              │
┌───────▼──┐  ┌────────▼──┐  ┌──────▼────┐  ┌──────▼─────┐
│ MCP      │  │ MCP       │  │ MCP       │  │ MCP        │
│ Client 1 │  │ Client 2  │  │ Client 3  │  │ Client 4   │
│          │  │           │  │           │  │            │
│ (Data    │  │ (Data     │  │ (Data     │  │ (Data      │
│ Layer)   │  │ Layer)    │  │ Layer)    │  │ Layer)     │
└───────┬──┘  └────┬──────┘  └──┬────────┘  └────┬───────┘
        │          │           │              │
   ┌────▼────┐ ┌───▼────┐  ┌───▼────┐  ┌────▼────┐
   │ Stdio   │ │ Stdio  │  │ HTTP   │  │ HTTP    │
   │         │ │        │  │        │  │         │
   │(Transport   │(Transport  │(Transport  │(Transport
   │ Layer)      │ Layer)     │ Layer)     │ Layer)
   └────┬────┘ └────┬───┘  └────┬───┘  └────┬────┘
        │           │           │          │
   ┌────▼──────┐ ┌──▼─────┐ ┌──▼─────┐ ┌──▼──────┐
   │File       │ │ GitHub │ │Database│ │ Slack   │
   │System     │ │Server  │ │Server  │ │Server   │
   │Server     │ │(Local) │ │(Local) │ │(Remote) │
   │(Local)    │ │        │ │        │ │         │
   └───────────┘ └────────┘ └────────┘ └─────────┘
```

### Step-by-Step: How an MCP Interaction Works

Let's trace what happens when you ask Claude Desktop a question:

**Step 1: Initialization**

MCP begins with lifecycle management through a capability negotiation handshake. As described in the lifecycle management section, the client sends an `initialize` request to establish the connection and negotiate supported features.

The initialization process serves several critical purposes:

1. **Protocol Version Negotiation**: The `protocolVersion` field ensures both client and server are using compatible protocol versions.
2. **Capability Discovery**: The `capabilities` object allows each party to declare what features they support.
3. **Identity Exchange**: The `clientInfo` and `serverInfo` objects provide identification and versioning information for debugging and compatibility purposes.


**Step 2: Tool Discovery**

The client can discover available tools by sending a `tools/list` request. This request is fundamental to MCP's tool discovery mechanism — it allows clients to understand what tools are available on the server before attempting to use them.

The response contains a `tools` array that provides comprehensive metadata about each available tool.


**Step 3: Tool Execution**

The client can now execute a tool using the `tools/call` method. The request structure includes:

1. **`name`**: Must match exactly the tool name from the discovery response
2. **`arguments`**: Contains the input parameters as defined by the tool's `inputSchema`
3. **JSON-RPC Structure**: Uses standard JSON-RPC 2.0 format with unique `id` for request-response correlation


**Step 4: Real-Time Updates**

MCP supports real-time notifications that enable servers to inform clients about changes without being explicitly requested. When the server's available tools change—such as when new functionality becomes available, existing tools are modified, or tools become temporarily unavailable—the server can proactively notify connected clients.

Upon receiving this notification, the client typically reacts by requesting the updated tool list. This creates a refresh cycle that keeps the client's understanding of available tools current.


---

## Part 3: Understanding MCP Servers

### What is an MCP Server?

MCP servers are programs that expose specific capabilities to AI applications through standardized protocol interfaces.
Common examples include file system servers for document access, database servers for data queries, GitHub servers for code management, Slack servers for team communication, and calendar servers for scheduling.

### The Three Core Server Features


Servers provide functionality through three building blocks:

| Feature | Explanation | Examples | Who controls it |
| --- | --- | --- | --- |
| **Tools** | Functions that your LLM can actively call, and decides when to use them based on user requests. Tools can write to databases, call external APIs, modify files, or trigger other logic. | Search flights Send messages Create calendar events | Model |
| **Resources** | Passive data sources that provide read-only access to information for context, such as file contents, database schemas, or API documentation. | Retrieve documents Access knowledge bases Read calendars | Application |
| **Prompts** | Pre-built instruction templates that tell the model to work with specific tools and resources. | Plan a vacation Summarize my meetings Draft an email | User |


### Feature 1: Tools (Model-Controlled Actions)

**What are tools?**

Tools are functions that the AI model can decide to call. When you ask the AI to do something, it might choose to use a tool.

**Real-world example: Flight booking**

```
User asks: "Book me a flight to Barcelona next week"

The AI might decide to use tools:
1. searchFlights(origin: "NYC", destination: "Barcelona", date: "2024-06-15")
   → Returns available flights
2. createCalendarEvent(title: "Barcelona Trip", dates: "...")
   → Blocks time on calendar
3. sendEmail(to: "team@company.com", subject: "Out of Office", body: "...")
   → Notifies colleagues
```

**How tools work:**


Tools are schema-defined interfaces that LLMs can invoke. MCP uses JSON Schema for validation. Each tool performs a single operation with clearly defined inputs and outputs. Tools may require user consent prior to execution, helping to ensure users maintain control over actions taken by a model.

**Protocol operations:**

| Method | Purpose | Returns |
| --- | --- | --- |
| `tools/list` | Discover available tools | Array of tool definitions with schemas |
| `tools/call` | Execute a specific tool | Tool execution result |


**Example tool definition:**

```json
{
  "name": "searchFlights",
  "description": "Search for available flights",
  "inputSchema": {
    "type": "object",
    "properties": {
      "origin": { "type": "string", "description": "Departure city" },
      "destination": { "type": "string", "description": "Arrival city" },
      "date": { "type": "string", "format": "date", "description": "Travel date" }
    },
    "required": ["origin", "destination", "date"]
  }
}
```

**Key insight:** The model (AI) decides when to use tools. The tool definition is like a contract saying "if you want to search flights, call me with these parameters in this format."

### Feature 2: Resources (Passive Data Access)

**What are resources?**

Resources are pieces of information the application can retrieve and give to the AI for context.


Resources expose data from files, APIs, databases, or any other source that an AI needs to understand context. Applications can access this information directly and decide how to use it - whether that's selecting relevant portions, searching with embeddings, or passing it all to the model.

Each resource has a unique URI (e.g., `file:///path/to/document.md`) and declares its MIME type for appropriate content handling.

Resources support two discovery patterns:

* **Direct Resources** - fixed URIs that point to specific data. Example: `calendar://events/2024` - returns calendar availability for 2024
* **Resource Templates** - dynamic URIs with parameters for flexible queries. Example:
  + `travel://activities/{city}/{category}` - returns activities by city and category
  + `travel://activities/barcelona/museums` - returns all museums in Barcelona


**Real-world example: Travel planning context**


Continuing with the travel planning example, resources provide the AI application with access to relevant information:

* **Calendar data** (`calendar://events/2024`) - Checks user availability
* **Travel documents** (`file:///Documents/Travel/passport.pdf`) - Accesses important documents
* **Previous itineraries** (`trips://history/barcelona-2023`) - References past trips and preferences

The AI application retrieves these resources and decides how to process them, whether selecting a subset of data using embeddings or keyword search, or passing raw data directly to the model.


**Important distinction:** Unlike tools (where the AI decides to use them), resources are application-controlled. The application decides which resources to provide to the AI.

### Feature 3: Prompts (User-Invoked Templates)

**What are prompts?**

Prompts are reusable templates that guide the AI through structured workflows.


Prompts provide reusable templates. They allow MCP server authors to provide parameterized prompts for a domain, or showcase how to best use the MCP server.

Prompts are structured templates that define expected inputs and interaction patterns. They are user-controlled, requiring explicit invocation rather than automatic triggering. Prompts can be context-aware, referencing available resources and tools to create comprehensive workflows.

**Protocol operations:**

| Method | Purpose | Returns |
| --- | --- | --- |
| `prompts/list` | Discover available prompts | Array of prompt descriptors |
| `prompts/get` | Retrieve prompt details | Full prompt definition with arguments |


**Real-world example: Travel planning prompt**

```json
{
  "name": "plan-vacation",
  "title": "Plan a vacation",
  "description": "Guide through vacation planning process",
  "arguments": [
    { "name": "destination", "type": "string", "required": true },
    { "name": "duration", "type": "number", "description": "days" },
    { "name": "budget", "type": "number", "required": false },
    { "name": "interests", "type": "array", "items": { "type": "string" } }
  ]
}
```

When a user invokes this prompt with:
- Destination: Barcelona
- Duration: 7 days
- Budget: $3000
- Interests: ["beaches", "architecture", "food"]

The AI follows a structured workflow to plan the vacation.

### Multiple Servers Working Together


The real power of MCP emerges when multiple servers work together, combining their specialized capabilities through a unified interface.

Consider a personalized AI travel planner application, with three connected servers:

* **Travel Server** - Handles flights, hotels, and itineraries
* **Weather Server** - Provides climate data and forecasts
* **Calendar/Email Server** - Manages schedules and communications


**Complete travel planning workflow:**


1. **User invokes a prompt with parameters:**

   ```
   {
     "prompt": "plan-vacation",
     "arguments": {
       "destination": "Barcelona",
       "departure_date": "2024-06-15",
       "return_date": "2024-06-22",
       "budget": 3000,
       "travelers": 2
     }
   }
   ```
2. **User selects resources to include:**
   * `calendar://my-calendar/June-2024` (from Calendar Server)
   * `travel://preferences/europe` (from Travel Server)
   * `travel://past-trips/Spain-2023` (from Travel Server)
3. **AI processes the request using tools:**
   The AI first reads all selected resources to gather context - identifying available dates from the calendar, learning preferred airlines and hotel types from travel preferences, and discovering previously enjoyed locations from past trips.
   Using this context, the AI then executes a series of Tools:
   * `searchFlights()` - Queries airlines for NYC to Barcelona flights
   * `checkWeather()` - Retrieves climate forecasts for travel dates
   
   The AI then uses this information to create the booking and following steps, requesting approval from the user where necessary:
   * `bookHotel()` - Finds hotels within the specified budget
   * `createCalendarEvent()` - Adds the trip to the user's calendar
   * `sendEmail()` - Sends confirmation with trip details


---

## Part 4: Understanding MCP Clients

### What is an MCP Client?

MCP clients are instantiated by host applications to communicate with particular MCP servers. The host application, like Claude.ai or an IDE, manages the overall user experience and coordinates multiple clients. Each client handles one direct communication with one server.

**Key point:** A client is not the same as a host. The client is just the protocol component managing one connection.

### Client Features: Going Beyond Basic Data Exchange

Besides accessing server features, clients can expose features to servers. This enables richer interactions.


In addition to making use of context provided by servers, clients may provide several features to servers. These client features allow server authors to build richer interactions.

| Feature | Explanation | Example |
| --- | --- | --- |
| **Elicitation** | Elicitation enables servers to request specific information from users during interactions, providing a structured way for servers to gather information on demand. | A server booking travel may ask for the user's preferences on airplane seats, room type or their contact number to finalise a booking. |
| **Roots** | Roots allow clients to specify which directories servers should focus on, communicating intended scope through a coordination mechanism. | A server for booking travel may be given access to a specific directory, from which it can read a user's calendar. |
| **Sampling** | Sampling allows servers to request LLM completions through the client, enabling an agentic workflow. This approach puts the client in complete control of user permissions and security measures. | A server for booking travel may send a list of flights to an LLM and request that the LLM pick the best flight for the user. |


### Feature 1: Elicitation (Asking Users for Information)

**What is elicitation?**


Elicitation enables servers to request specific information from users during interactions, creating more dynamic and responsive workflows.

Elicitation provides a structured way for servers to gather necessary information on demand. Instead of requiring all information up front or failing when data is missing, servers can pause their operations to request specific inputs from users. This creates more flexible interactions where servers adapt to user needs rather than following rigid patterns.


**Real-world example: Booking confirmation**


A travel booking server demonstrates elicitation's power through the final booking confirmation process. When a user has selected their ideal vacation package to Barcelona, the server needs to gather final approval and any missing details before proceeding.

The server elicits booking confirmation with a structured request that includes the trip summary (Barcelona flights June 15-22, beachfront hotel, total $3,000) and fields for any additional preferences—such as seat selection, room type, or travel insurance options.

As the booking progresses, the server elicits contact information needed to complete the reservation. It might ask for traveler details for flight bookings, special requests for the hotel, or emergency contact information.


**How the user sees it:**

```
Server asks (via Client):
┌─────────────────────────────────────┐
│ Barcelona Booking Details           │
├─────────────────────────────────────┤
│ Trip Summary: June 15-22, $3,000    │
│                                     │
│ Confirm booking? [Yes / No]         │
│ Seat preference: [Window/Aisle]     │
│ Room type: [Sea view / City view]   │
│ Travel insurance? [Yes / No]        │
└─────────────────────────────────────┘

User provides information → Server receives it and continues
```

### Feature 2: Roots (Filesystem Boundaries)

**What are roots?**


Roots are a mechanism for clients to communicate filesystem access boundaries to servers. They consist of file URIs that indicate directories where servers can operate, helping servers understand the scope of available files and folders. While roots communicate intended boundaries, they do not enforce security restrictions. Actual security must be enforced at the operating system level, via file permissions and/or sandboxing.


**Real-world example: Travel planning workspace**


A travel agent working with multiple client trips benefits from roots to organize filesystem access. Consider a workspace with different directories for various aspects of travel planning.

The client provides filesystem roots to the travel planning server:

* `file:///Users/agent/travel-planning` - Main workspace containing all travel files
* `file:///Users/agent/travel-templates` - Reusable itinerary templates and resources
* `file:///Users/agent/client-documents` - Client passports and travel documents

When the agent creates a Barcelona itinerary, well-behaved servers respect these boundaries—accessing templates, saving the new itinerary, and referencing client documents within the specified roots.


**Why roots matter:**

Roots tell servers "you can work here" but are not security boundaries. They're more like guidelines for well-behaved servers.

### Feature 3: Sampling (Servers Requesting AI Analysis)

**What is sampling?**


Sampling enables servers to request language model completions through the client, enabling an agentic workflow. This approach puts the client in complete control of user permissions and security measures. Because sampling requests occur within the context of other operations—like a tool analyzing data—and are processed as separate model calls, they maintain clear boundaries between different contexts, allowing for more efficient use of the context window.


**Real-world example: Flight analysis**


Consider a travel booking server with a tool called `findBestFlight` that uses sampling to analyze available flights and recommend the optimal choice. When a user asks "Book me the best flight to Barcelona next month," the tool needs AI assistance to evaluate complex trade-offs.

The tool queries airline APIs and gathers 47 flight options. It then requests AI assistance to analyze these options: "Analyze these flight options and recommend the best choice: [47 flights with prices, times, airlines, and layovers] User preferences: morning departure, max 1 layover."

The client initiates the sampling request, allowing the AI to evaluate trade-offs—like cheaper red-eye flights versus convenient morning departures. The tool uses this analysis to present the top three recommendations.


**How it works:**

```
User: "Book the best flight to Barcelona"
          ↓
Server's searchFlights() tool finds 47 options
          ↓
Server says: "I need AI to analyze these 47 options"
(Sampling request)
          ↓
Client asks LLM: "Which flight is best given these criteria?"
          ↓
LLM: "Flight XYZ is best because..."
          ↓
Server uses LLM's analysis to recommend flight
          ↓
User sees recommendation
```

---

## Part 5: Client vs Host - Complete Clarity

### The Confusion Point

Many people confuse MCP Client and MCP Host. Let me clarify definitively.

### Simple Definitions

**MCP Host:**
- The application you interact with
- Manages the overall user experience
- Coordinates multiple clients
- Examples: Claude Desktop, Claude.ai, VSCode, your custom app

**MCP Client:**
- A component created by the host
- Manages ONE connection to ONE server
- Handles the protocol conversation
- Is created by the host, not a separate application

### The Relationship

```
MCP Host (1 per application)
    │
    ├─ MCP Client 1 ──→ Server 1
    ├─ MCP Client 2 ──→ Server 2
    ├─ MCP Client 3 ──→ Server 3
    └─ MCP Client 4 ──→ Server 4

One host manages multiple clients.
Each client talks to exactly one server.
```

### Real Example: Claude Desktop with Multiple Servers

**Scenario:** You're using Claude Desktop and have configured it with 3 MCP servers.

**What happens:**

1. **You launch Claude Desktop** (Host starts)
2. **Claude Desktop reads config.json** and sees 3 servers configured
3. **Claude Desktop creates 3 MCP Clients** (one for each server):
   - Client 1 connects to File System Server (local)
   - Client 2 connects to GitHub Server (local)
   - Client 3 connects to Slack Server (remote)
4. **You ask Claude a question** (you interact with the Host)
5. **Claude Desktop decides** which server(s) it needs
6. **Claude Desktop routes** through the appropriate Client(s)
7. **Each Client** manages its protocol conversation with its Server
8. **Results come back** and Claude Desktop (Host) presents them to you

**Diagram:**

```
┌───────────────────────┐
│  You (User)           │
│  (Asking question)    │
└──────────┬────────────┘
           │
┌──────────▼────────────────────────────────┐
│  Claude Desktop (MCP HOST)                │
│  - Shows UI                               │
│  - Manages LLM context                    │
│  - Coordinates all clients                │
│                                           │
│  "I need files and GitHub info"          │
│  Routes to appropriate clients           │
└──┬────────────────────┬──────────┬───────┘
   │                    │          │
┌──▼──────┐  ┌────────▼──┐  ┌────▼────┐
│ Client 1 │  │ Client 2  │  │ Client 3│
│(Protocol │  │(Protocol  │  │(Protocol│
│ mgmt)    │  │ mgmt)     │  │ mgmt)   │
└──┬──────┘  └────┬──────┘  └────┬────┘
   │              │              │
┌──▼──────────┐  ┌▼──────────┐  ┌▼────────┐
│ File Server │  │GitHub Srv │  │Slack Srv│
│ (data)      │  │ (data)    │  │ (data)  │
└─────────────┘  └───────────┘  └─────────┘
```

### Why This Distinction Matters

**Host-level concerns:**
- "Which servers should I connect to?"
- "How should I display results to the user?"
- "What's my overall strategy?"

**Client-level concerns:**
- "How do I talk to THIS server?"
- "What protocol messages do I send?"
- "How do I handle errors from THIS server?"

### Another Real Example: VSCode IDE

**Scenario:** You're using VSCode as your editor and want MCP integration.

**What happens:**

1. **VSCode** is the MCP Host
2. **VSCode creates MCP Clients for:**
   - File System Server (for file access)
   - Sentry Server (for error tracking)
   - Your custom code analysis server
3. **When you use VSCode**, the Host (VSCode):
   - Receives your input
   - Decides what to do
   - Routes to appropriate Clients
   - Displays results

**VSCode doesn't care** about protocol details. The **Clients handle that.**

### The Critical Understanding

```
Host = Application you use (Claude Desktop, VSCode, etc.)
Client = Invisible protocol handler (one per server)
Server = Data/tool provider
```

**You interact with the Host.**
**The Host creates Clients.**
**The Clients talk to Servers.**
**You never directly interact with Clients or Servers.**

### Checklist for Clarity

After reading this section, you should understand:

- [ ] Host = the application you see
- [ ] Clients = invisible protocol components
- [ ] One host, multiple clients
- [ ] Each client = one server connection
- [ ] Host coordinates, clients communicate
- [ ] You interact with hosts, not clients

---

---

# 🔵 DEVELOPER MODE - Building with MCP

---

## Part 6: Using Local MCP Servers

### What are Local MCP Servers?

Local MCP servers are programs running on your computer that expose functionality to AI applications via the STDIO transport. When Claude Desktop launches them, they run in their own process and maintain a direct connection.

### The Official MCP Servers

Anthropic provides reference implementations of common MCP servers:

1. **Filesystem Server** - Read/write files on your computer
2. **PostgreSQL Server** - Query PostgreSQL databases
3. **Slack Server** - Access Slack workspaces
4. **Google Drive Server** - Access Google Drive files
5. **GitHub Server** - Interact with GitHub repositories
6. **Git Server** - Work with local Git repositories
7. **Puppeteer Server** - Browser automation

### Part 6: Beginner-Friendly: Fast-Track Integration

Before we dive into building servers, let's learn the **easiest possible way** to add them to your AI tools. This method is called **"Zero-Install Integration"** because you don't need to manually clone, download, or build anything.

---

### 🚀 Tutorial 1: The "Everything" Server (Javascript/Node)
*Objective: Give Claude a set of dummy tools (calculator, echo, etc.) to prove your setup works.*

#### **Step 1: Open the Configuration File**
*   **Target Component:** **MCP HOST** (Claude Desktop)
*   **Action:** Press `Win + R`, type `%APPDATA%\Claude\`, and open `claude_desktop_config.json` in a text editor (Notepad, VS Code).
*   **Why:** This file is the "brain center" of the Host. It tells Claude which servers exist and how to start them.

#### **Step 2: Add the Server Command**
*   **Target Component:** **MCP HOST**
*   **Action:** Paste this inside the `"mcpServers": { ... }` section:

```json
"everything": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-everything"]
}
```
*   **What's happening?**
    *   **`npx`**: A tool that runs the server code directly from the npm cloud registry.
    *   **`@modelcontextprotocol/server-everything`**: This is the **MCP SERVER** package. No local folder path is needed!

#### **Step 3: The Handshake**
*   **Target Component:** **MCP CLIENT** (Invisible)
*   **Action:** **RESTART** Claude Desktop completely (Quit from the system tray, then reopen).
*   **Why:** When Claude starts, it creates an internal **MCP Client** for the "everything" server. This Client "shakes hands" with the Server to learn its capabilities.

#### **Step 4: Test in Chat**
*   **Action:** Ask Claude: *"What tools do you have from the 'everything' server?"*
*   **Success:** Claude should list tools like `echo`, `add`, and `long_running_operation`.

---

### 🌐 Tutorial 2: The "Fetch" Server (Python)
*Objective: Give Claude the ability to visit any website and convert it to text for reading.*

#### **Step 1: Install `uv` (Modern Python Manager)**
*   **Target Component:** Your Operating System
*   **Action:** Run this in a terminal (PowerShell):
    `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`
*   **Why:** `uv` is the fastest way to run Python-based **MCP SERVERS**.

#### **Step 2: Update Configuration**
*   **Target Component:** **MCP HOST**
*   **Action:** Add this entry to your `claude_desktop_config.json`:

```json
"fetch": {
  "command": "uvx",
  "args": ["mcp-server-fetch"]
}
```

#### **Step 3: Test and See the Magic**
*   **Target Component:** **MCP SERVER**
*   **Action:** Restart Claude and ask: *"Fetch the content of https://example.com and summarize it."*
*   **Result:** The **Server** fetches the website, the **Client** passes the text to Claude, and the **Host** shows you the summary.

---

### 🧩 Beginner's Component Checklist
To keep it simple, remember who does what during integration:

| Component | Responsibility | Your Action |
| :--- | :--- | :--- |
| **MCP Host** (Claude) | The "User Interface" and Manager. | You edit its `config.json` file. |
| **MCP Client** | The "Internal Messenger" inside Claude. | You **Restart** Claude to trigger this. |
| **MCP Server** | The "worker" that has the actual tools. | You specify it via `npx` or `uvx`. |

---

### 📂 Tutorial 3: The "Local Filesystem" Server (Using Local Installation)
*Objective: Give Claude permission to read and write to a specific folder on YOUR computer using a locally installed MCP server. This is the first step toward "Remote Control" AI.*

#### **Step 1: Create Your MCP Server Infrastructure**
*   **Target Component:** Your Local Computer (D Drive)
*   **Action:** Create this folder structure:
    ```
    D:\mcp-servers\
    ├── filesystem-server/     (will contain the MCP server files)
    └── test-sandbox/          (your "AI Sandbox" - where Claude can read/write)
        └── hello.txt          (sample file with content)
    ```
*   **Why:** Keeping servers and work areas separate is a best practice for security and organization.

#### **Step 2: Set Up the Local Filesystem Server**
*   **Target Component:** **MCP SERVER** installation
*   **Source of the Code:** 
    *   The filesystem server is **open-source** and hosted on GitHub at: `https://github.com/modelcontextprotocol/servers`
    *   Anthropic provides **pre-built packages** on npm at: `https://www.npmjs.com/package/@modelcontextprotocol/server-filesystem`

*   **Option A: Quick Setup (Recommended) — Automatic Download**
    *   **How it works:** `npm install` automatically downloads the compiled server from npm servers and places it in a `node_modules` folder.
    *   **Step-by-step:**
        1. Create the folder: `D:\mcp-servers` (manually create it)
        2. Open **PowerShell** or **Command Prompt** in `D:\mcp-servers`
           ```bash
           cd D:\mcp-servers\
           ```
        3. Initialize a Node.js project:
           ```bash
           npm init -y
           ```
        4. Download and install the server:
           ```bash
           npm install @modelcontextprotocol/server-filesystem
           ```
    *   **What happens:** npm downloads the code from its servers and extracts it to:
        ```
        D:\mcp-servers\
        └── node_modules\
            └── @modelcontextprotocol\
                └── server-filesystem\
                    ├── dist\
                    │   └── index.js (the actual server file)
                    ├── package.json
                    └── (other files)
        ```
    *   **Location of the server file:** `D:\mcp-servers\node_modules\@modelcontextprotocol\server-filesystem\dist\index.js`

*   **Option B: Manual Setup (Advanced) — Clone from GitHub**
    *   **How it works:** You download the source code directly from GitHub and compile/install it locally.
    *   **Step-by-step:**
        1. Create folder: `D:\mcp-servers\filesystem-server`
        2. Open **PowerShell** and clone the repository:
           ```bash
           cd D:\mcp-servers
           git clone https://github.com/modelcontextprotocol/servers.git temp-repo
           ```
        3. Copy the filesystem server specifically:
           ```bash
           xcopy temp-repo\src\filesystem filesystem-server /E /I
           rmdir temp-repo /S /Q
           ```
        4. Install dependencies inside the server folder:
           ```bash
           cd D:\mcp-servers\filesystem-server
           npm install --production
           ```
        5. Build the server (if needed):
           ```bash
           npm run build
           ```
    *   **Resulting structure:**
        ```
        D:\mcp-servers\filesystem-server\
        ├── dist\
        │   └── index.js (the actual server file)
        ├── src\
        ├── package.json
        └── node_modules\ (dependencies)
        ```
    *   **Location of the server file:** `D:\mcp-servers\filesystem-server\dist\index.js`

*   **Recommendation:** Start with **Option A** (it's faster and automatic). Only use Option B if you want to modify the server code.

#### **Step 3: Create Your AI Sandbox**
*   **Target Component:** Your Local Computer
*   **Action:** Create folder `D:\mcp-servers\test-sandbox` and add a file named `hello.txt` with some content:
    ```
    Hello! This is my AI Sandbox.
    Claude can now read and write files here.
    Let's see what we can create together!
    ```
*   **Why:** A **Local Server** needs a specific area to work in for security.

#### **Step 4: Add the Local Server to Config**
*   **Target Component:** **MCP HOST** (`claude_desktop_config.json`)
*   **Action:** Add this to your Claude Desktop config:

```json
"filesystem": {
  "command": "node",
  "args": [
    "D:/mcp-servers/node_modules/@modelcontextprotocol/server-filesystem/dist/index.js",
    "D:/mcp-servers/test-sandbox"
  ]
}
```

**Alternative (if using Option B above):**
```json
"filesystem": {
  "command": "node",
  "args": [
    "D:/mcp-servers/filesystem-server/dist/index.js",
    "D:/mcp-servers/test-sandbox"
  ]
}
```

*   **What's happening?**
    *   **`"command": "node"`**: Runs the server using Node.js directly (not npm).
    *   **First arg (path to server)**: Points to your locally installed filesystem server.
    *   **Second arg (`D:/mcp-servers/test-sandbox`)**: You are giving the **Server** a specific "Scope". It cannot see anything outside this folder!

#### **Step 5: Test and Verify**
*   **Action:** Restart Claude Desktop and ask: *"List the files in my test-sandbox folder and tell me what hello.txt says."*
*   **Then Try:** *"Create a new file called 'summary.txt' that summarizes our conversation so far."*
*   **Result:** Check your `D:\mcp-servers\test-sandbox` folder—the file will physically appear there!
*   **Verify:** You can now manually edit files in this folder, and Claude can see your changes instantly.

---

### 🎯 Practice Challenges for Beginners
Once you have these 3 servers running, try combining them:

1.  **Research & Save:** *"Fetch the content of threejs.org and save a summary of it to my local test-sandbox folder"*
2.  **Verify Setup:** *"Use the 'everything' server to echo 'Hello World' and then write that message into a new file on my computer test-sandbox folder.""*

---

### 🐍 Tutorial 4: Building Your First Custom Server (Python)
*Objective: Instead of using someone else's server, you will write a tiny script to create your own custom tool.*

#### **Step 1: Install the MCP Library**
*   **Target Component:** **MCP SERVER** (Your script)
*   **Action:** Open your terminal (CMD or PowerShell) and run:
    `pip install mcp`
*   **Why:** This gives your Python script the "language" it needs to speak to Claude.

#### **Step 2: Create your "Server" Script**
*   **Action:** Create a file named `my_first_server.py` and paste this code:

```python
# /// script
# requires-python = ">=3.10"
# dependencies = ["mcp"]
# ///
import random
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("my-starter-server")

SUPERHERO_FACTS = [
    "Batman's secret identity is Bruce Wayne!",
    "Superman is vulnerable to kryptonite.",
    "Wonder Woman has the Lasso of Truth."
]

@mcp.tool()
def get_superhero_fact() -> str:
    """Get a random fact about a superhero"""
    return random.choice(SUPERHERO_FACTS)

if __name__ == "__main__":
    mcp.run()

```

#### **Step 3: Point Claude to your script**
*   **Target Component:** **MCP HOST**
*   **Action:** Add this to your `claude_desktop_config.json`:

```json
"my-starter": {
      "command": "uv",
      "args": ["run", "D:/mcp-servers/my-starter-server/my_first_server.py"]
    }
```

#### **Step 4: Test Your Code**
*   **Action:** Restart Claude and ask: *"Give me a superhero fact using your starter server."*
*   **Success:** Claude will execute your Python code and report the fact back to you!

---

### 🔍 Understanding the Starter Server — Tools, Resources & Prompts Explained

The code above already contains all three MCP primitives. This section walks through each one — **what it does, why it's built that way, and how to test it**.

---

#### 🛠️ Tools — What They Are & Why

**A tool is a function the AI can *call* to take an action or compute something.**
The AI cannot run code on its own — tools are how you give it that ability.

Two rules every tool follows:
1. Decorated with `@mcp.tool()` so the MCP server registers it.
2. Has a docstring — the AI reads the docstring to decide *when* to call it.

```python
# WHY: The AI has no access to real-time randomness.
# Giving it this tool means it can fetch a fact on demand instead of
# making one up from training data — which would be unreliable.

@mcp.tool()
def get_superhero_fact() -> str:
    """Get a random fun fact about a superhero."""
    facts = [
        "Batman has no superpowers — just intellect and training.",
        "Superman is vulnerable to kryptonite.",
        "Spider-Man's web-shooters were invented by Peter Parker himself.",
        "Wonder Woman's lasso forces anyone caught in it to tell the truth.",
        "The Flash can run faster than the speed of light.",
    ]
    return random.choice(facts)
```

```python
# WHY: Tools can accept parameters — here, two integers.
# The AI reads the parameter names and types to know what to pass.
# Returning a formatted string (not just a number) gives the AI
# a human-readable result it can relay directly to the user.

@mcp.tool()
def add_numbers(a: int, b: int) -> str:
    """Add two numbers together and return the result."""
    result = a + b
    return f"{a} + {b} = {result}"
```

**Key insight:** Tools return *strings*. The AI reads that string as the result. Always return something descriptive — not just a raw value.

---

#### 📖 Resources — What They Are & Why

**A resource is data the AI can *read* via a URI — like opening a file or a webpage.**
Resources don't take actions. They expose information the AI can pull into context.

Two URI patterns are shown here:

```python
# WHY: A static URI (no variables) works like a "read the whole table" query.
# The AI calls this when it needs to see all available heroes at once.
# Notice the URI scheme: superheroes://list — you invent the scheme name,
# it just needs to be consistent and descriptive.

@mcp.resource("superheroes://list")
def list_superheroes() -> str:
    """Returns the full list of superheroes in our database."""
    lines = ["SUPERHERO DATABASE", "=" * 30]
    for key, hero in SUPERHERO_DATABASE.items():
        lines.append(f"- {hero['name']} | Power: {hero['power']} | City: {hero['city']}")
    return "\n".join(lines)
```

```python
# WHY: A parameterized URI ({hero_id}) lets the AI fetch ONE record
# without loading the entire dataset. This is more efficient and mirrors
# how REST APIs work: /superheroes/batman vs. /superheroes.
# The {hero_id} segment becomes a function argument automatically.

@mcp.resource("superheroes://{hero_id}")
def get_superhero(hero_id: str) -> str:
    """Returns details about a specific superhero by their ID."""
    hero = SUPERHERO_DATABASE.get(hero_id.lower())
    if not hero:
        return f"Hero '{hero_id}' not found. Try: batman, superman, spiderman"
    return (
        f"Name  : {hero['name']}\n"
        f"Power : {hero['power']}\n"
        f"City  : {hero['city']}"
    )
```

**Key insight:** Tools *act*, resources *read*. If it changes data → tool. If it just returns data → resource.

---

#### 🗣️ Prompts — What They Are & Why

**A prompt is a reusable instruction template the AI loads to adopt a specific role or style.**
Instead of typing a long system prompt every time, you save it as a named preset.

```python
# WHY: This locks the AI into a specific teaching persona.
# The `hero_name` parameter is injected at runtime — the same template
# works for Batman, Superman, or any hero the user asks about.
# Without this prompt, the AI might explain heroes inconsistently.

@mcp.prompt()
def superhero_teacher(hero_name: str) -> str:
    """A prompt that makes the AI explain a superhero like a teacher."""
    return (
        f"You are an enthusiastic comic-book teacher. "
        f"Explain everything about {hero_name} in simple terms "
        f"as if teaching a 10-year-old. Use fun facts and analogies."
    )
```

```python
# WHY: A two-parameter prompt shows that prompts can take multiple inputs.
# The template structures the AI's response — covering powers, weaknesses,
# personality, and a winner — so every comparison follows the same format.
# This is useful when you need *consistent* output shape across many calls.

@mcp.prompt()
def compare_heroes(hero_one: str, hero_two: str) -> str:
    """A prompt to compare two superheroes side by side."""
    return (
        f"Compare {hero_one} and {hero_two} as superheroes. "
        f"Cover: powers, weaknesses, personality, and who would win in a fight. "
        f"Be fair and detailed."
    )
```

**Key insight:** Prompts don't call tools or fetch data — they shape *how* the AI thinks and responds. Think of them as named system-prompt presets.

---

#### ✅ How to Test the Starter Server

Three methods, from quickest to most realistic:

**Method A — Python sanity check** (5 seconds, confirms no syntax errors)
```bash
uv run my_first_server.py
# No output = good. The server starts and waits. Ctrl+C to stop.
```

**Method B — MCP Inspector** (interactive browser UI, best for development)
```bash
npx @modelcontextprotocol/inspector uv run my_first_server.py
# Opens a localhost browser UI. Call any tool/resource/prompt
# and inspect the raw JSON request and response.
```

**Method C — Claude Desktop** (real AI integration, as configured in your `claude_desktop_config.json`)
```json
"my-starter": {
  "command": "uv",
  "args": ["run", "D:/mcp-servers/my-starter-server/my_first_server.py"]
}
```
Then ask Claude: *"Give me a superhero fact"* or *"What do you know about batman?"*

---

**What to verify per primitive:**

| What to call | Primitive type | Expected result |
|---|---|---|
| `get_superhero_fact()` | Tool | One of the 5 hardcoded facts |
| `add_numbers(3, 7)` | Tool | `"3 + 7 = 10"` |
| `superheroes://list` | Resource | All 3 heroes with power + city |
| `superheroes://batman` | Resource | Batman's name, power, city |
| `superheroes://thor` | Resource | "Hero 'thor' not found..." |
| `superhero_teacher("Superman")` | Prompt | Teacher-persona instruction string |
| `compare_heroes("Batman","Superman")` | Prompt | Comparison instruction string |

---

### 🧩 Recap of the "Local" Hierarchy
This tutorial path took you from User to Configurator to Developer:

1.  **Level 1 (Everything):** Running cloud code locally via `npx`.
2.  **Level 2 (Filesystem):** Connecting cloud code to your local files.
3.  **Level 3 (My First Server):** Writing your own code to give Claude custom tools.

---

### 🔍 How to See What's Happening (Logs)
If things aren't working, you need to look at the **MCP Client's** logs inside the **Host**.

1.  **Open Logs Folder:** In Claude Desktop, go to:
    `%APPDATA%\Claude\logs\`
2.  **Look for `mcp.log`:** This file records every "Handshake" and every tool call.
3.  **Common Beginner Errors:**
    *   **"Command not found":** Usually means Python or Node isn't in your System PATH.
    *   **"Path not found":** You likely used a relative path (like `./script.py`) instead of an absolute one (like `C:/Users/...`).
    *   **"JSON Error":** Missing a comma `,` between server entries in your `config.json`.

---

### Managing Multiple Servers

You can connect many servers at once:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": ["/path/to/filesystem/dist/index.js"]
    },
    "git": {
      "command": "node",
      "args": ["/path/to/git/dist/index.js"]
    },
    "postgres": {
      "command": "node",
      "args": ["/path/to/postgres/dist/index.js"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/db"
      }
    },
    "slack": {
      "command": "node",
      "args": ["/path/to/slack/dist/index.js"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-..."
      }
    }
  }
}
```

### Real-World Use Case: Development Workflow

**Scenario:** Developer wants AI assistant while coding.

**Setup:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": ["/servers/filesystem/dist/index.js"]
    },
    "git": {
      "command": "node",
      "args": ["/servers/git/dist/index.js"]
    },
    "postgres": {
      "command": "node",
      "args": ["/servers/postgres/dist/index.js"],
      "env": {"DATABASE_URL": "postgresql://..."}
    }
  }
}
```

**What developer can now do:**

```
"Read my database schema from postgres"
↓ Claude uses postgres server

"Show me recent git commits"
↓ Claude uses git server

"Create a new function in src/utils.js"
↓ Claude uses filesystem server

"Explain the database relationship between users and orders"
↓ Claude reads schema (postgres) and explains
```

### Common Configuration Options

```json
{
  "command": "node",              // Command to run
  "args": ["/path/to/server.js"], // Arguments for command
  "disabled": false,              // Enable/disable this server
  "autostart": true,              // Start when host launches
  "timeout": 5000,                // Wait 5 seconds for responses
  "env": {                        // Environment variables
    "DATABASE_URL": "...",
    "API_KEY": "..."
  },
  "alwaysAllow": ["tool1"]        // Auto-approve these tools
}
```

### Troubleshooting

**Issue: "Command not found: node"**
- Install Node.js from nodejs.org
- Verify: `node --version`

**Issue: "Module not found"**
- Run: `npm install` in the server directory
- Rebuild: `npm run build`

**Issue: Server not appearing in Claude**
- Check: JSON syntax with `jsonlint config.json`
- Verify: Path is absolute (not ~/path)
- Restart: Claude Desktop completely
- Check logs: `tail -f ~/.config/Claude/logs/mcp-*.log`

---

## Part 7: Building Your Own MCP Server

### Option A: Python Server (Simplest)

**Setup:**

```bash
# Create a new directory for our project
uv init weather
cd weather

# Create virtual environment and activate it
uv venv
.venv\Scripts\activate

# Install dependencies
uv add mcp[cli] httpx

# rename our server file from main.py to weather_server.py
weather.py
```

**Building your server
​
Importing packages and setting up the instance: Weather Server**

```python
from typing import Any

import httpx
from mcp.server.fastmcp import FastMCP

# Initialize FastMCP server
mcp = FastMCP("weather")

# Constants
NWS_API_BASE = "https://api.weather.gov"
USER_AGENT = "weather-app/1.0"
```

**Helper functions:**
Next, let’s add our helper functions for querying and formatting the data from the National Weather Service API:
```python
async def make_nws_request(url: str) -> dict[str, Any] | None:
    """Make a request to the NWS API with proper error handling."""
    headers = {"User-Agent": USER_AGENT, "Accept": "application/geo+json"}
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, timeout=30.0)
            response.raise_for_status()
            return response.json()
        except Exception:
            return None


def format_alert(feature: dict) -> str:
    """Format an alert feature into a readable string."""
    props = feature["properties"]
    return f"""
Event: {props.get("event", "Unknown")}
Area: {props.get("areaDesc", "Unknown")}
Severity: {props.get("severity", "Unknown")}
Description: {props.get("description", "No description available")}
Instructions: {props.get("instruction", "No specific instructions provided")}
"""
```

**Implementing tool execution:**
The tool execution handler is responsible for actually executing the logic of each tool. Let’s add it:
```python
@mcp.tool()
async def get_alerts(state: str) -> str:
    """Get weather alerts for a US state.

    Args:
        state: Two-letter US state code (e.g. CA, NY)
    """
    url = f"{NWS_API_BASE}/alerts/active/area/{state}"
    data = await make_nws_request(url)

    if not data or "features" not in data:
        return "Unable to fetch alerts or no alerts found."

    if not data["features"]:
        return "No active alerts for this state."

    alerts = [format_alert(feature) for feature in data["features"]]
    return "\n---\n".join(alerts)


@mcp.tool()
async def get_forecast(latitude: float, longitude: float) -> str:
    """Get weather forecast for a location.

    Args:
        latitude: Latitude of the location
        longitude: Longitude of the location
    """
    # First get the forecast grid endpoint
    points_url = f"{NWS_API_BASE}/points/{latitude},{longitude}"
    points_data = await make_nws_request(points_url)

    if not points_data:
        return "Unable to fetch forecast data for this location."

    # Get the forecast URL from the points response
    forecast_url = points_data["properties"]["forecast"]
    forecast_data = await make_nws_request(forecast_url)

    if not forecast_data:
        return "Unable to fetch detailed forecast."

    # Format the periods into a readable forecast
    periods = forecast_data["properties"]["periods"]
    forecasts = []
    for period in periods[:5]:  # Only show next 5 periods
        forecast = f"""
{period["name"]}:
Temperature: {period["temperature"]}°{period["temperatureUnit"]}
Wind: {period["windSpeed"]} {period["windDirection"]}
Forecast: {period["detailedForecast"]}
"""
        forecasts.append(forecast)

    return "\n---\n".join(forecasts)
```

**Running the server:**
Finally, let’s initialize and run the server:
```python
def main():
    # Initialize and run the server
    mcp.run(transport="stdio")


if __name__ == "__main__":
    main()
```
**Test it:**
Your server is complete! Run uv run weather.py to start the MCP server, which will listen for messages from MCP hosts.
Let’s now test your server from an existing MCP host, Claude for Desktop.
```bash
# Terminal 1: Run the server
uv run weather.py
# or
python weather.py
# or
mcp dev weather.py

```

**Testing your server with Claude for Desktop:**
- First, make sure you have Claude for Desktop installed. You can install the latest version here. If you already have Claude for Desktop, make sure it’s updated to the latest version.
- We’ll need to configure Claude for Desktop for whichever MCP servers you want to use. 
- To do this, open your Claude for Desktop App configuration at ~/Library/Application Support/Claude/claude_desktop_config.json in a text editor. Make sure to create the file if it doesn’t exist.
```json
{
  "mcpServers": {
    "weather": {
      "command": "uv",
      "args": [
        "--directory",
        "C:\\ABSOLUTE\\PATH\\TO\\PARENT\\FOLDER\\weather",
        "run",
        "weather.py"
      ]
    }
  }
}
```

**This tells Claude for Desktop:**
There’s an MCP server named “weather”
1. To launch it by running uv --directory /ABSOLUTE/PATH/TO/PARENT/FOLDER/weather run weather.py
2. Save the file, and restart Claude for Desktop.

**Test with commands:**
Let’s make sure Claude for Desktop is picking up the two tools we’ve exposed in our weather server. You can do this by looking for the “Add files, connectors, and more /”  icon:
![check cluade connectors - host](../images/claude.png)

After clicking on the plus icon, hover over the “Connectors” menu. You should see the weather servers listed:
![host-claude connectors](../images/claude_connectors.png)

weather mcp server tools:
![alt text](../images/weather_tools.png)

If your server isn’t being picked up by Claude for Desktop, proceed to the Troubleshooting section for debugging tips.
If the server has shown up in the “Connectors” menu, you can now test your server by running the following commands in Claude for Desktop:
1. What’s the weather in Sacramento?
2. What are the active weather alerts in Texas?
![weather forecast tool](../images/forecast_tool.png)
![alt text](../images/get_alerts.png)

### Since this is the US National Weather service, the queries will only work for US locations.
​
**What’s happening under the hood:**
When you ask a question:
1. The client sends your question to Claude
2. Claude analyzes the available tools and decides which one(s) to use
3. The client executes the chosen tool(s) through the MCP server
4. The results are sent back to Claude
5. Claude formulates a natural language response
6. The response is displayed to you!


### Option B: TypeScript/Node.js Server

**Setup:**

```bash
mkdir my-weather-server
cd my-weather-server

npm init -y
npm install @modelcontextprotocol/sdk
npm install typescript ts-node --save-dev

# Create TypeScript config
npx tsc --init
```

**Complete Working Example:**

```typescript
// src/index.ts
import {
  Server,
  StdioServerTransport,
} from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server({
  name: "weather-service",
  version: "1.0.0",
});

const WEATHER_DATA: Record<string, any> = {
  "London": { temp: 59, condition: "Cloudy", humidity: 80 },
  "Paris": { temp: 62, condition: "Rainy", humidity: 85 },
  "Tokyo": { temp: 78, condition: "Sunny", humidity: 60 },
};

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_weather",
        description: "Get current weather for a city",
        inputSchema: {
          type: "object" as const,
          properties: {
            city: {
              type: "string",
              description: "City name",
            },
          },
          required: ["city"],
        },
      },
      {
        name: "list_cities",
        description: "List all available cities",
        inputSchema: {
          type: "object" as const,
          properties": {},
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const city = (args?.city as string)?.toLowerCase();

  if (name === "get_weather") {
    const weatherKey = Object.keys(WEATHER_DATA).find(
      (k) => k.toLowerCase() === city
    );
    
    if (!weatherKey || !WEATHER_DATA[weatherKey]) {
      return {
        content: [
          {
            type: "text" as const,
            text: `City not found`,
          },
        ],
        isError: true,
      };
    }

    const weather = WEATHER_DATA[weatherKey];
    const response = `${weatherKey} Weather:\n• Temp: ${weather.temp}°F\n• Condition: ${weather.condition}`;
    
    return {
      content: [{ type: "text" as const, text: response }],
    };
  }

  if (name === "list_cities") {
    return {
      content: [
        {
          type: "text" as const,
          text: `Available: ${Object.keys(WEATHER_DATA).join(", ")}`,
        },
      ],
    };
  }

  return {
    content: [{ type: "text" as const, text: `Unknown tool: ${name}` }],
    isError: true,
  };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather server running");
}

main().catch(console.error);
```

**Build and run:**

```bash
npx tsc
node dist/index.js
```

### Real-World Example: Stock Price Server

```python
# stock_server.py - More sophisticated example

import asyncio
from mcp.server import Server
from mcp.types import Tool, TextContent, ToolResult, Resource
import json

server = Server("stock-service")

# Real stock data (in production, would call API)
STOCKS = {
    "AAPL": {"price": 150.25, "change": 2.5, "pe": 28.5},
    "GOOGL": {"price": 140.50, "change": -1.2, "pe": 32.1},
    "MSFT": {"price": 380.75, "change": 3.1, "pe": 45.2},
}

# Expose tools AND resources
@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="get_stock_price",
            description="Get current price for a stock",
            inputSchema={
                "type": "object",
                "properties": {
                    "ticker": {"type": "string", "description": "Stock ticker"}
                },
                "required": ["ticker"]
            }
        ),
        Tool(
            name="search_stocks",
            description="Search for stocks by partial name",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string"}
                },
                "required": ["query"]
            }
        )
    ]

@server.list_resources()
async def list_resources():
    return [
        Resource(
            uri="stocks://market-summary",
            name="Market Summary",
            description="Overall stock market data",
            mimeType="application/json"
        )
    ]

@server.read_resource()
async def read_resource(uri: str):
    if uri == "stocks://market-summary":
        summary = {
            "total_stocks": len(STOCKS),
            "average_change": sum(s["change"] for s in STOCKS.values()) / len(STOCKS),
            "stocks": list(STOCKS.keys())
        }
        return TextContent(
            type="text",
            text=json.dumps(summary, indent=2)
        )
    return TextContent(type="text", text="Unknown resource")

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "get_stock_price":
        ticker = arguments.get("ticker", "").upper()
        if ticker not in STOCKS:
            return ToolResult(
                content=[TextContent(type="text", text=f"Stock {ticker} not found")],
                isError=True
            )
        
        stock = STOCKS[ticker]
        text = f"{ticker}: ${stock['price']} ({stock['change']:+.2f}%)"
        return ToolResult(content=[TextContent(type="text", text=text)])
    
    elif name == "search_stocks":
        query = arguments.get("query", "").upper()
        matches = [t for t in STOCKS.keys() if query in t]
        result = f"Found: {', '.join(matches) if matches else 'No matches'}"
        return ToolResult(content=[TextContent(type="text", text=result)])
    
    return ToolResult(
        content=[TextContent(type="text", text="Unknown tool")],
        isError=True
    )

if __name__ == "__main__":
    asyncio.run(server.run_stdio())
```

### Connecting to Claude Desktop

1. Get absolute path: `realpath /path/to/server.py`
2. Add to config.json:
```json
{
  "myserver": {
    "command": "python",
    "args": ["/absolute/path/to/server.py"]
  }
}
```
3. Restart Claude Desktop
4. Test in chat

---

## Part 8: Building Custom MCP Clients

### What is a Custom Client?

A custom MCP client is an application you build that connects to MCP servers, instead of using Claude Desktop.

### Client with Claude API

```python
# claude_client.py
import asyncio
from mcp import ClientSession
from mcp.client.stdio import StdioClientTransport
from anthropic import Anthropic

class MCPClient:
    def __init__(self, server_cmd: str, server_args: list, api_key: str):
        self.server_cmd = server_cmd
        self.server_args = server_args
        self.claude = Anthropic(api_key=api_key)
        self.session = None
        self.history = []
    
    async def connect(self):
        """Connect to MCP server"""
        transport = StdioClientTransport(
            command=self.server_cmd,
            args=self.server_args
        )
        self.session = ClientSession(transport)
        await self.session.initialize()
        print("✓ Connected to server")
    
    async def get_tools(self):
        """Get available tools"""
        response = await self.session.list_tools()
        return response.tools
    
    async def call_tool(self, name: str, args: dict):
        """Execute a tool"""
        result = await self.session.call_tool(name=name, arguments=args)
        return result.content[0].text if result.content else ""
    
    async def chat(self, user_msg: str):
        """Have a conversation"""
        self.history.append({"role": "user", "content": user_msg})
        
        # Get tools
        tools = await self.get_tools()
        tools_schema = [
            {
                "name": tool.name,
                "description": tool.description,
                "input_schema": tool.inputSchema
            }
            for tool in tools
        ]
        
        # Call Claude
        response = self.claude.messages.create(
            model="claude-opus-4-20250514",
            max_tokens=4096,
            tools=tools_schema,
            messages=self.history
        )
        
        # Process response
        result = ""
        for block in response.content:
            if hasattr(block, 'text'):
                result += block.text
            elif block.type == "tool_use":
                tool_result = await self.call_tool(block.name, block.input)
                result += f"\n[{block.name}: {tool_result}]\n"
        
        self.history.append({"role": "assistant", "content": result})
        return result
    
    async def disconnect(self):
        """Close connection"""
        if self.session:
            await self.session.close()

# Usage
async def main():
    client = MCPClient(
        server_cmd="python",
        server_args=["/path/to/weather_server.py"],
        api_key="sk-..."
    )
    
    await client.connect()
    try:
        response = await client.chat("What's the weather in London?")
        print(f"Claude: {response}")
    finally:
        await client.disconnect()

if __name__ == "__main__":
    asyncio.run(main())
```

### Running Your Custom Client

```bash
# Set API key
export ANTHROPIC_API_KEY="sk-..."

# Run client
python claude_client.py

# Type: What's the weather in Paris?
# Claude asks the server, gets data, provides answer
```

### Client with Gemini API

```python
# gemini_client.py
import asyncio
from mcp import ClientSession
from mcp.client.stdio import StdioClientTransport
import google.generativeai as genai

class GeminiMCPClient:
    def __init__(self, server_cmd: str, server_args: list, api_key: str):
        self.server_cmd = server_cmd
        self.server_args = server_args
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash')
        self.session = None
    
    async def connect(self):
        transport = StdioClientTransport(
            command=self.server_cmd,
            args=self.server_args
        )
        self.session = ClientSession(transport)
        await self.session.initialize()
    
    async def get_tools(self):
        response = await self.session.list_tools()
        return response.tools
    
    async def call_tool(self, name: str, args: dict):
        result = await self.session.call_tool(name=name, arguments=args)
        return result.content[0].text if result.content else ""
    
    async def chat(self, user_msg: str):
        tools = await self.get_tools()
        # Format for Gemini (note: Gemini tool calling is evolving)
        response = self.model.generate_content(user_msg)
        return response.text
    
    async def disconnect(self):
        if self.session:
            await self.session.close()

# Usage
async def main():
    client = GeminiMCPClient(
        server_cmd="python",
        server_args=["/path/to/weather_server.py"],
        api_key="..."
    )
    await client.connect()
    try:
        response = await client.chat("Tell me about weather")
        print(f"Gemini: {response}")
    finally:
        await client.disconnect()

asyncio.run(main())
```

---

## Part 9: Remote Servers & Cloud Deployment

### Local Server vs Remote Server

**Local Server:**
- Runs on your computer
- Uses STDIO transport (direct pipes)
- Single client connection
- Fast, no network overhead

**Remote Server:**
- Runs on cloud/server
- Uses HTTP transport
- Multiple client connections
- Needs network, authentication

### Creating an HTTP-Based Remote Server

```python
# remote_server.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="Weather MCP Server")

class ToolCall(BaseModel):
    tool_name: str
    arguments: dict

WEATHER_DATA = {
    "London": {"temp": 59, "condition": "Cloudy"},
    "Paris": {"temp": 62, "condition": "Rainy"},
    "Tokyo": {"temp": 78, "condition": "Sunny"},
}

@app.get("/mcp/tools")
async def list_tools():
    return {
        "tools": [
            {
                "name": "get_weather",
                "description": "Get weather for a city",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "city": {"type": "string"}
                    }
                }
            }
        ]
    }

@app.post("/mcp/call-tool")
async def call_tool(request: ToolCall):
    if request.tool_name == "get_weather":
        city = request.arguments.get("city")
        if city not in WEATHER_DATA:
            raise HTTPException(status_code=404, detail="City not found")
        
        data = WEATHER_DATA[city]
        return {
            "result": f"{city}: {data['temp']}°F, {data['condition']}"
        }
    
    raise HTTPException(status_code=404, detail="Tool not found")

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
```

### Deploying to Google Cloud Run

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8080
CMD ["uvicorn", "remote_server:app", "--host", "0.0.0.0", "--port", "8080"]
```

```bash
# Deploy
gcloud run deploy weather-server \
  --source . \
  --platform managed \
  --region us-central1

# Result: https://weather-server-abc123.a.run.app
```

### Building a Client for Remote Server

```python
# remote_client.py
import asyncio
import aiohttp
from anthropic import Anthropic

class RemoteServerClient:
    def __init__(self, server_url: str):
        self.server_url = server_url.rstrip("/")
        self.claude = Anthropic()
    
    async def connect(self):
        """Verify server is reachable"""
        async with aiohttp.ClientSession() as session:
            async with session.get(f"{self.server_url}/health") as resp:
                if resp.status != 200:
                    raise ConnectionError("Server not responding")
        print("✓ Connected to remote server")
    
    async def get_tools(self):
        """Fetch tools from remote server"""
        async with aiohttp.ClientSession() as session:
            async with session.get(
                f"{self.server_url}/mcp/tools"
            ) as resp:
                data = await resp.json()
                return data.get("tools", [])
    
    async def call_tool(self, name: str, args: dict):
        """Execute tool on remote server"""
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.server_url}/mcp/call-tool",
                json={"tool_name": name, "arguments": args}
            ) as resp:
                if resp.status != 200:
                    return f"Error: {resp.status}"
                data = await resp.json()
                return data.get("result", "")
    
    async def chat(self, message: str):
        """Chat using remote server"""
        tools = await self.get_tools()
        tools_schema = [
            {
                "name": tool["name"],
                "description": tool["description"],
                "input_schema": tool.get("inputSchema")
            }
            for tool in tools
        ]
        
        # Call Claude with remote tools
        response = self.claude.messages.create(
            model="claude-opus-4-20250514",
            max_tokens=4096,
            tools=tools_schema,
            messages=[{"role": "user", "content": message}]
        )
        
        # Process tool calls
        result = ""
        for block in response.content:
            if hasattr(block, 'text'):
                result += block.text
            elif block.type == "tool_use":
                tool_result = await self.call_tool(block.name, block.input)
                result += f"\n[Tool result: {tool_result}]\n"
        
        return result

# Usage
async def main():
    client = RemoteServerClient(
        "https://weather-server-abc123.a.run.app"
    )
    
    await client.connect()
    response = await client.chat("What's the weather in Barcelona?")
    print(f"Claude: {response}")

asyncio.run(main())
```

---

## Part 10: VSCode Integration & Marketplace

### Creating a VSCode Extension with MCP

```bash
# Generate extension
npm install -g yo generator-code
yo code

# Choose: TypeScript, extension name "mcp-extension"
```

```typescript
// src/extension.ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('MCP Extension activated');
    
    // Register a command
    let disposable = vscode.commands.registerCommand(
        'mcp.listTools',
        async () => {
            vscode.window.showInformationMessage(
                'MCP server tools available!'
            );
        }
    );
    
    context.subscriptions.push(disposable);
}

export function deactivate() {}
```

### Publishing to Marketplace

```bash
# Install vsce tool
npm install -g vsce

# Login to marketplace
vsce login [publisher-name]

# Create publisher at https://marketplace.visualstudio.com

# Package extension
vsce package

# Publish
vsce publish
```

---

---

# 🔴 DEBUG MODE - Troubleshooting & Optimization

---

## Part 11: Available SDKs

MCP SDKs are available for multiple languages:

**Python SDK**
- Package: `mcp`
- Install: `pip install mcp`
- Status: Fully implemented
- Best for: Quick prototyping

**TypeScript/JavaScript SDK**
- Package: `@modelcontextprotocol/sdk`
- Install: `npm install @modelcontextprotocol/sdk`
- Status: Fully implemented
- Best for: Production systems

**C# (.NET) SDK**
- Status: Available
- Best for: Enterprise .NET applications

**Java SDK**
- Status: Available
- Best for: Enterprise Java applications

---

## Part 12: MCP Inspector Tool

The MCP Inspector is a developer tool for debugging and testing MCP servers.

**What it does:**
- Test server connections
- Manually call tools
- View server capabilities
- Debug protocol messages
- Test resource access

**Installation:**

```bash
npm install -g @modelcontextprotocol/inspector
```

**Usage:**

```bash
# Start inspector
mcp-inspector

# Opens web UI at http://localhost:3000

# Then configure your server in the UI:
# Command: python
# Args: ["/path/to/server.py"]

# Click "Connect" and test tools manually
```

---

## Part 13: Security & Best Practices

### Key Security Principles

1. **Never hardcode secrets**
   ```python
   # Bad
   API_KEY = "sk-abc123"
   
   # Good
   API_KEY = os.getenv("API_KEY")
   if not API_KEY:
       raise ValueError("API_KEY not set")
   ```

2. **Validate all inputs**
   ```python
   # Bad
   db.query(f"SELECT * FROM users WHERE id={user_id}")
   
   # Good
   db.query("SELECT * FROM users WHERE id=?", [user_id])
   ```

3. **Implement rate limiting**
   ```python
   from ratelimit import limits, sleep_and_retry
   
   @sleep_and_retry
   @limits(calls=10, period=60)  # 10 calls per minute
   async def call_tool(name: str, args: dict):
       # Tool implementation
   ```

4. **Log operations (but not secrets)**
   ```python
   logger.info(f"Tool called: {tool_name}")  # Good
   logger.info(f"API key: {api_key}")         # Bad!
   ```

5. **Use OAuth for authentication**
   ```python
   # Instead of storing passwords/keys directly
   # Use OAuth flows to get temporary tokens
   ```

---

## Part 14: Learning Path & Mastery

### Recommended 30-Day Learning Path

**Week 1: Fundamentals**
- Day 1-2: Read Parts 1-3 (What is MCP, Architecture, Servers)
- Day 3-4: Read Parts 4-5 (Clients, Host vs Client)
- Day 5-7: Set up existing local servers with Claude Desktop

**Week 2: Building**
- Day 1-2: Build simple Python MCP server
- Day 3-4: Add 5+ tools to your server
- Day 5-7: Connect to Claude Desktop and test

**Week 3: Expansion**
- Day 1-3: Build custom client with Claude API
- Day 4-5: Deploy remote server to cloud
- Day 6-7: Implement security practices

**Week 4: Mastery**
- Day 1-2: Build production-ready server
- Day 3-4: Create VSCode extension
- Day 5-7: Contribute to community or build portfolio project

### Project Ideas

**Beginner:**
- Weather service server
- Todo list with file storage
- Stock ticker server

**Intermediate:**
- Database query interface
- GitHub repository browser
- Document analyzer

**Advanced:**
- Multi-server enterprise system
- AI-powered research assistant
- DevOps automation platform

---

## Conclusion

You now have comprehensive knowledge of:

✅ What MCP is and why it matters
✅ MCP architecture and components
✅ How servers expose capabilities
✅ How clients consume capabilities
✅ The difference between hosts and clients
✅ How to use existing servers
✅ How to build your own servers
✅ How to build custom clients
✅ How to deploy remote servers
✅ How to extend VSCode
✅ Security best practices
✅ A structured learning path

### Next Action

**Choose your path:**

1. **Curious learner:** Set up a local MCP server with Claude Desktop
2. **Hands-on builder:** Create your first Python MCP server
3. **Integration seeker:** Build a custom client
4. **Enterprise developer:** Deploy a remote server

Start with what interests you most. The learning compounds as you build.

---

**Happy learning and building!** 🚀
