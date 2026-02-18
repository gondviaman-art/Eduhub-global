// Multi-AI Provider Service with Intelligent Fallback System
// Supports: Gemini, OpenAI, Claude, Cohere, Together AI
// Auto-fallback when quota exceeded or API fails

import { Language } from '../types';

export interface AIResponse {
  text: string;
  provider: 'gemini' | 'openai' | 'claude' | 'cohere' | 'together' | 'mock';
  success: boolean;
  error?: string;
}

export interface ProviderConfig {
  name: string;
  apiKey?: string;
  enabled: boolean;
  priority: number;
}

class MultiAIService {
  // Client-side wrapper — forward to server `/api/ai/*` endpoints so keys remain secret
  constructor() {
    // no-op (server provides provider discovery)
  }

  private async callServer(path: string, body?: any) {
    const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('token') : null;
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(path, { method: body ? 'POST' : 'GET', headers, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Server AI proxy error ${res.status}: ${txt}`);
    }
    return res.json();
  }

  // Client-facing method: ask the server to generate a response using the configured provider order
  async generateResponse(prompt: string, lang: Language = 'en') {
    const payload = { prompt, lang };
    try {
      const json = await this.callServer('/api/ai/generate', payload);
      return {
        text: json.text ?? (json.message ?? ''),
        provider: json.provider ?? 'server-proxy',
        success: true
      };
    } catch (err: any) {
      console.warn('multiAIService: server generate failed, returning mock', err?.message);
      return this.getMockResponse(prompt, lang);
    }
  }

  // Ask server for provider status (which keys are configured)
  async getProviderStatus() {
    try {
      return await this.callServer('/api/ai/status');
    } catch (err) {
      return [{ provider: 'server', name: 'Server Proxy', enabled: true, failed: false, requests: 0, apiConfigured: true }];
    }
  }

  getStats() {
    // Defer to server where runtime metrics are collected (client-side returns placeholder)
    return { totalRequests: 0, lastProvider: 'server-proxy', providers: [] };
  }


  // NOTE: provider-specific code (tryGemini/tryOpenAI/etc.) moved to server-side proxy.
  // The client now uses `generateResponse()` above which forwards to `/api/ai/generate`.

  private getMockResponse(prompt: string, lang: Language): AIResponse {
    // Smart mock responses based on prompt
    const mockResponses = {
      en: {
        default: 'This is a simulated response. Please add an API key (Gemini, OpenAI, Claude, Cohere, or Together) to get real AI responses.',
        question: 'This is a test answer. Please integrate your AI API keys for real responses.',
        'how': 'Here are the steps to achieve that: 1) First, understand the concept, 2) Practice with examples, 3) Apply your knowledge. Please add API keys for real assistance.',
      },
      hi: {
        default: 'यह एक सिमुलेटेड प्रतिक्रिया है। असली AI प्रतिक्रियाओं के लिए कृपया एक API कुंजी जोड़ें।',
        question: 'यह एक परीक्षण उत्तर है। वास्तविक प्रतिक्रियाओं के लिए API कुंजी जोड़ें।',
        'kaise': 'यहाँ कुछ चरण दिए गए हैं: 1) अवधारणा को समझें, 2) उदाहरणों से अभ्यास करें, 3) अपना ज्ञान लागू करें।',
      }
    };

    const lowerPrompt = prompt.toLowerCase();
    let responseKey = 'default';

    if (lowerPrompt.includes('?') || lowerPrompt.includes('what') || lowerPrompt.includes('which')) {
      responseKey = 'question';
    } else if (lowerPrompt.includes('how') || lowerPrompt.includes('kaise')) {
      responseKey = 'how';
    }

    const text = mockResponses[lang][responseKey as keyof typeof mockResponses[Language]] || mockResponses[lang].default;

    return {
      text,
      provider: 'mock',
      success: false,
      error: 'All AI providers unavailable. Using mock response.'
    };
  }

  // Provider status is served by the server-side `/api/ai/status` endpoint.
  // The client `getProviderStatus()` above calls that endpoint.

  // Client-side placeholders — use server endpoints for runtime metrics and flags
  resetFailureFlags() { return true; }

}

// Export singleton
export const multiAIService = new MultiAIService();
export default MultiAIService;
