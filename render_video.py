import os
import subprocess
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

SCENES_DIR = os.path.join("video_production", "scenes")
AUDIO_DIR = os.path.join("video_production", "audio")
OUTPUT_VIDEO = os.path.join("video_production", "FitBack_AI_Final_Video.mp4")

os.makedirs(SCENES_DIR, exist_ok=True)

# Fonts
FONT_TITLE_LARGE = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 64)
FONT_TITLE_MED = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 46)
FONT_HEADLINE = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 36)
FONT_SUBTITLE = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 24)
FONT_BODY = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 20)
FONT_BADGE = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 16)
FONT_MONO = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 18)

def draw_header(draw, act_num, act_title, act_subtitle):
    # Top background bar
    draw.rounded_rectangle([(80, 50), (1840, 150)], radius=20, fill="#242321")
    draw.text((120, 75), f"ACT {act_num}: {act_title.upper()}", fill="#FAF8F4", font=FONT_HEADLINE)
    draw.text((120, 118), act_subtitle.upper(), fill="#E68A6E", font=FONT_BADGE)
    
    # Brand Tag
    draw.rounded_rectangle([(1600, 75), (1800, 125)], radius=12, fill="#A85F48")
    draw.text((1700, 92), "FITBACK-AI", fill="#FFFFFF", font=FONT_BADGE, anchor="mm")

def draw_footer(draw, note="College AI Studio Showcase • Group 4 Customer Service"):
    draw.rounded_rectangle([(80, 980), (1840, 1040)], radius=14, fill="#242321")
    draw.text((120, 1002), note, fill="#FAF8F4", font=FONT_BODY)
    draw.text((1800, 1002), "ISO 8559 Ease Model • RAG + MCP Architecture", fill="#89947C", font=FONT_BODY, anchor="rm")

# --- Scene 1: Act 1 The Pain ---
def create_scene_act1():
    img = Image.new("RGB", (1920, 1080), color="#FAF8F4")
    draw = ImageDraw.Draw(img)
    draw_header(draw, "1", "The Pain", "The Return Crisis in Indian D2C Ethnic Fashion")
    
    # Left Big Card: The Customer Problem
    draw.rounded_rectangle([(80, 180), (980, 950)], radius=24, fill="#FFFFFF", outline="#E8E3DA", width=2)
    draw.rounded_rectangle([(120, 220), (320, 260)], radius=10, fill="#FFF1F0")
    draw.text((220, 240), "THE CUSTOMER DILEMMA", fill="#9B2C2C", font=FONT_BADGE, anchor="mm")
    
    draw.text((120, 290), "One Wrong Size.\nDisappointment for Customers.", fill="#242321", font=FONT_TITLE_MED)
    
    body_text = (
        "• Priya orders a handcrafted pure cambric cotton kurta in Size M.\n"
        "• Traditional ethnic textiles contain 0% elastane stretch.\n"
        "• Standard vanity sizing varies across brands and artisan clusters.\n"
        "• Upon arrival, bust and shoulder seams pull tight when sitting.\n"
        "• Priya is forced to initiate an avoidable return request."
    )
    draw.multiline_text((120, 420), body_text, fill="#77736C", font=FONT_BODY, spacing=16)
    
    # Customer Feedback Quote Card
    draw.rounded_rectangle([(120, 720), (940, 890)], radius=16, fill="#FAF8F4", outline="#E8E3DA")
    draw.text((150, 750), '"The bust was severely tight when crossing my arms.', fill="#242321", font=FONT_HEADLINE)
    draw.text((150, 795), 'The size chart gave zero indication of fabric stiffness."', fill="#242321", font=FONT_HEADLINE)
    draw.text((150, 850), "— Priya S., Indiranagar, Bengaluru (Order #FW-2026-1042)", fill="#A85F48", font=FONT_BODY)
    
    # Right Column: The Business Impact
    draw.rounded_rectangle([(1020, 180), (1840, 950)], radius=24, fill="#242321")
    draw.rounded_rectangle([(1060, 220), (1300, 260)], radius=10, fill="#A85F48")
    draw.text((1180, 240), "THE BUSINESS IMPACT", fill="#FFFFFF", font=FONT_BADGE, anchor="mm")
    
    draw.text((1060, 290), "Heavy Cost Leakage\nFrom Reverse Logistics", fill="#FAF8F4", font=FONT_TITLE_MED)
    
    cost_items = [
        ("Forward Freight Delivery Cost", "₹90 per parcel"),
        ("Doorstep Reverse Pickup Shipping", "₹120 per parcel"),
        ("Warehouse Inspection & Steaming", "₹40 per return"),
        ("Inventory Markdown on Re-shelving", "15% - 25% margin loss"),
        ("Average Return Cost per Unit", "₹250+ in avoidable loss")
    ]
    
    y = 420
    for label, val in cost_items:
        draw.rounded_rectangle([(1060, y), (1800, y + 70)], radius=14, fill="#322E2B")
        draw.text((1090, y + 25), label, fill="#F1EDE5", font=FONT_BODY)
        draw.text((1770, y + 25), val, fill="#E68A6E", font=FONT_HEADLINE, anchor="rm")
        y += 85
        
    draw.text((1060, 875), "Traditional Customer Service acts after the return has already occurred.", fill="#89947C", font=FONT_BODY)
    
    draw_footer(draw)
    path = os.path.join(SCENES_DIR, "scene_act1.png")
    img.save(path)
    print(f"Generated {path}")
    return path

# --- Scene 2: Act 2 The Agent Arrives ---
def create_scene_act2():
    img = Image.new("RGB", (1920, 1080), color="#FAF8F4")
    draw = ImageDraw.Draw(img)
    draw_header(draw, "2", "The Agent Arrives", "PREVENT • RECOVER • LEARN Closed Loop")
    
    # 3 Pillar Pillars across canvas
    pillars = [
        {
            "badge": "01 • PRE-PURCHASE",
            "title": "PREVENT",
            "subtitle": "Intelligent Sizing Math",
            "color": "#A85F48",
            "bullets": [
                "• Collects customer bust (90cm), waist (77cm), hip.",
                "• Analyzes garment flat table spec (Size M: 92cm vs L: 98cm).",
                "• Applies ISO 8559 ease: Non-stretch needs min +4cm.",
                "• Recommends Size L (+8cm ease) with 94% confidence.",
                "• Eliminates 30% of fit returns before purchase!"
            ]
        },
        {
            "badge": "02 • POST-PURCHASE",
            "title": "RECOVER",
            "subtitle": "Automated Exchanges",
            "color": "#2E5A44",
            "bullets": [
                "• Guided 5-step in-app Exchange Stepper.",
                "• Verifies 14-day policy eligibility automatically.",
                "• Queries warehouse stock: 8 units of Size L in stock.",
                "• Dispatches 1-click doorstep exchange via BlueDart.",
                "• Unforced policy: Customer can choose refund anytime."
            ]
        },
        {
            "badge": "03 • CLOSED-LOOP",
            "title": "LEARN",
            "subtitle": "Pattern Intelligence",
            "color": "#C27803",
            "bullets": [
                "• Clusters 100 historical returns for KRT-101.",
                "• Discovers 70% of issues stem from bust tightness.",
                "• AI proposes +2cm chart expansion for Size M.",
                "• Gated by human pattern master authorization.",
                "• Production size chart updates dynamically to v2.0!"
            ]
        }
    ]
    
    x = 80
    for p in pillars:
        draw.rounded_rectangle([(x, 180), (x + 560, 950)], radius=24, fill="#FFFFFF", outline="#E8E3DA", width=2)
        
        # Pillar Header
        draw.rounded_rectangle([(x + 40, 220), (x + 280, 260)], radius=10, fill=p["color"] + "22")
        draw.text((x + 160, 240), p["badge"], fill=p["color"], font=FONT_BADGE, anchor="mm")
        
        draw.text((x + 40, 290), p["title"], fill=p["color"], font=FONT_TITLE_LARGE)
        draw.text((x + 40, 370), p["subtitle"], fill="#242321", font=FONT_HEADLINE)
        
        # Divider
        draw.line([(x + 40, 420), (x + 520, 420)], fill="#E8E3DA", width=2)
        
        # Bullets
        y = 460
        for b in p["bullets"]:
            draw.text((x + 40, y), b, fill="#77736C", font=FONT_BODY)
            y += 65
            
        x += 600
        
    draw_footer(draw, "The Complete Intelligence Loop: Customer Data -> RAG -> Math -> Recommendations -> Exchanges -> Analytics -> Human Sign-off")
    path = os.path.join(SCENES_DIR, "scene_act2.png")
    img.save(path)
    print(f"Generated {path}")
    return path

# --- Scene 3: Act 3 Under the Hood (RAG & MCP Architecture) ---
def create_scene_act3():
    img = Image.new("RGB", (1920, 1080), color="#FAF8F4")
    draw = ImageDraw.Draw(img)
    draw_header(draw, "3", "Under the Hood", "Technical Architecture: RAG Knowledge & MCP Tool Bus")
    
    # Left Half: RAG Pipeline
    draw.rounded_rectangle([(80, 180), (920, 950)], radius=24, fill="#FFFFFF", outline="#E8E3DA", width=2)
    draw.rounded_rectangle([(120, 220), (360, 260)], radius=10, fill="#A85F48" + "22")
    draw.text((240, 240), "RAG ARCHITECTURE", fill="#A85F48", font=FONT_BADGE, anchor="mm")
    
    draw.text((120, 280), "Retrieve Before You Respond", fill="#242321", font=FONT_TITLE_MED)
    draw.text((120, 340), "Grounded In Authoritative Company Documents", fill="#77736C", font=FONT_SUBTITLE)
    
    rag_steps = [
        ("1. Ingestion Sources", "KRT-101 Specs, Fabric Guides, 14-Day Return SOPs, Feedback"),
        ("2. Vector Embeddings", "Splits specs into 250-token chunks with 768-dim embeddings"),
        ("3. Vector Database", "Dense index searched with cosine similarity for top-k matches"),
        ("4. Grounded Prompt", "Injects true garment cm measurements into LLM context"),
        ("5. Explainable Output", "Zero hallucinations: Cites exact garment ease tolerances")
    ]
    
    y = 400
    for step_title, step_desc in rag_steps:
        draw.rounded_rectangle([(120, y), (880, y + 80)], radius=14, fill="#FAF8F4", outline="#E8E3DA")
        draw.text((140, y + 16), step_title, fill="#A85F48", font=FONT_HEADLINE)
        draw.text((140, y + 48), step_desc, fill="#77736C", font=FONT_BODY)
        y += 105
        
    # Right Half: MCP Architecture
    draw.rounded_rectangle([(960, 180), (1840, 950)], radius=24, fill="#242321")
    draw.rounded_rectangle([(1000, 220), (1240, 260)], radius=10, fill="#2E5A44")
    draw.text((1120, 240), "MCP ARCHITECTURE", fill="#FFFFFF", font=FONT_BADGE, anchor="mm")
    
    draw.text((1000, 280), "Connecting AI to Systems", fill="#FAF8F4", font=FONT_TITLE_MED)
    draw.text((1000, 340), "Model Context Protocol Tool Orchestration", fill="#E68A6E", font=FONT_SUBTITLE)
    
    mcp_tools = [
        ("get_customer_profile(cust_id)", "CRM", "Encrypted measurements & privacy consent status"),
        ("get_order_details(order_id)", "OMS", "Verifies delivery date, purchased size & items"),
        ("check_inventory(sku, size)", "Inventory", "Real-time warehouse stock checks for Size L"),
        ("create_exchange_request()", "Logistics", "Provisions automated BlueDart reverse pickup"),
        ("record_return_reason()", "Analytics", "Feeds granular fit complaint to pattern master"),
        ("propose_size_chart()", "Sizing", "Drafts pattern revisions for human approval")
    ]
    
    y = 400
    for tool_sig, domain, purpose in mcp_tools:
        draw.rounded_rectangle([(1000, y), (1800, y + 68)], radius=12, fill="#322E2B")
        draw.text((1020, y + 14), tool_sig, fill="#FAF8F4", font=FONT_MONO)
        draw.rounded_rectangle([(1680, y + 12), (1780, y + 42)], radius=6, fill="#A85F48")
        draw.text((1730, y + 27), domain, fill="#FFFFFF", font=FONT_BADGE, anchor="mm")
        draw.text((1020, y + 44), purpose, fill="#89947C", font=FONT_BODY)
        y += 85
        
    draw_footer(draw, "WORKING PROTOTYPE + SIMULATED INTEGRATIONS • Standardized JSON-RPC 2.0 Protocols")
    path = os.path.join(SCENES_DIR, "scene_act3.png")
    img.save(path)
    print(f"Generated {path}")
    return path

# --- Scene 4: Act 4 Something Goes Wrong ---
def create_scene_act4():
    img = Image.new("RGB", (1920, 1080), color="#FAF8F4")
    draw = ImageDraw.Draw(img)
    draw_header(draw, "4", "Something Goes Wrong", "Responsible AI & Human-in-the-Loop Governance")
    
    # Left Box: AI Flawed Assumption
    draw.rounded_rectangle([(80, 180), (920, 950)], radius=24, fill="#FFF8F0", outline="#C27803", width=2)
    draw.rounded_rectangle([(120, 220), (360, 260)], radius=10, fill="#C27803")
    draw.text((240, 240), "THE SYSTEM MISTAKE", fill="#FFFFFF", font=FONT_BADGE, anchor="mm")
    
    draw.text((120, 290), "Flawed Pattern Assumption\nIn Automated Proposal", fill="#242321", font=FONT_TITLE_MED)
    
    draw.text((120, 420), (
        "• AI clustered 100 return tickets for KRT-101.\n"
        "• 70% of tickets cited upper-body and chest tightness.\n"
        "• The automated algorithm drafted a size-chart change.\n"
        "• HOWEVER: The agent made an incorrect assumption,\n"
        "  confusing flat garment measurements with body ease.\n"
        "• Flagged automatically as: DRAFT - HUMAN AUDIT REQUIRED."
    ), fill="#77736C", font=FONT_BODY, spacing=16)
    
    draw.rounded_rectangle([(120, 750), (880, 890)], radius=16, fill="#FFFFFF", outline="#C27803")
    draw.text((150, 780), "STATUS: DRAFT — HUMAN REVIEW REQUIRED", fill="#C27803", font=FONT_HEADLINE)
    draw.text((150, 830), "AI is forbidden from silently altering production size charts.", fill="#77736C", font=FONT_BODY)
    
    # Right Box: Human Intervention
    draw.rounded_rectangle([(960, 180), (1840, 950)], radius=24, fill="#242321")
    draw.rounded_rectangle([(1000, 220), (1300, 260)], radius=10, fill="#2E5A44")
    draw.text((1150, 240), "HUMAN ACCOUNTABILITY", fill="#FFFFFF", font=FONT_BADGE, anchor="mm")
    
    draw.text((1000, 290), "Quality Manager Audit:\nSunil Mehta Rejects Change", fill="#FAF8F4", font=FONT_TITLE_MED)
    
    draw.text((1000, 420), (
        "• Quality Manager Sunil Mehta inspects the source telemetry.\n"
        "• He verifies physical pattern master samples on flat table.\n"
        "• He catches the flawed measurement assumption immediately.\n"
        "• Sunil clicks REJECT on the Size Intelligence dashboard.\n"
        "• An immutable audit log records the decision and reasoning."
    ), fill="#F1EDE5", font=FONT_BODY, spacing=16)
    
    draw.rounded_rectangle([(1000, 750), (1800, 890)], radius=16, fill="#9B2C2C")
    draw.text((1040, 780), "DECISION: PROPOSAL REJECTED — NOT PUBLISHED", fill="#FFFFFF", font=FONT_HEADLINE)
    draw.text((1040, 835), "Production size chart v1.0 preserved. AI assists, humans remain in control.", fill="#F1EDE5", font=FONT_BODY)
    
    draw_footer(draw, "Responsible AI Invariant: AI never publishes size charts autonomously. Human pattern masters retain final authority.")
    path = os.path.join(SCENES_DIR, "scene_act4.png")
    img.save(path)
    print(f"Generated {path}")
    return path

# --- Scene 5: Act 5 The New Normal & ROI ---
def create_scene_act5():
    img = Image.new("RGB", (1920, 1080), color="#FAF8F4")
    draw = ImageDraw.Draw(img)
    draw_header(draw, "5", "The New Normal", "Business Impact, ROI & Continuous Improvement")
    
    # 4 Big Stat Cards
    stats = [
        ("Monthly Order Volume", "1,000", "Baseline E-Commerce Orders", "#242321"),
        ("Prevented Returns", "30", "30% Avoidable Return Drop", "#2E5A44"),
        ("Logistics Cost Savings", "₹7,500/mo", "30 returns × ₹250 saved", "#2E5A44"),
        ("Retained Gross GMV", "₹30,000/mo", "20 exchanges × ₹1,500 AOV", "#A85F48")
    ]
    
    x = 80
    for title, metric, detail, col in stats:
        draw.rounded_rectangle([(x, 180), (x + 410, 400)], radius=20, fill="#FFFFFF", outline="#E8E3DA", width=2)
        draw.text((x + 30, 215), title.upper(), fill="#77736C", font=FONT_BADGE)
        draw.text((x + 30, 260), metric, fill=col, font=FONT_TITLE_LARGE)
        draw.text((x + 30, 345), detail, fill="#242321", font=FONT_BODY)
        x += 450
        
    # Before vs After Comparison Table
    draw.rounded_rectangle([(80, 440), (1840, 850)], radius=24, fill="#242321")
    draw.text((120, 480), "TRANSFORMATION: BEFORE VS WITH FITBACK-AI", fill="#E68A6E", font=FONT_HEADLINE)
    
    draw.rounded_rectangle([(120, 540), (940, 800)], radius=16, fill="#322E2B")
    draw.text((150, 570), "BEFORE FITBACK-AI", fill="#FFF1F0", font=FONT_HEADLINE)
    draw.multiline_text((150, 620), (
        "• Uncertain customer size selection based on vanity labels\n"
        "• 20% to 35% avoidable return friction in woven fabrics\n"
        "• Manual customer service complaint handling\n"
        "• Zero visibility into recurring product pattern flaws"
    ), fill="#F1EDE5", font=FONT_BODY, spacing=14)
    
    draw.rounded_rectangle([(980, 540), (1800, 800)], radius=16, fill="#1C2F24")
    draw.text((1010, 570), "WITH FITBACK-AI", fill="#89947C", font=FONT_HEADLINE)
    draw.multiline_text((1010, 620), (
        "• Exact cm ease calculation before purchase (94% confidence)\n"
        "• Guided 1-click doorstep exchange retaining order revenue\n"
        "• Automated telemetry clusters recurring fit complaints\n"
        "• Human-reviewed size-chart improvements (v1.0 -> v2.0)"
    ), fill="#FFFFFF", font=FONT_BODY, spacing=14)
    
    # Financial Disclaimer Notice
    draw.rounded_rectangle([(80, 870), (1840, 950)], radius=14, fill="#FFF8F0", outline="#C27803")
    draw.text((120, 895), "FINANCIAL ACCOUNTING DISCLOSURE:", fill="#C27803", font=FONT_BADGE)
    draw.text((120, 920), "Illustrative business estimates. Gross order value retained (₹30,000) represents revenue salvaged, not net profit. Never combine with cost savings.", fill="#77736C", font=FONT_BODY)
    
    draw_footer(draw, "The Continuous Improvement Loop: Prevent the wrong fit, Recover the sale, Learn from every return.")
    path = os.path.join(SCENES_DIR, "scene_act5.png")
    img.save(path)
    print(f"Generated {path}")
    return path

# --- Scene 6: Credits & Academic Audit ---
def create_scene_credits():
    img = Image.new("RGB", (1920, 1080), color="#1A1817")
    draw = ImageDraw.Draw(img)
    
    draw.text((960, 100), "FITBACK-AI", fill="#FFFFFF", font=FONT_TITLE_LARGE, anchor="mm")
    draw.text((960, 160), "PREVENT. RECOVER. LEARN.", fill="#E68A6E", font=FONT_HEADLINE, anchor="mm")
    draw.text((960, 210), "College AI Studio Showcase • Group 4 — Customer Service (Section D)", fill="#89947C", font=FONT_BODY, anchor="mm")
    
    draw.line([(400, 250), (1520, 250)], fill="#322E2B", width=2)
    
    draw.text((960, 300), "PRODUCTION TOOLS & AI DISCLOSURE", fill="#FAF8F4", font=FONT_HEADLINE, anchor="mm")
    
    credits_list = [
        ("Google Antigravity IDE", "Agent Orchestration, Full-Stack Architecture, Code Synthesis"),
        ("Microsoft Edge Neural TTS", "Natural Indian English Voiceover (en-IN-NeerjaNeural)"),
        ("React 19 + TypeScript + Vite", "High-Fidelity Interactive D2C Storefront & Admin Intelligence"),
        ("Tailwind CSS", "Warm Editorial Fashion Design Tokens & Component Styling"),
        ("Recharts", "Interactive Return Telemetry, Trend Lines & Histogram Analytics"),
        ("FFmpeg & ImageIO", "1080p Video Rendering & Multi-track Audio Muxing"),
        ("Canvas Confetti", "Interactive Checkout & Human Approval Visual Celebrations")
    ]
    
    y = 350
    for tool, desc in credits_list:
        draw.text((500, y), tool, fill="#E68A6E", font=FONT_HEADLINE)
        draw.text((500, y + 36), desc, fill="#A09B93", font=FONT_BODY)
        y += 75
        
    draw.line([(400, 900), (1520, 900)], fill="#322E2B", width=2)
    draw.text((960, 940), "T.A. PAI Management Institute / Manipal Academy of Higher Education (MAHE)", fill="#FAF8F4", font=FONT_BODY, anchor="mm")
    draw.text((960, 975), "All customer measurements, names, and orders are fictional for academic demonstration.", fill="#77736C", font=FONT_BADGE, anchor="mm")
    
    path = os.path.join(SCENES_DIR, "scene_credits.png")
    img.save(path)
    print(f"Generated {path}")
    return path

def build_full_video():
    print("=== Step 1: Generating 1080p Cinematic Scene Cards ===")
    s1 = create_scene_act1()
    s2 = create_scene_act2()
    s3 = create_scene_act3()
    s4 = create_scene_act4()
    s5 = create_scene_act5()
    sc = create_scene_credits()
    
    acts = [
        ("act1", s1, os.path.join(AUDIO_DIR, "act1_pain.mp3")),
        ("act2", s2, os.path.join(AUDIO_DIR, "act2_agent.mp3")),
        ("act3", s3, os.path.join(AUDIO_DIR, "act3_hood.mp3")),
        ("act4", s4, os.path.join(AUDIO_DIR, "act4_wrong.mp3")),
        ("act5", s5, os.path.join(AUDIO_DIR, "act5_normal.mp3")),
    ]
    
    segment_files = []
    print("\n=== Step 2: Rendering Video Segments with Audio ===")
    
    for name, img_path, audio_path in acts:
        seg_output = os.path.join(SCENES_DIR, f"{name}.mp4")
        segment_files.append(seg_output)
        print(f"Encoding {name}...")
        
        # FFmpeg command to loop image over audio duration
        cmd = [
            FFMPEG, "-y",
            "-loop", "1",
            "-i", img_path,
            "-i", audio_path,
            "-c:v", "libx264",
            "-tune", "stillimage",
            "-c:a", "aac",
            "-b:a", "192k",
            "-pix_fmt", "yuv420p",
            "-shortest",
            seg_output
        ]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode != 0:
            print(f"Error encoding {name}:", res.stderr.decode("utf-8", errors="ignore"))
        else:
            print(f"Done: {seg_output}")
            
    # Credits Segment (25 seconds with silence / low ambient tone)
    credits_seg = os.path.join(SCENES_DIR, "act6_credits.mp4")
    segment_files.append(credits_seg)
    print("Encoding credits segment (25s)...")
    cmd_credits = [
        FFMPEG, "-y",
        "-loop", "1",
        "-i", sc,
        "-f", "lavfi",
        "-i", "anullsrc=r=48000:cl=stereo",
        "-t", "25",
        "-c:v", "libx264",
        "-tune", "stillimage",
        "-c:a", "aac",
        "-b:a", "192k",
        "-pix_fmt", "yuv420p",
        credits_seg
    ]
    subprocess.run(cmd_credits, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print(f"Done: {credits_seg}")
    
    # Step 3: Concat all segments into Final Video
    print("\n=== Step 3: Concatenating Full Film ===")
    concat_list_path = os.path.join(SCENES_DIR, "concat_list.txt")
    with open(concat_list_path, "w", encoding="utf-8") as f:
        for seg in segment_files:
            abs_path = os.path.abspath(seg).replace("\\", "/")
            f.write(f"file '{abs_path}'\n")
            
    cmd_concat = [
        FFMPEG, "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", concat_list_path,
        "-c", "copy",
        OUTPUT_VIDEO
    ]
    
    res = subprocess.run(cmd_concat, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode != 0:
        print("Error concatenating:", res.stderr.decode("utf-8", errors="ignore"))
    else:
        print(f"\nSUCCESS! Master Video Rendered: {OUTPUT_VIDEO}")
        
    # Also copy to public/ so the web app can serve/download it directly
    public_target = os.path.join("public", "FitBack_AI_Final_Video.mp4")
    if os.path.exists(OUTPUT_VIDEO):
        import shutil
        shutil.copyfile(OUTPUT_VIDEO, public_target)
        print(f"Copied to public web distribution: {public_target}")

if __name__ == "__main__":
    build_full_video()
