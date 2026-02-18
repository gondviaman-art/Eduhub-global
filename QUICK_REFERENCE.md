# ⚡ Quick Reference Guide

Quick lookup for common tasks and commands.

## 🚀 Essential Commands

```bash
npm run dev       # Start development server (http://localhost:3000)
npm run build     # Build for production
npm run preview   # Preview production build locally
```

## 📦 Project Structure

| Folder | Purpose |
|--------|---------|
| `pages/` | Feature pages (33+ components) |
| `components/` | Reusable UI components |
| `services/` | Business logic (AI, auth, db) |
| `data/` | Offline data & cache |
| `types.ts` | TypeScript definitions |
| `constants.ts` | App constants |

## 🎯 Common Patterns

### Display a Loading State
```typescript
const [loading, setLoading] = useState(false);

if (loading) return <div>Loading...</div>;
```

### Fetch AI Response
```typescript
import { getGeminiResponse } from '../services/geminiService';

const response = await getGeminiResponse(prompt, 'en');
```

### Save Data
```typescript
import { dbService } from '../services/dbService';

await dbService.save('key', data);
const data = await dbService.load('key');
```

### Navigate
```typescript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/path');
```

### Use Language
```typescript
const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
const t = TRANSLATIONS[currentLanguage];
<h1>{t.pageTitle}</h1>
```

## 🔍 Quick Debug Tips

| Issue | Solution |
|-------|----------|
| Blank page | F12 → Console for errors |
| API not working | Check `.env.local` has key |
| Port in use | `lsof -ti:3000 \| xargs kill -9` |
| Styles not updating | Ctrl+Shift+R (hard refresh) |
| TypeScript errors | Save file (Ctrl+S) |
| Data not saving | Check localStorage in DevTools |

## 📝 Component Template

```typescript
import React, { useState } from 'react';

export const ComponentName: React.FC = () => {
  const [state, setState] = useState('');

  return <div>{state}</div>;
};
```

## 🔐 API Key Setup

1. Get key: https://ai.google.dev
2. Add to `.env.local`: `GEMINI_API_KEY=AIza...`
3. Restart dev server with Ctrl+C then `npm run dev`

## 🌐 Multi-Language Example

```typescript
const TRANSLATIONS = {
  en: { title: "Hello" },
  hi: { title: "नमस्ते" }
};

const t = TRANSLATIONS[currentLanguage];
<h1>{t.title}</h1>
```

## 📱 Responsive Design Breakpoints

Use standard CSS media queries:
```typescript
const styles = {
  container: {
    fontSize: { xs: '12px', md: '16px', lg: '20px' }
  }
};
```

## ✅ Pre-Commit Checklist

- [ ] No `console.log()` statements left
- [ ] No `debugger;` statements
- [ ] Features tested in browser
- [ ] `.env.local` NOT added to git
- [ ] TypeScript compiles (no red squiggles)
- [ ] Build succeeds: `npm run build`

## 🚀 Deploy Commands

```bash
# Build for production
npm run build

# Deploy to Vercel
npm install -g vercel
vercel

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod
```

## 📞 Quick Links

- [Google Gemini API](https://ai.google.dev)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://typescriptlang.org)
- [Vite Guide](https://vitejs.dev)

---

**Pro Tip**: Bookmark this page for quick reference while developing!
