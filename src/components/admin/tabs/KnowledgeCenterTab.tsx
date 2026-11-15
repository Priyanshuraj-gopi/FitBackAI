import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { searchKnowledgeBase, generateRAGGroundedAnswer } from '../../../services/ragService';
import { MCP_TOOLS_REGISTRY } from '../../../data/mockData';
import {
  Database,
  Terminal,
  Search,
  Sparkles,
  BookOpen,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Code2,
  PlusCircle,
  FileText
} from 'lucide-react';

export const KnowledgeCenterTab: React.FC = () => {
  const { knowledgeDocs, addKnowledgeDoc, mcpLogs } = useStore();

  const [searchQuery, setSearchQuery] = useState<string>('Will this cotton kurta feel restrictive?');
  const [searchResults, setSearchResults] = useState(searchKnowledgeBase('Will this cotton kurta feel restrictive?', knowledgeDocs));
  const [selectedDocId, setSelectedDocId] = useState<string>(knowledgeDocs[0]?.id || '');
  const [isAddingDoc, setIsAddingDoc] = useState<boolean>(false);

  // New Doc Form
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<any>('Product Specification');
  const [newContent, setNewContent] = useState<string>('');
  const [newTags, setNewTags] = useState<string>('');

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    const res = searchKnowledgeBase(q, knowledgeDocs);
    setSearchResults(res);
  };

  const handleCreateDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    addKnowledgeDoc({
      title: newTitle,
      category: newCategory,
      content: newContent,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setIsAddingDoc(false);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
  };

  const selectedDoc = knowledgeDocs.find(d => d.id === selectedDocId) || knowledgeDocs[0];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-terracotta/10 px-3 py-1 rounded-full border border-brand-terracotta/20">
          Core Academic Demonstration
        </span>
        <h2 className="font-serif text-3xl font-bold text-brand-charcoal mt-2">
          AI Knowledge Centre: RAG & MCP Architecture
        </h2>
        <p className="text-xs text-brand-muted mt-1 max-w-3xl leading-relaxed">
          Demonstrates how Retrieval-Augmented Generation (RAG) grounds conversational responses in verified brand specifications, and how the Model Context Protocol (MCP) orchestrates deterministic tool calls across enterprise systems.
        </p>
      </div>

      {/* Architectural Distinction Banner */}
      <div className="bg-brand-charcoal text-[#F1EDE5] p-6 rounded-3xl border border-white/10 shadow-soft">
        <h3 className="font-serif text-base font-bold text-white mb-3 flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-terracotta" />
          <span>Architectural Component Separation (Group 4 Specification)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <div className="font-bold text-[#E68A6E] uppercase text-[10px] tracking-wider mb-1">
              01 • RAG Layer
            </div>
            <p className="text-gray-300 leading-relaxed">
              Retrieves authoritative brand knowledge (fabric stretch, ISO ease tables, return policy) to ground LLM natural language generation.
            </p>
          </div>

          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <div className="font-bold text-[#B2C4A2] uppercase text-[10px] tracking-wider mb-1">
              02 • MCP Layer
            </div>
            <p className="text-gray-300 leading-relaxed">
              Provides standardized, secure tool access to CRM, OMS, logistics, inventory, and telemetry databases without prompt stuffing.
            </p>
          </div>

          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <div className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider mb-1">
              03 • Deterministic Engine
            </div>
            <p className="text-gray-300 leading-relaxed">
              Executes mathematical measurement comparisons and ease tolerances in Python/TypeScript. LLMs never do mental math.
            </p>
          </div>

          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <div className="font-bold text-amber-300 uppercase text-[10px] tracking-wider mb-1">
              04 • Agent Orchestrator
            </div>
            <p className="text-gray-300 leading-relaxed">
              Manages conversation state, handles user intent routing, validates inputs, and oversees human approval checkpoints.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION A: RAG Knowledge Base Sandbox */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-brand-border/60">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-terracotta" />
              <h3 className="font-serif text-xl font-bold text-brand-charcoal">
                RAG Knowledge Base Explorer ({knowledgeDocs.length} Indexed Documents)
              </h3>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              Vector-indexed specifications, fabric care rules, and anonymized return feedback clusters.
            </p>
          </div>

          <button
            onClick={() => setIsAddingDoc(!isAddingDoc)}
            className="px-4 py-2 bg-brand-charcoal hover:bg-brand-terracotta text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{isAddingDoc ? 'Cancel' : 'Ingest New Document'}</span>
          </button>
        </div>

        {/* Add Doc Form */}
        {isAddingDoc && (
          <form onSubmit={handleCreateDoc} className="bg-brand-ivory p-5 rounded-2xl border border-brand-border space-y-4 animate-in fade-in text-xs">
            <div className="font-bold text-brand-charcoal text-sm">
              Index New Technical Document into RAG Corpus
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-brand-muted block mb-1 font-semibold">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Linen Blends Comfort & Ease Guide"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-brand-border bg-white"
                />
              </div>
              <div>
                <label className="text-brand-muted block mb-1 font-semibold">Document Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-brand-border bg-white font-medium"
                >
                  <option value="Product Specification">Product Specification</option>
                  <option value="Fabric Guide">Fabric Guide</option>
                  <option value="Brand Fit Policy">Brand Fit Policy</option>
                  <option value="Returns Policy">Returns Policy</option>
                  <option value="Historical Feedback">Historical Feedback</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-brand-muted block mb-1 font-semibold">Content Text / Markdown</label>
              <textarea
                rows={3}
                placeholder="Enter technical guidelines, ease requirements or specifications..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-brand-border bg-white"
              />
            </div>

            <div>
              <label className="text-brand-muted block mb-1 font-semibold">Search Tags (comma separated)</label>
              <input
                type="text"
                placeholder="Linen, Breathability, Relaxed, Care"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-brand-border bg-white"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-brand-terracotta text-white font-bold rounded-xl hover:bg-[#8E4D39]"
              >
                Index & Commit to Vector Store
              </button>
            </div>
          </form>
        )}

        {/* Interactive Query Sandbox */}
        <div className="bg-brand-ivory p-5 rounded-2xl border border-brand-border space-y-3">
          <div className="text-xs font-bold text-brand-charcoal flex items-center justify-between">
            <span>RAG Semantic Retrieval Sandbox:</span>
            <span className="text-brand-muted font-normal text-[11px]">Type any customer query to test chunk similarity scores</span>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="e.g. Will this cotton kurta feel restrictive? or What is the exchange policy?"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-brand-border bg-white focus:outline-brand-terracotta"
              />
            </div>
            <button
              onClick={() => handleSearch(searchQuery)}
              className="px-4 py-2 bg-brand-charcoal hover:bg-brand-terracotta text-white rounded-xl text-xs font-bold transition-colors"
            >
              Search
            </button>
          </div>

          {/* Retrieved chunks */}
          {searchResults.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-bold text-emerald-800">
                Top {searchResults.length} Retrieved Semantic Chunks:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {searchResults.slice(0, 2).map((res, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-brand-border text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-charcoal truncate">{res.document.title}</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                        {res.score}% Match
                      </span>
                    </div>
                    <p className="text-brand-muted text-[11px] italic leading-relaxed">
                      "{res.highlightSnippet}"
                    </p>
                    <div className="text-[10px] text-brand-terracotta font-semibold pt-1">
                      Category: {res.document.category}
                    </div>
                  </div>
                ))}
              </div>

              {/* Grounded generation preview */}
              <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-950 mt-2">
                <span className="font-bold text-emerald-900 block mb-1">
                  Synthesized Grounded AI Response:
                </span>
                <p className="leading-relaxed">
                  {generateRAGGroundedAnswer(searchQuery, searchResults)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Document Repository List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-1">
              Select Document to Inspect:
            </div>
            {knowledgeDocs.map(doc => (
              <div
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                  selectedDocId === doc.id
                    ? 'border-brand-terracotta bg-brand-terracotta/10 font-bold'
                    : 'border-brand-border bg-white hover:bg-brand-ivory text-brand-charcoal'
                }`}
              >
                <div className="text-xs truncate">{doc.title}</div>
                <div className="text-[10px] text-brand-muted mt-0.5 flex justify-between">
                  <span>{doc.category}</span>
                  <span>{doc.tags.slice(0, 2).join(', ')}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 bg-brand-ivory p-5 rounded-2xl border border-brand-border space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-brand-border/60">
              <span className="font-bold text-sm text-brand-charcoal">{selectedDoc.title}</span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-brand-border text-brand-muted">
                {selectedDoc.category}
              </span>
            </div>
            <div className="font-mono text-[11px] whitespace-pre-wrap bg-white p-3 rounded-xl border border-brand-border/70 text-brand-charcoal leading-relaxed max-h-60 overflow-y-auto">
              {selectedDoc.content}
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedDoc.tags.map(t => (
                <span key={t} className="text-[10px] bg-brand-beige px-2 py-0.5 rounded text-brand-muted">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* SECTION B: Model Context Protocol (MCP) Live Tool Orchestration */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-soft space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-brand-terracotta" />
            <h3 className="font-serif text-xl font-bold text-brand-charcoal">
              Model Context Protocol (MCP) Tool Integration Layer
            </h3>
          </div>
          <p className="text-xs text-brand-muted mt-0.5">
            Standardised interface exposing enterprise operations to the AI shopping assistant with live execution logs.
          </p>
        </div>

        {/* Registered MCP Tools Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-brand-beige/60 text-brand-charcoal font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg">MCP Tool Function</th>
                <th className="py-2.5 px-3">System Boundary</th>
                <th className="py-2.5 px-3">Parameters</th>
                <th className="py-2.5 px-3 rounded-r-lg">Capability Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {MCP_TOOLS_REGISTRY.map(tool => (
                <tr key={tool.name} className="hover:bg-brand-ivory/80 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-brand-terracotta">
                    {tool.name}()
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[10px] bg-brand-beige text-brand-charcoal font-semibold px-2 py-0.5 rounded border border-brand-border">
                      {tool.systemCategory}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-brand-muted">
                    {tool.parameters.map(p => p.name).join(', ')}
                  </td>
                  <td className="py-2.5 px-3 text-brand-charcoal text-[11px]">
                    {tool.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live MCP Tool Execution Stream Log */}
        <div className="bg-brand-charcoal text-white p-5 rounded-2xl border border-white/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
            <span className="font-bold flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live MCP Tool Execution Audit Stream ({mcpLogs.length} Events)
            </span>
            <span className="text-[10px] text-gray-400">
              JSON-RPC 2.0 Compliant Simulation
            </span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
            {mcpLogs.slice(0, 6).map(log => (
              <div key={log.id} className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-[11px] space-y-1">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-brand-terracotta-light font-bold">
                    CALL: {log.toolName} [{log.systemCategory}]
                  </span>
                  <span>{log.durationMs}ms • {new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="text-gray-300 truncate">
                  <span className="text-gray-500">INPUT:</span> {JSON.stringify(log.args)}
                </div>
                <div className="text-emerald-300 truncate">
                  <span className="text-gray-500">OUTPUT:</span> {JSON.stringify(log.result)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
