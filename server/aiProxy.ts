import fetch from 'node-fetch';
import { GoogleGenAI } from '@google/genai';

type AIResult = {
  provider: string;
  text: string;
  raw?: any;
};

const tryGemini = async (prompt: any, model?: string, config?: any): Promise<AIResult> => {
  const key = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!key) throw new Error('No Gemini key');
  const ai = new GoogleGenAI({ apiKey: key });
  const contents = typeof prompt === 'string' ? prompt : prompt;
  const response = await ai.models.generateContent({ model: model || 'gemini-3-flash', contents, config });
  return { provider: 'gemini', text: response.text ?? (response.candidates && response.candidates[0]?.content) ?? '', raw: response };
};

const tryOpenAI = async (prompt: any, model?: string, config?: any): Promise<AIResult> => {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('No OpenAI key');
  const url = 'https://api.openai.com/v1/chat/completions';
  const messages = typeof prompt === 'string' ? [{ role: 'user', content: prompt }] : prompt;
  const body: any = { model: model || 'gpt-4o-mini', messages };
  if (config) Object.assign(body, { ...config });
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`OpenAI error ${res.status}`);
  const data = await res.json();
  const text = data.choices?.map((c: any) => c.message?.content ?? c.text).join('\n') ?? '';
  return { provider: 'openai', text, raw: data };
};

const tryAnthropic = async (prompt: any, model?: string): Promise<AIResult> => {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('No Anthropic key');
  const url = 'https://api.anthropic.com/v1/complete';
  const body = {
    model: model || 'claude-2',
    prompt: typeof prompt === 'string' ? prompt : JSON.stringify(prompt),
    max_tokens: 800
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': key },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Anthropic error ${res.status}`);
  const data = await res.json();
  const text = data.completion ?? data.result ?? '';
  return { provider: 'anthropic', text, raw: data };
};

const tryCohere = async (prompt: any, model?: string): Promise<AIResult> => {
  const key = process.env.COHERE_API_KEY;
  if (!key) throw new Error('No Cohere key');
  const url = 'https://api.cohere.ai/v1/generate';
  const body = { model: model || 'command-xsmall-nightly', prompt: typeof prompt === 'string' ? prompt : JSON.stringify(prompt), max_tokens: 300 };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Cohere error ${res.status}`);
  const data = await res.json();
  const text = data.generations?.map((g: any) => g.text).join('\n') ?? data.text ?? '';
  return { provider: 'cohere', text, raw: data };
};

export const generateAIResponse = async (prompt: any, options?: { model?: string; providers?: string[]; config?: any }) => {
  const providers = options?.providers || (process.env.AI_PROVIDER_ORDER ? process.env.AI_PROVIDER_ORDER.split(',') : ['gemini', 'openai', 'anthropic', 'cohere']);
  const errors: Record<string, any> = {};
  for (const p of providers) {
    try {
      if (p === 'gemini') return await tryGemini(prompt, options?.model, options?.config);
      if (p === 'openai') return await tryOpenAI(prompt, options?.model, options?.config);
      if (p === 'anthropic') return await tryAnthropic(prompt, options?.model);
      if (p === 'cohere') return await tryCohere(prompt, options?.model);
    } catch (e: any) {
      errors[p] = (e && e.message) || e;
      // continue to next provider
    }
  }
  throw new Error('All AI providers failed: ' + JSON.stringify(errors));
};

export default generateAIResponse;
