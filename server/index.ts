import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 5000;
const JWT_SECRET = 'edusphere_v14_secure_key_2025';

// Initialize Gemini AI on backend using the environment secret
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// --- Persistence Layer (Mock Store - Structured for easy migration to MongoDB) ---
let users: any[] = [];
let chats: Record<string, any[]> = {}; // Key: userId_subject
let notebooks: Record<string, any[]> = {}; // Key: userId

// --- Authentication Middleware ---
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- AUTHENTICATION ROUTES ---
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, educationLevel } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "Email already registered" });
  }
  
  const newUser = {
    id: Date.now().toString(),
    name, email, password, educationLevel,
    points: 0, streak: 1, joinedAt: new Date().toISOString(),
    badges: [],
    progress: { masteredTopics: [], totalStudyMinutes: 0, subjectStrengths: {}, recentActivity: [] }
  };
  users.push(newUser);
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET);
  res.json({ user: newUser, token });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid email or password" });
  
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
  res.json({ user, token });
});

app.get('/api/auth/me', authenticateToken, (req: any, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.sendStatus(404);
  res.json(user);
});

// --- AI PROXY ROUTES ---
app.post('/api/ai/generate', authenticateToken, async (req, res) => {
  try {
    const { prompt, config, model = 'gemini-3-flash-preview' } = req.body;
    
    // For multimodal parts
    const contents = typeof prompt === 'string' ? prompt : prompt;

    const response = await ai.models.generateContent({
      model,
      contents,
      config
    });
    
    res.json({ 
        text: response.text, 
        candidates: response.candidates 
    });
  } catch (error: any) {
    console.error("Gemini Proxy Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- PERSISTENCE ROUTES (Progress, Notebook, Chat) ---
app.get('/api/user/notebook', authenticateToken, (req: any, res) => {
  res.json(notebooks[req.user.id] || []);
});

app.post('/api/user/notebook', authenticateToken, (req: any, res) => {
  notebooks[req.user.id] = req.body.folders;
  res.json({ success: true });
});

app.get('/api/chat/:subject', authenticateToken, (req: any, res) => {
  const key = `${req.user.id}_${req.params.subject}`;
  res.json(chats[key] || []);
});

app.post('/api/chat/:subject', authenticateToken, (req: any, res) => {
  const key = `${req.user.id}_${req.params.subject}`;
  if (!chats[key]) chats[key] = [];
  chats[key].push(req.body.message);
  res.json({ success: true });
});

app.post('/api/user/progress', authenticateToken, (req: any, res) => {
  const userIndex = users.findIndex(u => u.id === req.user.id);
  if (userIndex === -1) return res.sendStatus(404);
  users[userIndex].progress = req.body.progress;
  users[userIndex].points = req.body.points || users[userIndex].points;
  res.json(users[userIndex]);
});

app.listen(PORT, () => console.log(`EduSphere Secure Backend running on port ${PORT}`));