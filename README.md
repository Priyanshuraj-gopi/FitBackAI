# FitBackAI — Intelligent Fit Recommendations & Return Management Platform

[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-3.x-22c55e)](https://recharts.org/)
[![Architecture](https://img.shields.io/badge/Architecture-RAG%20%2B%20MCP-A85F48)](https://modelcontextprotocol.io/)
[![Standard](https://img.shields.io/badge/Standard-ISO_8559_Anthropometric-2E5A44)](#)

> **Group 4 — Customer Service | College AI Studio Project**  
> **Brand Name:** FitBackAI  
> **Brand Tagline:** *"Your Perfect Fit. Every Time."*  
> **Supporting Vision:** *"Fashion that understands you."*

---

## 📖 Table of Contents
1. [Executive Summary](#-executive-summary)
2. [The Industry Problem: Sizing & Return Friction in Indian D2C Fashion](#-the-industry-problem-sizing--return-friction-in-indian-d2c-fashion)
3. [The Three Core Objectives: Prevent • Recover • Learn](#-the-three-core-objectives-prevent--recover--learn)
4. [System Architecture & 3-Layer Design](#-system-architecture--3-layer-design)
5. [AES-10B Framework Implementation](#-aes-10b-framework-implementation)
   - [Block 1: Product Architecture](#block-1-product-architecture)
   - [Block 2: UI/UX & Editorial Visual Identity](#block-2-uiux--editorial-visual-identity)
   - [Block 3: Storefront & Customer Journey](#block-3-storefront--customer-journey)
   - [Block 4: Measurement Intelligence & Ease Comparator](#block-4-measurement-intelligence--ease-comparator)
   - [Block 5: Conversational AI Agent (FitBackAI)](#block-5-conversational-ai-agent-fitbackai)
   - [Block 6: Post-Purchase Exchange & Return Management](#block-6-post-purchase-exchange--return-management)
   - [Block 7: RAG Knowledge Base & MCP Tool Orchestration](#block-7-rag-knowledge-base--mcp-tool-orchestration)
   - [Block 8: Business Intelligence & Return Analytics](#block-8-business-intelligence--return-analytics)
   - [Block 9: Size Intelligence Centre & Human Approval Workflow](#block-9-size-intelligence-centre--human-approval-workflow)
   - [Block 10: Responsible AI, Privacy & Business ROI Calculator](#block-10-responsible-ai-privacy--business-roi-calculator)
6. [Complete Intelligence Loop Flowchart](#-complete-intelligence-loop-flowchart)
7. [Fictional Personas & Demonstration Scenarios](#-fictional-personas--demonstration-scenarios)
8. [Installation & Local Execution](#-installation--local-execution)
9. [Functional Acceptance Verification Matrix](#-functional-acceptance-verification-matrix)

---

## 🌟 Executive Summary

**FitBackAI** is a high-fidelity, full-stack, interactive AI-powered D2C ethnic-fashion e-commerce platform and intelligent return-management system developed for **Group 4 — Customer Service**.

Rather than implementing a generic chatbot or a basic size dropdown calculator, FitBackAI delivers an integrated enterprise product ecosystem that connects **customer-facing shopping experiences** with **backend merchandiser business intelligence**. 

The system solves the fundamental sizing mismatch in Indian online retail through a continuous, closed intelligence loop:

$$\text{Customer Body Data} \longrightarrow \text{RAG Knowledge Retrieval} \longrightarrow \text{Deterministic Ease Math} \longrightarrow \text{Personalised Sizing} \longrightarrow \text{Exchange Automation} \longrightarrow \text{Return Analytics} \longrightarrow \text{Human Pattern Master Approval} \longrightarrow \text{Dynamic Size Charts}$$

---

## 🛑 The Industry Problem: Sizing & Return Friction in Indian D2C Fashion

Direct-to-Consumer (D2C) ethnic-wear brands in India face chronic operational headwinds:

1. **Inability to Physically Try Garments**: Customers cannot assess how a garment drapes across the shoulders, bust, waist, or hips before purchasing.
2. **Inconsistent Vanity Sizing**: S, M, L, and XL labels vary drastically across brands, craft clusters, and tailoring houses. A customer who wears "M" in western knits often finds an ethnic cotton kurta severely constricting across the chest.
3. **Inflexible Woven Fabrics**: Traditional Indian handloom textiles—such as 100% cambric cotton, chanderi silks, and raw silks—have **0% elastane stretch**. Without accurate ease allowance, standard movements like sitting or crossing arms cause tearing or severe discomfort.
4. **Devastating Return Economics**: High return rates (20% to 35%) generate forward shipping, reverse shipping, quality inspection, repackaging, and inventory markdown costs of **₹250+ per return**, eroding net operating margins.

---

## 🎯 The Three Core Objectives: Prevent • Recover • Learn

```
               ┌────────────────────────────────────────────────────────┐
               │                      FITBACKAI                         │
               │             CLOSED-LOOP SIZING ECOSYSTEM               │
               └────────────────────────────────────────────────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
   ┌───────────┐                     ┌───────────┐                     ┌───────────┐
   │  PREVENT  │                     │  RECOVER  │                     │   LEARN   │
   │Pre-Purchase│                    │Post-Purchase│                   │Closed-Loop│
   └─────┬─────┘                     └─────┬─────┘                     └─────┬─────┘
         │                                 │                                 │
         ▼                                 ▼                                 ▼
• Customer body cm                • Guided 5-step stepper             • Verbatim return telemetry
• Product flat-table specs        • Live stock reservation            • AI anomaly clustering (70%)
• ISO 8559 ease tolerances        • BlueDart reverse pickup           • AI pattern chart proposal
• 94% confidence recommendations  • Unforced refund choice            • Human pattern master approval
• Prevents 30% avoidable returns  • Salvages ₹30,000+ GMV             • Live chart v1.0 -> v2.0
```

1. **PREVENT (Pre-Purchase Intelligence)**:
   - Eliminates sizing guesswork before checkout by evaluating the customer's bust, waist, and hip against exact flat-table garment measurements.
   - Recommends the optimal size with transparent ease indicators and confidence ratings.
2. **RECOVER (Post-Purchase Exchange Management)**:
   - When a garment does not fit as expected, an automated exchange flow checks live warehouse inventory, reserves replacement stock, and schedules doorstep courier pickup.
   - Retains order value while respecting customer choice (never forces an exchange over an eligible refund).
3. **LEARN (Closed-Loop Pattern Master Feedback)**:
   - Analyzes aggregated return reasons at the SKU level.
   - Detects recurring upper-body tightness patterns and generates actionable size-chart revision proposals.
   - Enforces human-in-the-loop governance: production size charts update only after an authorized human signs off.

---

## 🏗️ System Architecture & 3-Layer Design

FitBackAI strictly separates probabilistic AI reasoning from deterministic business calculations:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ LAYER 1: DIRECTIVE (Standard Operating Procedures & Knowledge SOPs)          │
│ • Technical Garment Specifications (KRT-101, KRT-102, CRD-201)               │
│ • ISO 8559 Anthropometric Ease Standards & Fabric Elasticity Indexes          │
│ • 14-Day Free Exchange & Unconditional Refund Policies                       │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ LAYER 2: ORCHESTRATION (Agentic Decision Making & MCP Tool Layer)            │
│ • FitBackAI Assistant with context awareness (active product & order)        │
│ • Model Context Protocol (MCP) tool execution engine:                        │
│   - get_customer_profile(), get_order_details(), get_product_details()       │
│   - check_inventory(), create_exchange_request(), record_return_reason()     │
│   - get_return_analytics(), propose_size_chart_correction()                  │
│ • Live JSON-RPC execution audit log stream                                   │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ LAYER 3: DETERMINISTIC EXECUTION (Mathematical Engine & State Store)          │
│ • Exact ease subtraction: Garment Flat Dimension - Customer Body Dimension   │
│ • Ease threshold evaluation: Fitted (+2-3cm), Regular (+4-6cm), Relaxed (+8cm)│
│ • Reactive state store with automatic localStorage persistence & demo reset  │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📦 AES-10B Framework Implementation

### Block 1: Product Architecture
The platform is organized into two distinct, interconnected environments connected via an instant demo role switcher in the header:
- **Customer Storefront (`/`)**:
  - `Home`: Editorial hero, brand pillars, featured ethnic collection, FitBackAI promotional banner.
  - `Collection / Shop`: Multi-category filtered catalog (Kurtas, Co-ord Sets, Festive Wear).
  - `Product Detail`: High-res gallery, flat garment table, inline ease calculator, live fit recommendation card.
  - `Find My Fit`: Customer measurement setup and anthropometric silhouette studio.
  - `My Orders`: Post-purchase order tracking, AI fit consultation, 5-step exchange wizard.
  - `Shopping Bag`: Cart with coupon codes (`GROUP4`, `FITBACK`) and simulated checkout.
- **Admin Intelligence Center (`/admin`)**:
  - `Executive Overview`: High-level business KPIs and system architecture flowchart.
  - `Return Analytics`: Interactive Recharts telemetry (Donut chart, monthly trend line, horizontal SKU comparison, size-specific complaint breakdown).
  - `AI Sizing Insights`: Machine learning clustering feed highlighting pattern anomalies.
  - `Size Intelligence & Approvals`: Human-in-the-loop review of AI-suggested size chart corrections.
  - `RAG & MCP Architecture`: Searchable vector document corpus and live MCP tool audit console.
  - `Business ROI Calculator`: Dynamic financial modeling suite with real-time parametric sliders.

---

### Block 2: UI/UX & Editorial Visual Identity
Crafted to look and feel like an elite contemporary Indian ethnic label (reminiscent of FabIndia, Raw Mango, or Nicobar) merged with modern AI technology:
- **Primary Background**: Warm Ivory (`#FAF8F4`)
- **Secondary Background**: Soft Beige (`#F1EDE5`)
- **Primary Typography & High-Contrast Accents**: Deep Charcoal (`#242321`)
- **Primary Accent**: Deep Terracotta (`#A85F48`)
- **Secondary Accent**: Muted Sage Green (`#89947C`)
- **Borders & Dividers**: Soft Neutral Grey (`#E8E3DA`)
- **Success & Trust**: Restrained Forest Green (`#2E5A44`)
- **Typography Pairings**: *Playfair Display* for editorial headings; *Plus Jakarta Sans* for clean, legible interface copy.

---

### Block 3: Storefront & Customer Journey
- **Announcement Bar**: Promotes the AI Fit Assistant with instant launcher triggers.
- **Editorial Split-Screen Hero**: Highlights handcrafted cambric cotton kurtas, value propositions, and an active AI recommendation badge for customer Priya Sharma.
- **Trust Pillars**: Explicitly communicates the Prevent, Recover, and Learn model.
- **Product Catalog**: Realistic Indian pricing in INR (`₹1,499`, `₹1,799`, `₹2,499`), fabric stretch tags, flat measurement previews, and quick-action triggers.

---

### Block 4: Measurement Intelligence & Ease Comparator
The recommendation engine calculates exact physical ease rather than using arbitrary size matching:

$$\text{Garment Ease} = \text{Garment Flat Measurement} - \text{Customer Body Measurement}$$

#### Ease Thresholds Applied:
- **Fitted Silhouette**: $+2 \text{ to } 3\text{ cm}$ ease (accentuates body shape).
- **Regular Silhouette**: $+4 \text{ to } 6\text{ cm}$ ease (balanced everyday comfort and breathability).
- **Relaxed Silhouette**: $+7 \text{ to } 10\text{ cm}$ ease (loose, airy drape).
- **Non-Stretch Woven Penalty**: Pure cambric cotton without elastane requires a strict minimum $+4\text{ cm}$ bust ease for seating and arm movement.

#### Recommendation Output Card:
Displays the recommended size (e.g., Size L), alternative size for a closer fit (Size M), confidence score (94%), ease breakdown per size, and documented fabric caveats.

---

### Block 5: Conversational AI Agent (FitBackAI)
The persistent floating AI assistant provides conversational consultations:
- Context-aware: instantly loads active product specifications and customer measurements.
- Grounded responses: cites authoritative brand documents (e.g., *KRT-101 Technical Specification*, *Cotton Fabric Guide*).
- Live tool execution: displays inspectable MCP tool calls with input arguments and output payloads directly in the chat stream.
- In-chat action cards: allows customers to inspect measurement comparisons or confirm size exchanges without leaving the drawer.

---

### Block 6: Post-Purchase Exchange & Return Management
- Customer order hub displays realistic past orders (e.g., Order `#FW-2026-1042`, Ivory Floral Cotton Kurta in Size M).
- Guided 5-Step Exchange Stepper:
  1. **Fit Issue Selection**: Categorizes root cause (e.g., *Too tight around bust*, *Shoulder fit issue*, *Length issue*).
  2. **Policy Verification**: Confirms order delivery date is within the 14-day window.
  3. **Inventory Check**: Queries warehouse stock for replacement sizes via MCP.
  4. **Resolution Selection**: Preserves customer choice between a **Free Size Exchange** or a **Full Refund**.
  5. **Instant Confirmation**: Generates a simulated tracking reference (`EXC-2026-XXX`), reserves stock, and schedules doorstep pickup.

---

### Block 7: RAG Knowledge Base & MCP Tool Orchestration
Demonstrates enterprise AI engineering through two core paradigms:

#### A. Retrieval-Augmented Generation (RAG)
- Ingests technical garment specifications, fabric care guides, brand fit policies, and return SOPs.
- Features an interactive query sandbox where evaluators can test semantic retrieval against queries such as *"Will this cotton kurta feel restrictive?"*, viewing chunk match scores and synthesized responses.

#### B. Model Context Protocol (MCP)
Implements 8 business tools across CRM, OMS, Warehouse Inventory, Logistics, Telemetry, and Sizing:
1. `get_customer_profile(customer_id)`
2. `get_order_details(order_id)`
3. `get_product_details(sku_or_id)`
4. `check_inventory(sku, size)`
5. `create_exchange_request(order_id, replacement_size, fit_reason)`
6. `record_return_reason(product_id, reason_category, feedback_text)`
7. `get_return_analytics(product_id)`
8. `propose_size_chart_correction(product_id, measurement_type, proposed_delta_cm)`

A live JSON-RPC execution audit stream records every call with parameters, execution duration (ms), and response payloads.

---

### Block 8: Business Intelligence & Return Analytics
A dashboard designed for brand managers and merchandisers:
- **KPI Metrics**: Total Orders (1,000 baseline), Total Returns, Size-Related Share (78.2%), Exchange Retention (68.4%), and Estimated Logistics Savings (₹37,500/mo).
- **Interactive Visualizations (Recharts)**:
  - *Return Reason Distribution*: Donut chart illustrating bust tightness, shoulder pulls, length, and fabric issues.
  - *Monthly Return Trend*: 6-month line chart tracking the drop in returns as FitBackAI recommendations scale.
  - *Product-Level Comparison*: Horizontal bar chart ranking top-returned garments.
  - *Size-Specific Complaints*: Histogram revealing Size M as the primary outlier.
- **Telemetry Stream Table**: Raw customer feedback log updated dynamically whenever exchanges or returns are submitted.

---

### Block 9: Size Intelligence Centre & Human Approval Workflow
Demonstrates closed-loop machine learning with human oversight:
1. Machine learning clustering detects that **70% of returns for SKU KRT-101** cite upper-body constriction.
2. The engine generates Proposal `prop-301`: expand Size M flat bust specification from **92 cm to 94 cm (+2 cm)**.
3. The proposal enters the admin approval queue with complete return evidence.
4. An authorized merchandiser can:
   - **Approve**: Prompts authorization dialog, updates product record to Size Chart **v2.0**, logs the decision to an immutable audit trail, and instantly updates storefront recommendations.
   - **Request Physical Verification**: Dispatches a sample table measurement audit ticket to warehouse QA.
   - **Reject**: Declines the adjustment with recorded justification.

---

### Block 10: Responsible AI, Privacy & Business ROI Calculator

#### Responsible AI & Privacy:
- Body measurements are strictly optional.
- Explicit customer consent toggles for measurement storage and purchase-history cross-referencing.
- Neutral, respectful body language (avoids body-image judgments; focuses on garment ease rather than customer physique).

#### Business Impact & ROI Calculator:
An interactive parametric modeling calculator allows administrators to adjust variables dynamically:
- **Monthly Orders**: 1,000 (adjustable from 200 to 5,000)
- **Overall Return Rate**: 20%
- **Size-Related Share**: 50%
- **Reverse Logistics Cost**: ₹250 per return
- **Prevented Returns**: 30% via pre-purchase sizing
- **Direct Reverse Logistics Savings**: ₹7,500 / month (**₹90,000 / year**)
- **Exchanges Retained Instead of Refunds**: 20 orders / month at ₹1,500 AOV = **₹30,000 / month gross order value retained** (**₹3,60,000 / year**)

> **Financial Accounting Disclosure**: The platform explicitly separates *gross order value retained* from *direct reverse logistics cost savings*. It does not erroneously sum revenue and operational cost savings as "combined profit."

---

## 🔄 Complete Intelligence Loop Flowchart

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CUSTOMER PRE-PURCHASE STAGE                          │
│  Customer enters: Bust 90cm, Waist 77cm, Preferred Fit: Relaxed        │
│                                │                                       │
│                                ▼                                       │
│  FitBackAI calculates ease: Garment 98cm - Body 90cm = +8cm ease       │
│  Recommends Size L (94% confidence)                                    │
└────────────────────────────────┬───────────────────────────────────────┘
                                 │
                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   CUSTOMER POST-PURCHASE STAGE                         │
│  Customer previously bought Size M for KRT-101 (Only 92cm bust)        │
│  Reports fit issue: "Too tight around bust when sitting"              │
│                                │                                       │
│                                ▼                                       │
│  AI Assistant checks warehouse stock -> Reserves Size L                │
│  Generates Exchange EXC-2026-501 (Retains ₹1,499 order)                │
└────────────────────────────────┬───────────────────────────────────────┘
                                 │
                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   ADMIN INTELLIGENCE & LEARNING STAGE                  │
│  Return Telemetry clusters 100 tickets -> 70% Upper-Body Tightness     │
│  AI generates Proposal: KRT-101 Size M Bust 92cm -> 94cm (+2cm)        │
│                                │                                       │
│                                ▼                                       │
│  Admin Sunil Mehta authorizes & signs off on proposal                  │
│  Size Chart Version bumps to v2.0                                      │
└────────────────────────────────┬───────────────────────────────────────┘
                                 │
                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   CLOSED LOOP ACHIEVED                                 │
│  Storefront product page now publishes 94cm for Size M                 │
│  Subsequent recommendations factor in revised pattern baseline         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 👥 Fictional Personas & Demonstration Scenarios

- **Customer Persona**: **Priya Sharma** (`Indiranagar, Bengaluru`)
  - Measurements: Bust 90 cm, Waist 77 cm, Hip 99 cm, Height 165 cm.
  - Fit Preference: Regular to Relaxed.
  - Previous Purchase: Order `#FW-2026-1042` (Ivory Floral Cotton Kurta, Size M).
- **Admin Persona**: **Sunil Mehta** (`Head of Merchandising & Quality`)
  - Role: Pattern master and quality authority overseeing return analytics and size chart approvals.

---

## 💻 Installation & Local Execution

### Prerequisites
- Node.js (v18.0.0 or higher; verified on v24.19)
- npm (v9.0.0 or higher; verified on v11.17)

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd <repository-directory>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized, minified production bundle in `dist/`.

---

## ✅ Functional Acceptance Verification Matrix

| Test Scenario | Steps to Execute in Live Prototype | Expected System Result | Status |
|---|---|---|:---:|
| **Test 1: Sizing Calculation** | Open Product KRT-101, enter Bust `90cm`, choose `Relaxed` fit. | System recommends **Size L** (+8cm ease) with **94% confidence** and explanation. | **PASS** |
| **Test 2: Missing Measurements** | Open Fit Profile, clear measurements, keep usual size `M`. | Recommendation engine falls back to standard baseline with lower confidence (68%). | **PASS** |
| **Test 3: Zero-Stretch Alert** | Open KRT-101 product page. | Highlights "No Stretch" pure cambric cotton and enforces +4cm minimum ease rule. | **PASS** |
| **Test 4: Stock Check** | Open **My Orders** &rarr; Order `#FW-2026-1042` &rarr; Click **Exchange Item**. | System executes MCP `check_inventory` and displays verified warehouse units. | **PASS** |
| **Test 5: Unforced Policy** | In Step 2 of Exchange Stepper, toggle between options. | Customer retains option between **Free Size Exchange** or **Return for Refund**. | **PASS** |
| **Test 6: Return Logging** | Submit fit complaint *"Too tight around bust"*. | Record is logged and synced to Return Analytics telemetry stream. | **PASS** |
| **Test 7: Dynamic Analytics** | Switch to **Admin Mode** &rarr; **Return Analytics**. | Interactive charts update immediately with newly submitted complaint. | **PASS** |
| **Test 8: Anomaly Alert** | Open **Admin** &rarr; **AI Sizing Insights**. | Clustered insight displays: *"70% of recorded complaints relate to upper-body tightness"*. | **PASS** |
| **Test 9: Human Sign-Off** | Open **Admin** &rarr; **Size Intelligence** &rarr; Proposal `prop-301`. | Reviewer enters name, clicks **Sign Off & Commit Update**. | **PASS** |
| **Test 10: Storefront Recalibration** | Switch to **Storefront** &rarr; View KRT-101 table. | Published bust shows **94 cm (Size Chart v2.0)** and subsequent recommendations adapt! | **PASS** |
| **Test 11: RAG Sandbox** | Open **Admin** &rarr; **RAG & MCP Architecture** &rarr; Query *"Will this cotton kurta feel restrictive?"*. | Displays top 2 semantic document matches with similarity scores and grounded answer. | **PASS** |
| **Test 12: Business ROI Sliders** | Open **Admin** &rarr; **Business ROI Calculator** &rarr; Adjust monthly orders to 2,000. | Dynamically computes updated annual logistics savings and retained GMV. | **PASS** |
| **Test 13: Privacy Opt-Out** | Open **Find My Fit** &rarr; Uncheck measurement consent. | Consent revocation is saved and respected across sessions. | **PASS** |
| **Test 14: Concierge Escalation** | In AI Chat Drawer, ask for human styling assistance. | Escalates query with active customer and order context. | **PASS** |

---

## 📜 Academic Evaluation Team & Submission Details
- **Project**: FitBackAI — Intelligent Fit Recommendations & Return Management Platform
- **Course**: AI Studio / TLM Project Section D
- **Group**: Group 4 — Customer Service
- **Institution**: T.A. PAI Management Institute / Manipal Academy of Higher Education (MAHE)
