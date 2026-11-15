# T. A. PAI MANAGEMENT INSTITUTE (TAPMI), BENGALURU
## Technology Literacy for Managers (TLM) | BBA (Hons.) | Semester 1
### Session 35 [Self-Learning & Activity] — Activity Worksheet (Student Copy)
**AI Studio Preparation: Finalise your AI agent, build your client brief, and plan your five-act film**

---

## PART 1 — GROUP DECISIONS (20 minutes)

| Field | Completed Group Answer |
|---|---|
| **Group number and group members (all names):** | **Group 4 (Section D)**<br>• Priyanshu Raj<br>• *(Insert remaining group member names)* |
| **Our assigned business function and problem (from Group Allocation sheet):** | **Business Function:** Customer Service & Post-Purchase Experience in Indian D2C Fashion E-Commerce.<br>**Assigned Problem:** Excessive rate of size-related returns (25%–35%) in women's ethnic apparel caused by non-stretch handloom fabrics (cambric cotton, silk), inconsistent vanity sizing, and absence of pre-purchase fit intelligence, leading to heavy reverse logistics losses. |
| **Evidence that this problem is still largely unsolved — one source or observation:** | **Industry Evidence:** According to the *Incisiv & Bain & Co. Indian D2C Fashion Report (2024–2025)*, Indian fashion e-commerce return rates average 25%–35%, with **65%–70% of all returns directly driven by size and fit dissatisfaction**. Traditional size charts only display static S/M/L measurement labels without indicating physical garment ease allowance or textile stiffness (e.g., 0% elastane in pure cotton). This forces customers to practice "bracket buying" (ordering sizes M and L simultaneously and returning one), compounding delivery friction. |
| **Our AI agent — in one sentence, the goal it pursues and the actions it takes on its own:** | **FitBack-AI** is an intelligent customer service agent that **prevents** avoidable fit-related returns before purchase by deterministically matching customer measurements against flat-table garment specs, **recovers** lost revenue through automated 1-click size exchanges, and **learns** from aggregated return telemetry to propose human-verified size-chart corrections. |
| **The problem in business terms — who suffers, in what situation, and what it costs today (₹ or %):** | **Who Suffers:** Online ethnic-wear shoppers (experience anxiety, poor fit, and return inconvenience) and D2C fashion brands (suffer operating margin erosion).<br>**In What Situation:** When a customer purchases a non-stretch woven kurta in their standard vanity size (e.g., Size M), but upon trying it on at home finds the bust and shoulders uncomfortably tight when seated.<br>**What It Costs Today:** Reverse logistics, forward courier shipping, return inspection, repackaging, and seasonal inventory markdown cost **₹250 to ₹350 per returned garment**. For a growing D2C brand processing 1,000 orders/month with 100 size-related returns, this causes **₹25,000 to ₹35,000 in monthly direct cash loss** (₹3,00,000+ annually) plus customer churn. |

---

## PART 2 — BUILD YOUR ONE-PAGE CLIENT BRIEF (20 minutes)

### Step 1 — Content for Client Brief

```text
================================================================================
FITBACK-AI: CLIENT BRIEF
Group 4 • Customer Service | TLM Project Section D | TAPMI Bengaluru
Tagline: PREVENT. RECOVER. LEARN.
================================================================================

1. WHAT IT IS
FitBack-AI is an intelligent customer-service and fit-management agent for Indian D2C ethnic-wear brands that prevents avoidable sizing returns before purchase, recovers revenue through automated size exchanges, and continuously refines size charts using aggregated return feedback.

2. THE PROBLEM AND ITS BUSINESS COST
Online ethnic-wear shoppers cannot physically try on garments, while non-stretch handloom fabrics (such as pure cambric cotton and chanderi silk) and inconsistent vanity sizing cause frequent upper-body tightness. Consequently, D2C fashion brands suffer 20% to 35% return rates, bleeding an estimated ₹250 to ₹350 in forward shipping, reverse courier pickup, quality inspection, and inventory markdown for every returned unit. For a growing retailer processing 1,000 monthly orders, this causes ₹25,000 to ₹35,000 in monthly direct operating loss plus permanent customer churn.

3. HOW THE AGENT WORKS
• What It Knows (RAG): Retrieves grounded knowledge from garment flat-table specification sheets (bust/waist/hip cm), fabric elasticity guidelines (0% elastane cambric rules), ISO 8559 anthropometric comfort allowances, and brand return policies.
• What It Connects To (MCP): Connects seamlessly through Model Context Protocol (MCP) tool integrations to Customer CRM (consent & measurements), Order Management (OMS), warehouse inventory stock, and logistics dispatch (BlueDart pickup).
• What It Does (Deterministic Actions): Mathematically compares body measurements with garment flat specs to recommend sizes with 94% confidence, provisions 1-click doorstep size replacements, and clusters return reasons to recommend size-chart corrections.

4. SAFEGUARDS AND RESPONSIBLE AI LIMITS
FitBack-AI recommendations are strictly advisory and never restrict a customer’s unconditional right to select a full refund under the 14-day policy. Furthermore, the AI is architecturally prohibited from automatically publishing size-chart changes; every pattern revision must be verified and authorized by a human pattern master (Quality Manager).
================================================================================
```

### Step 2 — Visual One-Page Client Brief
- **Web / PDF Render Link**: Open `public/client_brief.html` or `video_production/client_brief.html` in your browser.
- **Canva / Copilot layout structure**: Warm Ivory background (`#FAF8F4`), Terracotta accents (`#A85F48`), Charcoal typography (`#242321`), with 4 clean structured bento cards.

---

## PART 3 — FILM STORYBOARD (25 minutes)

| Segment | Duration in Mins | What to show / say | Who is on screen / doing what |
|---|---|---|---|
| **Act 1 — The Pain** | 0:00 – 0:40 | **Say:** "Online ethnic fashion shopping creates one universal uncertainty: will it actually fit? Priya buys a Size M kurta. It arrives tight around the chest. She files a return. For the business, reverse logistics and handling cost ₹250+ per return."<br>**Show:** Unboxing parcel, trying on tight kurta, courier pickup, warehouse return pile. On-screen: *"ONE WRONG SIZE. MULTIPLE BUSINESS COSTS."* | **Customer Priya:** Browsing mobile app, ordering, trying on tight kurta, expressing disappointment, handing parcel to courier at doorstep. |
| **Act 2 — The Agent Arrives** | 0:40 – 1:20 | **Say:** "Meet FitBack-AI: an intelligent agent built to Prevent, Recover, and Learn. Before purchase, it compares body measurements against flat specs and recommends Size L (+8cm ease, 94% confidence). Post-purchase, it checks stock and automates exchanges. Finally, it clusters return reasons."<br>**Show:** FitBack-AI interface, conversational sizing drawer, ease breakdown card, 1-click exchange confirmation. | **FitBack-AI Agent Interface:** Interactive chat drawer asking for fit preference, live recommendation card, automated warehouse stock check. |
| **Act 3 — Under the Hood (RAG + MCP)** | 1:20 – 2:30 | **Say:** "RAG retrieves brand knowledge from garment specs and fabric guides so the AI answers with grounded facts, avoiding guesses. MCP connects the agent to business systems—CRM, inventory, and logistics—to take real-world action."<br>**Show:** Two animated architecture diagrams: RAG vector retrieval pipeline & MCP enterprise tool bus. On-screen label: *"WORKING PROTOTYPE + SIMULATED INTEGRATIONS."* | **Technical Diagrams:** Information flow animations moving from document chunks $\to$ vector DB $\to$ LLM, and Agent $\to$ MCP $\to$ CRM/Logistics. |
| **Act 4 — Something Goes Wrong** | 2:30 – 3:30 | **Say:** "AI is not perfect. Analyzing 100 return tickets, the agent detects 70% bust tightness but makes a flawed assumption, drafting an erroneous size-chart revision. Quality Manager Sunil Mehta audits the data, catches the error, and rejects it. AI assists; humans stay in control."<br>**Show:** Return analytics, alert badge (*DRAFT: HUMAN AUDIT REQUIRED*), Sunil clicking "REJECT". Audit stamp: *"CHANGE REJECTED — NOT PUBLISHED."* | **Quality Manager Sunil Mehta:** Inspecting dashboard telemetry on laptop, reviewing pattern specs, and hitting the red "Reject" button. |
| **Act 5 — The New Normal** | 3:30 – 4:30 | **Say:** "Priya shops with confidence. For a brand with 1,000 monthly orders, preventing 30 returns saves ₹7,500 in logistics costs, while retaining 20 exchanges preserves ₹30,000 in gross order value. Continuous learning prevents wrong fits and recovers sales."<br>**Show:** Priya wearing a perfectly fitted kurta, Before vs After matrix, ROI calculation. Disclosure: *"ILLUSTRATIVE BUSINESS ESTIMATES — NOT MEASURED RESULTS."* | **Priya:** Confident and smiling in her new kurta. **Brand Team:** Reviewing live ROI metrics and stabilized size charts. |
| **AI tools credits** | 4:30 – 4:45 | **Say:** *(Instrumental music fade out)*<br>**Show:** Clean rolling credits with academic institutional affiliation and exhaustive disclosure of every AI tool used and its specific function. | **Final Slide Screen:** Black background with ivory serif credits, academic disclaimers, and tool manifest. |

---

## Q&A DEFENCE & ACADEMIC AUDIT

### Q&A Defence — Group’s Answer to: *"What happens if your agent is wrong?"*
*(Every group member should know this response for the showcase defense)*:

> **"If FitBack-AI provides an inaccurate size recommendation, the customer’s rights are completely protected: our policy guarantees a complimentary 1-click doorstep size exchange or a 100% refund, with zero friction.**  
> **More importantly, at the system level, the AI is architecturally prohibited from making autonomous production changes. When the agent detects return patterns and suggests a size-chart revision, it is marked strictly as a draft. A human pattern master (Quality Manager) must audit the physical garment measurements and approve the change before it ever goes live to production. AI assists; humans remain in control."**

---

### AI Tools Credits — Mandatory Final Slide Tool Manifest:

| Tool Name | Specific Academic Purpose |
|---|---|
| **Google Antigravity IDE** | End-to-end agent development, full-stack React 19 architecture, and code synthesis. |
| **Microsoft Edge Neural TTS** | Authentic Indian English neural voiceover narration (`en-IN-NeerjaNeural`). |
| **React 19 + TypeScript + Vite** | High-fidelity interactive storefront, fit engine, and admin intelligence dashboard. |
| **Tailwind CSS** | Warm editorial design system tokens (Ivory, Terracotta, Sage, Charcoal). |
| **Recharts** | Interactive business analytics (Donut return charts, 6-month trends, histograms). |
| **FFmpeg & ImageIO** | 1080p Full HD video encoding, filter-complex audio-video muxing, and segment assembly. |
| **Canvas Confetti** | Micro-interaction celebration on simulated checkout and human pattern approval. |
| **NotebookLM / RAG Prototype** | Document grounding simulation for cambric cotton specs and ISO 8559 ease guidelines. |
