
// Lightweight client-side shim: forward AI calls to server-side proxy
const Type: any = { ARRAY: 'array', OBJECT: 'object', STRING: 'string', NUMBER: 'number' };
const Modality: any = { AUDIO: 'audio' };
import { 
  Language, Subject, EducationLevel, ExamQuestion, Presentation, 
  CloudInsight, GeoResult, NewsItem, Fact, DeepDiveArticle, 
  Question, DocAnalysisResult, CareerRoadmap, MindMapNode, 
  StudyPlan, CodeSnippet, LMSource, LMGuide, CompetitionExam, 
  CompetitionTopic, ModelPaper, GradedPaperResult 
} from "../types";
import { dbService } from "./dbService";
import { multiAIService } from "./multiAIService";
// Fix: Added missing SAVED_PLANS and COMPETITION_DB imports
import { SAVED_ARTICLES, SAVED_NEWS, SAVED_QUIZ, SAVED_FACTS, SAVED_PLANS, COMPETITION_DB } from "../data/permanentDB";

const getAI = () => {
    const callServer = async (body: any) => {
        const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('token') : null;
        const headers: any = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const res = await fetch('/api/ai/generate', {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`AI proxy error ${res.status}: ${text}`);
        }
        return res.json();
    };

    return {
        models: {
            generateContent: async ({ model, contents, config }: any) => {
                const payload = { prompt: contents, model, config };
                const data = await callServer(payload);
                return { text: data.text || '', candidates: data.candidates || [], raw: data.raw || data };
            },
            generateContentStream: async ({ model, contents }: any) => {
                const payload = { prompt: contents, model };
                const data = await callServer(payload);
                const text = data.text || '';
                async function* gen() {
                    const chunkSize = 60;
                    for (let i = 0; i < text.length; i += chunkSize) {
                        yield { text: text.slice(i, i + chunkSize) };
                        await new Promise(r => setTimeout(r, 8));
                    }
                }
                return gen();
            },
            generateVideos: async ({ model, prompt, config }: any) => {
                const payload = { prompt, model, config, type: 'video' };
                return callServer(payload);
            }
        },
        operations: {
            getVideosOperation: async ({ operation }: any) => ({ done: true, response: operation })
        },
        live: {
            connect: async () => { throw new Error('Live connections must use server-side implementation'); }
        }
    };
};

export const getLangInstruction = (lang: Language) => {
  return lang === 'hi' ? "IMPORTANT: Respond EXCLUSIVELY in Hindi (Devanagari script)." : "Respond in English.";
};

const robustJSONParse = (text: string) => {
    try {
        const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned);
    } catch (e) {
        console.error("JSON Error:", e);
        return null;
    }
};

export const getGeminiResponse = async (prompt: string, lang: Language): Promise<string> => {
    const cached = dbService.getSavedResult('chat_resp', prompt);
    if (cached) return cached;

    try {
        // Try Gemini first
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `${prompt} ${getLangInstruction(lang)}`,
        });
        const result = response.text || "";
        if (result) {
            dbService.saveResult('chat_resp', prompt, result);
            return result;
        }
    } catch (error: any) {
        console.warn("Gemini API failed:", error?.message);
        // Fallback to multiAIService if Gemini fails
    }

    // Automatic fallback to multi-AI service
    try {
        const multiResponse = await multiAIService.generateResponse(prompt, lang);
        dbService.saveResult('chat_resp', prompt, multiResponse);
        return multiResponse;
    } catch (fallbackError) {
        console.error("All AI services failed:", fallbackError);
        // Return graceful error message
        return lang === 'hi' 
            ? "माफ़ करें, अभी AI सेवा उपलब्ध नहीं है। कृपया कुछ समय बाद पुनः प्रयास करें।"
            : "Sorry, AI service is temporarily unavailable. Please try again later.";
    }
};

export const fetchNews = async (lang: Language, refresh: boolean = false): Promise<NewsItem[]> => {
    // Priority 1: Check Refresh toggle. If false, return hard-coded library + local cache instantly.
    if (!refresh) {
        const cached = dbService.getNews();
        return cached; 
    }
    
    // Priority 2: If refresh requested, try fetching live news
    try {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: "List the 8 latest educational and global news items relevant for students. Include title, summary, category.",
            config: {
                tools: [{googleSearch: {}}],
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            summary: { type: Type.STRING },
                            category: { type: Type.STRING }
                        }
                    }
                }
            },
        });
        const raw = robustJSONParse(response.text || "[]");
        const processed = raw.map((item: any, idx: number) => ({
            ...item,
            id: `news-live-${Date.now()}-${idx}`,
            date: new Date().toLocaleDateString(),
            timestamp: Date.now(),
            imageUrl: `https://picsum.photos/800/400?random=${idx + 200}`
        }));
        
        // Merge with existing to maintain "hajarro news" feel
        const final = [...processed, ...SAVED_NEWS];
        dbService.save('news_cache', final);
        return final;
    } catch (e) {
        // Ultimate fallback to hardcoded database
        return SAVED_NEWS;
    }
};

export const fetchFullNewsStory = async (title: string, lang: Language): Promise<string> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a detailed 500-word educational report on: ${title}. Include background, current status, and impact. Format with HTML tags like <h3>, <p>, <ul>. ${getLangInstruction(lang)}`,
        config: { tools: [{ googleSearch: {} }] }
    });
    return response.text || "Report unavailable.";
};

export const fetchFacts = async (subject: Subject, level: EducationLevel, lang: Language, count: number = 6): Promise<Fact[]> => {
    // Check Permanent DB first to avoid API call
    const permanent = SAVED_FACTS[subject]?.filter(f => f.level === level) || [];
    if (permanent.length >= count) return permanent.slice(0, count);

    try {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `List ${count} interesting, high-yield academic facts about ${subject} for ${level}. ${getLangInstruction(lang)}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            content: { type: Type.STRING }
                        }
                    }
                }
            }
        });
        const raw = robustJSONParse(response.text || "[]");
        return raw.map((f: any, i: number) => ({
            id: `fact-ai-${Date.now()}-${i}`,
            subject,
            level,
            content: f.content
        }));
    } catch (e) {
        return permanent;
    }
};

export const fetchDeepDiveArticle = async (topic: string, subject: Subject, level: EducationLevel, lang: Language): Promise<DeepDiveArticle | null> => {
    // Check Permanent DB
    const existing = SAVED_ARTICLES[subject]?.find(a => a.title.toLowerCase() === topic.toLowerCase() || a.title.toLowerCase().includes(topic.toLowerCase()));
    if (existing) return existing;

    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Write a detailed scholarly article on "${topic}" within the field of ${subject} for a ${level} level. Use HTML for structure (<h3>, <p>, <li>). Include an introduction, deep analysis, and future outlook. ${getLangInstruction(lang)}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    content: { type: Type.STRING },
                    tags: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            }
        }
    });
    const data = robustJSONParse(response.text || "{}");
    if (data.title) {
        return {
            ...data,
            id: `dd-ai-${Date.now()}`,
            subject,
            level,
            imageUrl: `https://picsum.photos/800/400?random=${Date.now()}`
        };
    }
    return null;
};

export const fetchQuizQuestions = async (level: EducationLevel, subject: Subject, lang: Language): Promise<Question[]> => {
    // Check Permanent DB
    const key = `${subject}-${level}`;
    if (SAVED_QUIZ[key]) return SAVED_QUIZ[key];

    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate 5 challenging multiple-choice questions for ${subject} at ${level} level. Include rationale. ${getLangInstruction(lang)}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        options: { type: Type.ARRAY, items: { type: Type.STRING } },
                        correctAnswer: { type: Type.NUMBER, description: "0-based index of correct option" },
                        rationale: { type: Type.STRING }
                    }
                }
            }
        }
    });
    const raw = robustJSONParse(response.text || "[]");
    return raw.map((q: any, i: number) => ({
        ...q,
        id: `q-ai-${Date.now()}-${i}`,
        level
    }));
};

export const getQuizHint = async (question: string, lang: Language): Promise<string> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a small, helpful hint (not the answer) for this question: "${question}". ${getLangInstruction(lang)}`,
    });
    return response.text || "No hint available.";
};

export const generateVideo = async (prompt: string): Promise<string | null> => {
    const ai = getAI();
    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '16:9'
        }
    });
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (downloadLink) {
        return `${downloadLink}&key=${process.env.API_KEY}`;
    }
    return null;
};

export const generateImage = async (prompt: string): Promise<string | null> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: {
            imageConfig: {
                aspectRatio: "1:1"
            }
        }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
        }
    }
    return null;
};

export const analyzeDocument = async (text: string, imageBase64: string | null, url: string, lang: Language): Promise<DocAnalysisResult | null> => {
    const ai = getAI();
    const parts: any[] = [{ text: `Analyze this material. Provide summary, 5 key points, and a 3-question quiz. ${getLangInstruction(lang)}` }];
    if (text) parts.push({ text: `Source Text: ${text}` });
    if (url) parts.push({ text: `Source URL: ${url}` });
    if (imageBase64) parts.push({ inlineData: { data: imageBase64.split(',')[1], mimeType: 'image/jpeg' } });

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    summary: { type: Type.STRING },
                    keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                    quiz: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING },
                                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                                correctAnswer: { type: Type.NUMBER },
                                rationale: { type: Type.STRING }
                            }
                        }
                    }
                }
            }
        }
    });
    const data = robustJSONParse(response.text || "{}");
    if (data.summary) {
        return {
            ...data,
            id: `doc-${Date.now()}`,
            title: text?.slice(0, 30) || url?.slice(0, 30) || "Image Analysis",
            timestamp: Date.now()
        };
    }
    return null;
};

export const getGroundedChatResponse = async (query: string, sources: LMSource[], lang: Language): Promise<string> => {
    const ai = getAI();
    const sourceContext = sources.map(s => `SOURCE: ${s.title}\nCONTENT: ${s.content}`).join('\n\n');
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Use ONLY the following sources to answer the query: "${query}".\n\n${sourceContext}\n\n${getLangInstruction(lang)}`,
    });
    return response.text || "I cannot find an answer based on the provided sources.";
};

export const generateNotebookGuide = async (sources: LMSource[], lang: Language): Promise<LMGuide | null> => {
    const ai = getAI();
    const sourceContext = sources.map(s => `SOURCE: ${s.title}\nCONTENT: ${s.content}`).join('\n\n');
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Synthesize a notebook guide from these sources. ${getLangInstruction(lang)}\n\n${sourceContext}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    summary: { type: Type.STRING },
                    suggestedQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    topics: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            }
        }
    });
    return robustJSONParse(response.text || "null");
};

export const translateText = async (text: string, targetLang: string): Promise<string> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate the following text to ${targetLang}. Keep scholarly nuances.\n\n${text}`,
    });
    return response.text || text;
};

export const startVideoGeneration = async (prompt: string) => {
    const ai = getAI();
    return ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
            numberOfVideos: 1,
            resolution: '1080p',
            aspectRatio: '16:9'
        }
    });
};

export const pollVideoStatus = async (operation: any) => {
    const ai = getAI();
    return ai.operations.getVideosOperation({ operation });
};

export const analyzeScholarLens = async (imageBase64: string, query: string, lang: Language): Promise<string> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
            parts: [
                { text: `${query}. ${getLangInstruction(lang)}` },
                { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } }
            ]
        }
    });
    return response.text || "Unable to analyze image.";
};

export const generateScholarSlides = async (topic: string, lang: Language): Promise<Presentation | null> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Create an educational 5-slide presentation deck for "${topic}". Include title, bullet points, and speaker notes for each slide. ${getLangInstruction(lang)}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    topic: { type: Type.STRING },
                    slides: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                content: { type: Type.ARRAY, items: { type: Type.STRING } },
                                speakerNotes: { type: Type.STRING }
                            }
                        }
                    }
                }
            }
        }
    });
    const data = robustJSONParse(response.text || "{}");
    if (data.slides) return { ...data, id: `deck-${Date.now()}` };
    return null;
};

export const analyzeCloudStorage = async (context: string, lang: Language): Promise<CloudInsight[]> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this student study metadata and provide 3 strategic insights. ${getLangInstruction(lang)}\n\n${context}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        category: { type: Type.STRING },
                        summary: { type: Type.STRING },
                        recommendation: { type: Type.STRING }
                    }
                }
            }
        }
    });
    return robustJSONParse(response.text || "[]");
};

export const textToTable = async (text: string, lang: Language): Promise<any[]> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Convert this descriptive data into a structured JSON array of objects suitable for a spreadsheet. ${getLangInstruction(lang)}\n\n${text}`,
        config: { responseMimeType: "application/json" }
    });
    return robustJSONParse(response.text || "[]");
};

export const generateExamQuestions = async (subject: Subject, level: string, board: string, category: string, lang: Language): Promise<ExamQuestion[]> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate 5 exam questions for ${subject} (${level}, ${board}, ${category}). ${getLangInstruction(lang)}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        type: { type: Type.STRING, description: "MCQ, 2-Mark, or 5-Mark" },
                        question: { type: Type.STRING },
                        answer: { type: Type.STRING }
                    }
                }
            }
        }
    });
    const raw = robustJSONParse(response.text || "[]");
    return raw.map((q: any, i: number) => ({ ...q, id: `eq-${Date.now()}-${i}` }));
};

export const evaluatePaper = async (paper: ModelPaper, answers: Record<string, string>, lang: Language): Promise<GradedPaperResult | null> => {
    const ai = getAI();
    const prompt = `Grade this exam paper.
    PAPER: ${JSON.stringify(paper)}
    USER ANSWERS: ${JSON.stringify(answers)}
    
    Return a GradedPaperResult JSON. ${getLangInstruction(lang)}`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    totalScore: { type: Type.NUMBER },
                    maxScore: { type: Type.NUMBER },
                    percentage: { type: Type.NUMBER },
                    overallFeedback: { type: Type.STRING },
                    questionResults: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                questionId: { type: Type.STRING },
                                questionText: { type: Type.STRING },
                                userAnswer: { type: Type.STRING },
                                obtainedMarks: { type: Type.NUMBER },
                                maxMarks: { type: Type.NUMBER },
                                status: { type: Type.STRING },
                                feedback: { type: Type.STRING },
                                idealAnswer: { type: Type.STRING }
                            }
                        }
                    }
                }
            }
        }
    });
    return robustJSONParse(response.text || "null");
};

export const generateExamNotes = async (topic: string, lang: Language) => {
    const cached = dbService.getSavedResult('exam_notes', topic);
    if (cached) return cached;

    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate high-yield exam notes for "${topic}". ${getLangInstruction(lang)}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    keyTerms: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { term: { type: Type.STRING }, definition: { type: Type.STRING } } } },
                    bulletPoints: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            }
        }
    });
    const data = robustJSONParse(response.text || "null");
    if (data) dbService.saveResult('exam_notes', topic, data);
    return data;
};

export const generateModelPaper = async (subject: string, level: string, board: string, lang: Language, imageBase64?: string): Promise<ModelPaper | null> => {
    const aiKey = `${subject}_${level}_${board}`;
    const cached = dbService.getSavedResult('paper', aiKey);
    if (cached) return cached;

    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: imageBase64 ? 
            { parts: [{ text: `Generate a 100-mark ${board} exam paper for ${subject} based on this image source. ${getLangInstruction(lang)}` }, { inlineData: { data: imageBase64.split(',')[1], mimeType: 'image/jpeg' } }] } :
            `Generate a 100-mark ${board} exam paper for ${subject} (${level}). ${getLangInstruction(lang)}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    subject: { type: Type.STRING },
                    totalMarks: { type: Type.NUMBER },
                    sections: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                instruction: { type: Type.STRING },
                                questions: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            id: { type: Type.STRING },
                                            type: { type: Type.STRING },
                                            question: { type: Type.STRING },
                                            marks: { type: Type.NUMBER },
                                            options: { type: Type.ARRAY, items: { type: Type.STRING } }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    const data = robustJSONParse(response.text || '{}');
    if (data.sections) {
        data.board = board;
        data.level = level;
        data.createdAt = Date.now();
        dbService.saveResult('paper', aiKey, data);
    }
    return data;
};

export const searchPlaces = async (query: string, lang: Language): Promise<GeoResult> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite-latest',
        contents: `Provide educational facts about historical places in: ${query}. ${getLangInstruction(lang)}`,
        config: { tools: [{ googleMaps: {} }] }
    });
    const places = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.maps?.title || "Educational Site",
        uri: chunk.maps?.uri || "#"
    })) || [];
    return { text: response.text || "", places };
};

export const performGlobalSearch = async (query: string, lang: Language) => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `${query}. ${getLangInstruction(lang)}`,
        config: { tools: [{ googleSearch: {} }] }
    });
    const citations = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || "Search Result",
        uri: chunk.web?.uri || "#"
    })) || [];
    return { text: response.text || "", citations };
};

export async function* streamGeminiResponse(prompt: string) {
    try {
        // Try Gemini streaming first
        const ai = getAI();
        const response = await ai.models.generateContentStream({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        let hasContent = false;
        for await (const chunk of response) {
            const text = chunk.text || "";
            if (text) {
                hasContent = true;
                yield text;
            }
        }
        if (hasContent) return;
    } catch (error: any) {
        console.warn("Gemini streaming failed:", error?.message);
        // Fallback to multiAIService if Gemini fails
    }

    // Automatic fallback to multi-AI service (yield response in chunks)
    try {
        const multiResponse = await multiAIService.generateResponse(prompt, 'en');
        // Yield response in reasonable chunks for streaming effect
        const chunkSize = 50;
        for (let i = 0; i < multiResponse.length; i += chunkSize) {
            yield multiResponse.substring(i, i + chunkSize);
            // Small delay to simulate streaming
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    } catch (fallbackError) {
        console.error("All streaming services failed:", fallbackError);
        yield "Sorry, streaming service temporarily unavailable. Please retry.";
    }
}

export const generateSpeech = async (text: string, voice: string): Promise<string | null> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
        },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
};

export const connectLiveTutor = async (lang: Language, callbacks: any) => {
    const ai = getAI();
    return ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks,
        config: {
            responseModalities: [Modality.AUDIO],
            systemInstruction: `Academic tutor. ${getLangInstruction(lang)}`
        }
    });
};

export const generateStudyBuddyLesson = async (topic: string, level: string, lang: Language) => {
    const cached = dbService.getSavedResult('buddy_lesson', topic);
    if (cached) return cached;

    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Masterclass tutor on "${topic}" for ${level}. ${getLangInstruction(lang)}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                    parts: { type: Type.ARRAY, items: { type: Type.STRING } },
                    followUps: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            }
        }
    });
    const data = robustJSONParse(response.text || "{}");
    if (data.title) dbService.saveResult('buddy_lesson', topic, data);
    return data;
};

export const analyzeCode = async (code: string, lang: string, mode: string, targetLang?: string): Promise<CodeSnippet | null> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Code ${mode}: ${code}. ${targetLang ? 'Target: ' + targetLang : ''}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    code: { type: Type.STRING },
                    language: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                }
            }
        }
    });
    const data = robustJSONParse(response.text || "{}");
    return { ...data, id: `code-${Date.now()}`, timestamp: Date.now() };
};

export const generateMindMapData = async (topic: string, lang: Language): Promise<MindMapNode | null> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Mind map tree for ${topic}. ${getLangInstruction(lang)}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    label: { type: Type.STRING },
                    children: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                label: { type: Type.STRING },
                                children: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: { type: Type.STRING } } } }
                            }
                        }
                    }
                }
            }
        }
    });
    return robustJSONParse(response.text || "null");
};

export const generateCareerRoadmap = async (interests: string, strengths: string, subjects: string, lang: Language): Promise<CareerRoadmap[]> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Career roadmap for interests: ${interests}, strengths: ${strengths}. ${getLangInstruction(lang)}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        careerTitle: { type: Type.STRING },
                        matchScore: { type: Type.NUMBER },
                        description: { type: Type.STRING },
                        skillsRequired: { type: Type.ARRAY, items: { type: Type.STRING } },
                        educationPath: { type: Type.ARRAY, items: { type: Type.STRING } },
                        potentialRoles: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                }
            }
        }
    });
    return robustJSONParse(response.text || "[]");
};

export const generateStudyPlan = async (exam: string, days: number, subjects: string, lang: Language): Promise<StudyPlan | null> => {
    // Check Permanent DB
    if (SAVED_PLANS[exam]) return SAVED_PLANS[exam];

    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Study plan for ${exam} (${days} days). ${getLangInstruction(lang)}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    examName: { type: Type.STRING },
                    totalDays: { type: Type.NUMBER },
                    schedule: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                day: { type: Type.NUMBER },
                                topics: { type: Type.ARRAY, items: { type: Type.STRING } },
                                tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
                            }
                        }
                    }
                }
            }
        }
    });
    return robustJSONParse(response.text || "null");
};

export const fetchCompetitionTopics = async (exam: string, subject: string, lang: Language): Promise<CompetitionTopic[]> => {
    // Check Permanent DB
    const key = `${exam}-${subject}`;
    if (COMPETITION_DB[key]) return COMPETITION_DB[key];

    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Priority topics for ${exam} in ${subject}. ${getLangInstruction(lang)}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        importance: { type: Type.STRING }
                    }
                }
            }
        }
    });
    const raw = robustJSONParse(response.text || "[]");
    return raw.map((t: any, i: number) => ({ ...t, id: `ct-ai-${Date.now()}-${i}` }));
};
