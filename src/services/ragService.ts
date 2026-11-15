import { KnowledgeDocument } from '../types';
import { KNOWLEDGE_DOCUMENTS } from '../data/mockData';

export interface RAGSearchResult {
  document: KnowledgeDocument;
  score: number;
  highlightSnippet: string;
}

export function searchKnowledgeBase(query: string, docs: KnowledgeDocument[] = KNOWLEDGE_DOCUMENTS): RAGSearchResult[] {
  if (!query.trim()) return [];
  
  const queryTokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
  
  const results: RAGSearchResult[] = [];

  for (const doc of docs) {
    let score = 0;
    const lowerContent = doc.content.toLowerCase();
    const lowerTitle = doc.title.toLowerCase();
    const lowerTags = doc.tags.map(t => t.toLowerCase());

    for (const token of queryTokens) {
      if (lowerTitle.includes(token)) score += 4;
      if (lowerTags.some(tag => tag.includes(token))) score += 3;
      const count = (lowerContent.match(new RegExp(token, 'g')) || []).length;
      score += Math.min(count * 1.5, 6);
    }

    if (score > 0) {
      // Extract snippet around first match
      let firstMatchIndex = -1;
      for (const token of queryTokens) {
        const idx = lowerContent.indexOf(token);
        if (idx !== -1 && (firstMatchIndex === -1 || idx < firstMatchIndex)) {
          firstMatchIndex = idx;
        }
      }

      let snippet = '';
      if (firstMatchIndex !== -1) {
        const start = Math.max(0, firstMatchIndex - 60);
        const end = Math.min(doc.content.length, firstMatchIndex + 140);
        snippet = (start > 0 ? '...' : '') + doc.content.slice(start, end).replace(/\n/g, ' ') + (end < doc.content.length ? '...' : '');
      } else {
        snippet = doc.content.slice(0, 160).replace(/\n/g, ' ') + '...';
      }

      results.push({
        document: doc,
        score: Math.min(Math.round(score * 12), 98),
        highlightSnippet: snippet
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

export function generateRAGGroundedAnswer(query: string, matchedDocs: RAGSearchResult[]): string {
  if (matchedDocs.length === 0) {
    return `I searched our brand knowledge base, product specs, and customer feedback archives, but couldn't find an exact policy match. Our human concierge team is available to assist directly!`;
  }

  const topDoc = matchedDocs[0].document;
  
  if (query.toLowerCase().includes('restrictive') || query.toLowerCase().includes('tight') || query.toLowerCase().includes('cotton')) {
    return `Based on our ${topDoc.title}: Cambric cotton is a pure woven non-stretch natural fiber. Because it doesn't contain elastane, it requires at least 4 cm of bust ease to ensure uninhibited arm movement. If you fall between sizes or prefer modest room, sizing up to L is recommended.`;
  }

  if (query.toLowerCase().includes('exchange') || query.toLowerCase().includes('return') || query.toLowerCase().includes('policy')) {
    return `According to our ${topDoc.title}: We offer a 14-day hassle-free window with free doorstep size exchange. You can reserve your preferred replacement size directly through me, or opt for an instant refund if preferred.`;
  }

  if (query.toLowerCase().includes('size') || query.toLowerCase().includes('chart') || query.toLowerCase().includes('measurement')) {
    return `According to ${topDoc.title}: Our size guidelines follow Indian anthropometric tailoring with standard 4-6cm comfort ease for Regular fit and 8cm+ for Relaxed silhouettes. Garment specs are measured flat (+/- 1.2 cm variance).`;
  }

  return `Based on "${topDoc.title}": ${matchedDocs[0].highlightSnippet}`;
}
