import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FileText,
  Download,
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface ActScene {
  id: number;
  actTitle: string;
  actSubtitle: string;
  durationSeconds: number;
  audioSrc: string;
  heading: string;
  subheading: string;
  keyMetric: string;
  bgGradient: string;
}

export const FilmShowcasePage: React.FC = () => {
  const { setCustomerTab, setAppMode, setAdminTab } = useStore();

  const [currentActIndex, setCurrentActIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [activeTabDiagram, setActiveTabDiagram] = useState<'rag' | 'mcp'>('rag');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ACTS: ActScene[] = [
    {
      id: 1,
      actTitle: 'ACT 1 — THE PAIN',
      actSubtitle: 'The Return Crisis in Indian Ethnic Wear',
      durationSeconds: 45,
      audioSrc: '/audio/act1_pain.mp3',
      heading: 'One Wrong Size. Multiple Business Costs.',
      subheading: 'Priya orders Size M in pure cambric cotton. When it arrives, the bust and shoulders are severely tight. The return cycle begins.',
      keyMetric: '₹250+ Loss per Avoidable Return',
      bgGradient: 'from-[#1A1817] via-[#2A2421] to-[#1F1C1A]'
    },
    {
      id: 2,
      actTitle: 'ACT 2 — THE AGENT ARRIVES',
      actSubtitle: 'PREVENT • RECOVER • LEARN',
      durationSeconds: 60,
      audioSrc: '/audio/act2_agent.mp3',
      heading: 'Meet FitBack-AI: Sizing Intelligence in Action',
      subheading: 'Evaluating flat garment specs against customer dimensions before purchase, recovering sales through instant exchanges, and learning from return patterns.',
      keyMetric: '94% Match Confidence • 30% Returns Prevented',
      bgGradient: 'from-[#1F2421] via-[#2A1E19] to-[#1A1817]'
    },
    {
      id: 3,
      actTitle: 'ACT 3 — UNDER THE HOOD',
      actSubtitle: 'RAG Knowledge & MCP Tool Orchestration',
      durationSeconds: 60,
      audioSrc: '/audio/act3_hood.mp3',
      heading: 'RAG Retrieves Knowledge. MCP Connects Systems.',
      subheading: 'RAG grounds advice in verified garment specifications. MCP provides standard tool connections to CRM, Inventory, and Logistics.',
      keyMetric: 'Working Prototype + Simulated Integrations',
      bgGradient: 'from-[#1B232E] via-[#202720] to-[#1A1817]'
    },
    {
      id: 4,
      actTitle: 'ACT 4 — SOMETHING GOES WRONG',
      actSubtitle: 'Responsible AI & Human-in-the-Loop Governance',
      durationSeconds: 45,
      audioSrc: '/audio/act4_wrong.mp3',
      heading: 'AI Assists. Humans Remain in Control.',
      subheading: 'The agent detects 70% bust tightness but makes a flawed measurement assumption. Quality Manager Sunil Mehta audits and REJECTS the proposal.',
      keyMetric: 'Change Rejected • Production Size Chart Protected',
      bgGradient: 'from-[#301618] via-[#241A17] to-[#1A1817]'
    },
    {
      id: 5,
      actTitle: 'ACT 5 — THE NEW NORMAL',
      actSubtitle: 'Business Impact & Continuous Improvement',
      durationSeconds: 40,
      audioSrc: '/audio/act5_normal.mp3',
      heading: 'Continuous Sizing Optimization & ROI',
      subheading: 'Priya shops with confidence. The brand saves ₹7,500/mo in reverse logistics and retains ₹30,000 in gross order value through exchanges.',
      keyMetric: '₹30,000 GMV Retained • ₹7,500 Direct Logistics Savings',
      bgGradient: 'from-[#162720] via-[#222B22] to-[#1A1817]'
    },
    {
      id: 6,
      actTitle: 'FINAL CREDITS & AUDIT',
      actSubtitle: 'Academic AI Studio Showcase • Group 4',
      durationSeconds: 30,
      audioSrc: '', // instrumental outro
      heading: 'FitBack-AI Production & Tool Disclosure',
      subheading: 'Produced for Group 4 — Customer Service. Powered by Antigravity IDE, Microsoft Edge Neural TTS, React 19, Recharts, and FFmpeg.',
      keyMetric: 'All Customer Data is Fictional',
      bgGradient: 'from-[#111111] via-[#181818] to-[#0A0A0A]'
    }
  ];

  const currentAct = ACTS[currentActIndex];

  // Play/pause handler
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.log('Audio autoplay prevented:', e));
      setIsPlaying(true);
    }
  };

  // Change act
  const handleSelectAct = (index: number) => {
    setCurrentActIndex(index);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (currentAct.audioSrc) {
        audioRef.current.src = currentAct.audioSrc;
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play().catch(() => setIsPlaying(false));
        }
      }
    }
  }, [currentActIndex]);

  // Track audio progress
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleAudioEnded = () => {
    if (currentActIndex < ACTS.length - 1) {
      setCurrentActIndex(prev => prev + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-[#121110] text-[#F1EDE5] min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Navigation & Context Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-terracotta animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E68A6E]">
                College AI Studio Showcase • Group 4 — Customer Service
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              FitBack-AI: The Showcase Film (4m 40s)
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Target Duration: 4 Minutes 40 Seconds • 5 Cinematic Acts + 30-Second Academic Credits
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setAppMode('customer');
                setCustomerTab('home');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-semibold transition-colors"
            >
              &larr; Storefront
            </button>
            <button
              onClick={() => {
                setAppMode('admin');
                setAdminTab('overview');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-brand-terracotta hover:bg-[#8E4D39] text-white text-xs font-bold transition-all shadow-sm"
            >
              Admin Intelligence
            </button>
          </div>
        </div>

        {/* 16:9 Widescreen Cinema Stage */}
        <div className={`relative aspect-video rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-gradient-to-br ${currentAct.bgGradient} flex flex-col justify-between p-6 sm:p-10 transition-all duration-700`}>
          
          {/* Top Cinema Overlay Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-terracotta flex items-center justify-center text-white font-serif font-bold text-lg shadow-md">
                F
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-widest text-[#E68A6E] uppercase">
                  {currentAct.actTitle}
                </div>
                <div className="text-xs text-gray-300 font-medium">
                  {currentAct.actSubtitle}
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{Math.floor(currentTime)}s / {currentAct.durationSeconds}s</span>
              <span className="text-gray-500">|</span>
              <span className="text-brand-terracotta-light">Act {currentActIndex + 1} of 6</span>
            </div>
          </div>

          {/* Central Visual Stage */}
          <div className="my-auto z-10 max-w-4xl space-y-4">
            
            {/* ACT 1 Visual Stage */}
            {currentActIndex === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/20 px-3 py-1 rounded-md border border-rose-500/30">
                    The Problem • 30% Return Friction
                  </span>
                  <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                    One Wrong Size.<br />Multiple Business Costs.
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Priya purchases a beautiful cambric cotton kurta in Size M. With 0% elastane fabric, standard arm and bust movements are severely restricted. A return request is filed.
                  </p>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Incurs forward freight, reverse logistics, inspection, and markdown costs (₹250/return).</span>
                  </div>
                </div>

                <div className="md:col-span-5 relative">
                  <div className="rounded-2xl overflow-hidden border border-white/20 shadow-card bg-black/40 p-2">
                    <img
                      src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80"
                      alt="Priya tries on kurta"
                      className="w-full h-48 sm:h-56 object-cover object-top rounded-xl opacity-90"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-brand-charcoal/90 backdrop-blur-md p-2.5 rounded-lg text-[11px] text-white border border-white/20">
                      <strong>Customer Feedback:</strong> "Bust feels 3cm too tight when sitting."
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ACT 2 Visual Stage */}
            {currentActIndex === 1 && (
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-terracotta-light bg-brand-terracotta/25 px-3 py-1 rounded-md border border-brand-terracotta/40">
                  The Solution • Closed Loop
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                  PREVENT • RECOVER • LEARN
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                    <div className="text-[11px] font-bold text-[#E68A6E] uppercase mb-1">PREVENT</div>
                    <div className="text-xs font-bold text-white mb-1">Pre-Purchase Ease Math</div>
                    <div className="text-[11px] text-gray-300">
                      Computes +8cm ease against flat 98cm spec for Size L. 94% recommendation confidence.
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                    <div className="text-[11px] font-bold text-[#B2C4A2] uppercase mb-1">RECOVER</div>
                    <div className="text-xs font-bold text-white mb-1">Automated Size Exchange</div>
                    <div className="text-[11px] text-gray-300">
                      5-step stepper checks warehouse stock, reserves Size L, and schedules BlueDart pickup.
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                    <div className="text-[11px] font-bold text-emerald-400 uppercase mb-1">LEARN</div>
                    <div className="text-xs font-bold text-white mb-1">Return Intelligence</div>
                    <div className="text-[11px] text-gray-300">
                      Clusters 100 return tickets to identify repeated upper-body tightness anomalies.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ACT 3 Visual Stage: Technical Diagrams */}
            {currentActIndex === 2 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-md border border-emerald-500/30">
                      Under The Hood • Enterprise Architecture
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                      {activeTabDiagram === 'rag' ? 'RAG: Retrieve Before You Respond' : 'MCP: Connecting AI to Enterprise Systems'}
                    </h2>
                  </div>

                  <div className="flex bg-white/10 p-1 rounded-xl border border-white/20">
                    <button
                      onClick={() => setActiveTabDiagram('rag')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        activeTabDiagram === 'rag' ? 'bg-brand-terracotta text-white' : 'text-gray-300'
                      }`}
                    >
                      RAG Pipeline
                    </button>
                    <button
                      onClick={() => setActiveTabDiagram('mcp')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        activeTabDiagram === 'mcp' ? 'bg-brand-terracotta text-white' : 'text-gray-300'
                      }`}
                    >
                      MCP Tools
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-white/20 bg-white shadow-card max-h-64 sm:max-h-72">
                  <img
                    src={activeTabDiagram === 'rag' ? '/diagrams/FitBack_AI_RAG_Diagram.svg' : '/diagrams/FitBack_AI_MCP_Diagram.svg'}
                    alt="Technical Architecture Diagram"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="text-[11px] text-gray-400 text-center">
                  Working Prototype + Simulated Integrations • Standardized JSON-RPC 2.0 Protocols
                </div>
              </div>
            )}

            {/* ACT 4 Visual Stage: Something Goes Wrong */}
            {currentActIndex === 3 && (
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3 py-1 rounded-md border border-amber-500/30">
                  Human-in-the-Loop Governance
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                  AI Assists. Humans Remain in Control.
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Automated Proposal Drafted:</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      AI detected 70% bust tightness on KRT-101 but made a flawed assumption confusing body measurements with flat pattern ease allowances.
                    </p>
                    <div className="text-[10px] bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded font-mono">
                      DRAFT: HUMAN REVIEW REQUIRED
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-2">
                    <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" />
                      <span>Quality Manager Decision:</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      Sunil Mehta audits the underlying data, catches the mistake, and clicks <strong>REJECT</strong>.
                    </p>
                    <div className="text-[10px] bg-rose-500/20 text-rose-200 px-2 py-0.5 rounded font-mono font-bold">
                      CHANGE REJECTED — NOT PUBLISHED
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ACT 5 Visual Stage: The New Normal */}
            {currentActIndex === 4 && (
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-md border border-emerald-500/30">
                  Business ROI &amp; Continuous Learning
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                  Prevent the Wrong Fit. Recover the Sale. Learn.
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 text-center">
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Monthly Orders</div>
                    <div className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">1,000</div>
                    <div className="text-[9px] text-gray-400">Baseline Volume</div>
                  </div>
                  <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 text-center">
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Prevented Returns</div>
                    <div className="font-serif text-xl sm:text-2xl font-bold text-emerald-400 mt-1">30 orders</div>
                    <div className="text-[9px] text-emerald-300">30% reduction</div>
                  </div>
                  <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 text-center">
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Logistics Savings</div>
                    <div className="font-serif text-xl sm:text-2xl font-bold text-emerald-400 mt-1">₹7,500/mo</div>
                    <div className="text-[9px] text-gray-400">₹250/return saved</div>
                  </div>
                  <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 text-center">
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Gross Retained GMV</div>
                    <div className="font-serif text-xl sm:text-2xl font-bold text-[#E68A6E] mt-1">₹30,000/mo</div>
                    <div className="text-[9px] text-gray-400">20 exchanges &times; ₹1,500</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-200 text-center">
                  ILLUSTRATIVE BUSINESS ESTIMATES — NOT MEASURED RESULTS. Gross order value retained represents top-line revenue saved, not net profit.
                </div>
              </div>
            )}

            {/* CREDITS Visual Stage */}
            {currentActIndex === 5 && (
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta-light">
                  PRODUCTION CREDITS &amp; ACADEMIC AUDIT
                </span>
                <h2 className="font-serif text-3xl font-bold text-white">
                  FitBack-AI Showcase Film
                </h2>
                <div className="text-xs text-gray-400 space-y-1">
                  <div><strong>Group 4 — Customer Service</strong> • TLM Section D</div>
                  <div>T.A. PAI Management Institute / Manipal Academy of Higher Education (MAHE)</div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs text-left grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Core Orchestration</span>
                    <span className="text-white font-semibold">Google Antigravity IDE</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Neural Voiceover</span>
                    <span className="text-white font-semibold">Microsoft Edge Neural TTS (en-IN-NeerjaNeural)</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Application Stack</span>
                    <span className="text-white font-semibold">React 19 + TypeScript + Tailwind CSS</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Telemetry Engine</span>
                    <span className="text-white font-semibold">Recharts + MCP Protocol Tool Bus</span>
                  </div>
                </div>

                <div className="text-[10px] text-gray-500 pt-1">
                  All customer measurements, names, and orders are fictional for academic demonstration.
                </div>
              </div>
            )}

          </div>

          {/* Subtitles Overlay Bar */}
          {showSubtitles && (
            <div className="z-20 bg-black/75 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/15 text-center max-w-3xl mx-auto">
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                "{currentAct.subheading}"
              </p>
            </div>
          )}

          {/* Bottom Player Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-brand-terracotta hover:bg-[#8E4D39] text-white flex items-center justify-center transition-all shadow-md"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    setCurrentTime(0);
                  }
                }}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Restart Act"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                  showSubtitles ? 'bg-white/20 text-white border-white/30' : 'text-gray-400 border-transparent'
                }`}
              >
                CC
              </button>
            </div>

            {/* Act Timeline Selector Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
              {ACTS.map((act, idx) => (
                <button
                  key={act.id}
                  onClick={() => handleSelectAct(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    currentActIndex === idx
                      ? 'bg-brand-terracotta text-white shadow-sm'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Act {idx + 1}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Video Asset Deliverables Section */}
        <div className="bg-brand-charcoal p-6 sm:p-8 rounded-3xl border border-white/10 shadow-soft space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Generated Production Deliverables &amp; Artifacts
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Saved locally on disk in <code className="text-[#E68A6E] font-mono">/video_production</code> and available for academic presentation.
              </p>
            </div>

            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              &check; 5 Acts Rendered &bull; Audio Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <a
              href="/FitBack_AI_Final_Video.mp4"
              download="FitBack_AI_Final_Video.mp4"
              className="p-4 rounded-2xl bg-brand-terracotta/20 border border-brand-terracotta/40 space-y-2 hover:bg-brand-terracotta/30 transition-all block group"
            >
              <div className="font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-[#E68A6E]" />
                  <span>Master Film (.mp4)</span>
                </span>
                <Download className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-gray-300">
                1080p Full HD master video (5m 21s) with Indian English neural narration.
              </p>
              <div className="text-[10px] text-brand-terracotta-light font-mono font-bold">
                Download MP4 (9.2 MB) &rarr;
              </div>
            </a>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#E68A6E]" />
                <span>Narration Script</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Verbatim script with 5-act timestamps, emotional arcs, and scene directions.
              </p>
              <div className="text-[10px] text-brand-terracotta-light font-mono">
                FitBack_AI_Narration_Script.txt
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Subtitle Cues (.srt)</span>
              </div>
              <p className="text-[11px] text-gray-400">
                40 synchronized SubRip subtitle cues with millisecond accuracy.
              </p>
              <div className="text-[10px] text-emerald-300 font-mono">
                FitBack_AI_Subtitles.srt
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Technical Architecture</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Full 1080p high-resolution RAG vector search &amp; MCP tool diagrams.
              </p>
              <div className="text-[10px] text-blue-300 font-mono">
                FitBack_AI_RAG &amp; MCP Diagrams.svg
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="font-bold text-white flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Neural Voice Audio</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Indian English voiceover generated with Microsoft Edge Neural TTS.
              </p>
              <div className="text-[10px] text-amber-300 font-mono">
                /video_production/audio/*.mp3
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
