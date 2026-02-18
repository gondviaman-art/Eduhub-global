# 🎓 EduSphere AI - Eduhub Global

A comprehensive, AI-powered educational platform with 33+ features for personalized learning, skill development, and academic excellence.

## ✨ Features at a Glance

### Core Learning Tools
- **AI Tutor** - Interactive chatbot with Gemini AI integration
- **Doubt Chat** - Real-time query resolution with AI
- **Fact Zone** - Curated knowledge base and facts
- **Deep Knowledge** - In-depth analysis and research articles
- **Quiz Hub** - Interactive quizzes with instant feedback

### Productivity & Organization
- **My Notebook** - Digital notes management
- **DocuMind** - Document analysis and insights
- **Study Planner** - Structured learning schedules
- **Mind Map** - Visual knowledge organization
- **Notes Generator** - Auto-generated study notes

### Creative & Multimedia
- **Audio Studio** - Audio content creation and editing
- **Cinematic Studio** - Video content creation
- **Cinema Hub** - Multimedia learning hub
- **Scholar Slides** - Presentation generation

### Advanced Features
- **Model Paper Generator** - Practice exam papers
- **Code Lab** - Programming learning environment
- **Career Compass** - Career guidance and planning
- **Global Search** - Unified knowledge search
- **GeoQuest** - Geography learning game
- **Lingua Sphere** - Language learning tools
- **Study Buddy** - Peer learning facilitation
- **Cloud Node** - Cloud-based project management
- **Data Sheet** - Data analysis tools
- **Scholar Lens** - Educational content analysis
- **NotebookLM** - Research notebook management
- **Competition Prep** - Exam preparation tools
- **Live Tutor** - Real-time tutoring sessions
- **News Feed** - Educational news and updates
- **Question Generator** - Custom question creation

## 📋 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 19 + TypeScript |
| **Build Tool** | Vite 6 |
| **Routing** | React Router DOM v7 |
| **Icons** | Lucide React |
| **AI Engine** | Google Gemini AI |
| **Backend** | Express.js (optional) |
| **Auth** | JWT Token-based |
| **Storage** | Browser localStorage |
| **Architecture** | Offline-first, Client-side optimized |

## 🚀 Quick Start

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Configure API Key

Get your free **Gemini API key**:
1. Visit [Google AI Studio](https://ai.google.dev)
2. Click "Create API Key"
3. Copy the key

Create/update `.env.local`:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 3️⃣ Start Development Server
```bash
npm run dev
```

The app will open at:
- **Local**: `http://localhost:3000/`
- **Network**: `http://10.0.5.210:3000/` (if on same network)

### 4️⃣ Build for Production
```bash
npm run build
```

### 5️⃣ Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
Eduhub-global/
├── components/
│   └── Layout.tsx              # Main page layout
├── pages/                       # 33+ feature pages
│   ├── Landing.tsx             # Welcome/login
│   ├── Register.tsx            # Sign up
│   ├── DashboardHome.tsx       # Main dashboard
│   ├── Chatbot.tsx            # AI Tutor
│   ├── Quiz.tsx               # Quiz Hub
│   ├── ModelPaper.tsx         # Exam paper generator
│   └── ... (27+ more features)
├── services/
│   ├── geminiService.ts        # AI integration
│   ├── authService.ts          # Authentication
│   ├── dbService.ts            # Data management
│   └── api.ts                  # API helpers
├── data/
│   ├── permanentDB.ts          # Offline database
│   └── offlineData.ts          # Cached content
├── server/                      # Optional backend
│   └── index.ts                # Express backend
├── App.tsx                     # Main component
├── types.ts                    # Type definitions
├── constants.ts                # App constants
├── vite.config.ts              # Build config
└── tsconfig.json               # TypeScript config
```

## 🏗️ Architecture

### Client-Side First Design
- ✅ **Zero Startup Latency** - App loads instantly
- ✅ **Offline Ready** - Works without internet (with cached data)
- ✅ **Private by Default** - Data stays in browser
- ✅ **Scalable** - Optional Express backend for future growth

### Data Flow
```
Browser Cache → localStorage → permanentDB → Gemini AI
```

### Technology Highlights
- **TypeScript** - Type-safe development
- **React 19** - Latest React features
- **Vite** - Lightning-fast builds
- **Gemini AI** - Advanced AI capabilities

## 🎯 Common Development Tasks

### Add a New Feature
1. Create new file in `pages/YourFeature.tsx`
2. Import in `App.tsx`
3. Add route: `<Route path="/your-feature" element={<YourFeature />} />`
4. Add translation in `TRANSLATIONS` object

### Use AI in Your Components
```typescript
import { getGeminiResponse } from './services/geminiService';

// In your component:
const response = await getGeminiResponse("Your prompt", 'en');
```

### Save/Load User Data
```typescript
import { dbService } from './services/dbService';

// Save
await dbService.save('key', data);

// Load
const data = await dbService.load('key');
```

### Language Support
- English (en)
- Hindi (hi)

Change language by updating the `currentLanguage` state.

## 🔐 Security Best Practices

1. **Never commit `.env.local`** with real API keys
2. **Use server-side proxying** for production (optional backend in `server/`)
3. **Validate all user inputs** before processing
4. **Implement CORS properly** if using backend
5. **Use HTTPS** in production

## 📱 Supported Browsers

| Browser | Version |
|---------|---------|
| Chrome/Edge | 120+ |
| Firefox | 121+ |
| Safari | 17+ |
| Mobile Chrome | Latest |
| Mobile Safari | 17+ |

## 🐛 Troubleshooting

### ❌ "Gemini API not working"
- ✓ Check `.env.local` has `GEMINI_API_KEY` set
- ✓ Verify key is valid at [Google AI Studio](https://ai.google.dev)
- ✓ Check browser console (F12) for errors
- ✓ Ensure API key format: `AIza...`

### ❌ "Port 3000 already in use"
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

### ❌ "Build errors or blank page"
```bash
# Clear everything and reinstall
rm -rf node_modules dist
npm install
npm run build
npm run preview
```

### ❌ "Features not loading"
- Clear localStorage (DevTools → Application → Storage)
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check if `.env.local` is present and valid

## 📊 Performance Tips

1. **Enable Browser Caching** - Vite automatically caches assets
2. **Use Offline Mode** - App syncs when reconnected
3. **Clear Old Data** - Use DevTools to manage localStorage
4. **Monitor Bundle Size** - `npm run build` shows size breakdown

## 🔄 Deployment

### Deploy to Production

**Vercel** (Recommended for Vite)
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**GitHub Pages**
1. Build: `npm run build`
2. Upload `dist/` folder to GitHub Pages

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Google Gemini API](https://ai.google.dev)
- [React Router Docs](https://reactrouter.com)

## 🚀 Next Steps

1. ✅ Your dev server is running!
2. 📝 Explore all 33+ features in the dashboard
3. 🔑 Get your Gemini API key from [Google AI Studio](https://ai.google.dev)
4. 🛠️ Update `.env.local` with your API key
5. 🚀 Start building your custom features!

## 📞 Support & Issues

1. Check console for error messages (F12)
2. Review [REPORT_FROM_BUILDER.txt](./REPORT_FROM_BUILDER.txt) for architecture details
3. Check existing GitHub issues
4. Review code comments in problematic files

## 📄 License

EduSphere AI - Educational Platform v1.4

---

**Current Status**: ✅ Development Server Running
**Ready To Use**: Yes - Complete feature set available
**Latest Update**: February 18, 2026
