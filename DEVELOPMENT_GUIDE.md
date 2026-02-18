# 🛠️ Development Guide - EduSphere AI

Complete guide for developing, extending, and contributing to EduSphere AI.

## Table of Contents
1. [Project Setup](#project-setup)
2. [Development Workflow](#development-workflow)
3. [Feature Development](#feature-development)
4. [Code Structure & Patterns](#code-structure--patterns)
5. [Testing & Debugging](#testing--debugging)
6. [Performance & Optimization](#performance--optimization)
7. [Deployment Checklist](#deployment-checklist)

---

## Project Setup

### Environment Requirements
- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher
- **Browser**: Modern browser (Chrome 120+, Firefox 121+, Safari 17+)
- **Text Editor**: VS Code recommended

### First-Time Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd Eduhub-global

# 2. Install dependencies
npm install

# 3. Get Gemini API Key
# Visit https://ai.google.dev and create a free API key

# 4. Create .env.local
echo "GEMINI_API_KEY=your_key_here" > .env.local

# 5. Start development server
npm run dev

# 6. Open browser to http://localhost:3000
```

### Verify Installation
```bash
# Check Node version (should be 18+)
node --version

# Check npm version (should be 9+)
npm --version

# Verify dependencies
npm list --depth=0

# Check development server
curl http://localhost:3000
```

---

## Development Workflow

### Daily Development

```bash
# 1. Start dev server (if not running)
npm run dev

# 2. Make code changes in your editor
# (Changes auto-reload in browser)

# 3. Check for TypeScript errors
# (Error notifications appear in terminal and browser)

# 4. Test features in browser (http://localhost:3000)

# 5. Commit changes
git add .
git commit -m "feat: description of changes"

# 6. Before pushing, build and test
npm run build
npm run preview
# Visit http://localhost:4173 to verify production build
```

### File Changes & Hot Reload

The development server automatically reloads when you:
- Modify `.tsx` or `.ts` files
- Update `.css` or styles
- Change environment variables (restart required)

### Stopping the Dev Server

```bash
# Press Ctrl+C in terminal, or:
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

## Feature Development

### Creating a New Page/Feature

#### Step 1: Create the Page Component
Create `pages/MyNewFeature.tsx`:

```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MyNewFeature: React.FC = () => {
  const [state, setState] = useState('initial');
  const navigate = useNavigate();

  return (
    <div className="feature-container">
      <h1>My New Feature</h1>
      <p>Content here</p>
    </div>
  );
};
```

#### Step 2: Add Route in App.tsx
```typescript
import { MyNewFeature } from './pages/MyNewFeature';

// Inside <Routes> component:
<Route path="/my-feature" element={<MyNewFeature />} />
```

#### Step 3: Add Navigation
Update `TRANSLATIONS` and navigation menus:

```typescript
export const TRANSLATIONS = {
  en: {
    myFeature: "My New Feature",
    // ...
  },
  hi: {
    myFeature: "मेरी नई सुविधा",
    // ...
  }
};
```

#### Step 4: Add to Navigation Sidebar
Update the navigation menu in `components/Layout.tsx`:

```typescript
const menuItems = [
  // ... existing items ...
  { id: 'my-feature', label: t('myFeature'), icon: IconComponent }
];
```

### Using AI Features

```typescript
import { getGeminiResponse } from '../services/geminiService';

// In your component function:
const handleAIQuery = async (prompt: string) => {
  try {
    const response = await getGeminiResponse(prompt, currentLanguage);
    console.log(response);
  } catch (error) {
    console.error('AI Error:', error);
  }
};
```

For complex AI tasks:
```typescript
import { geminiService } from '../services/geminiService';

// For specific features:
const quizzes = await geminiService.generateQuiz(topic, level, language);
const modelPaper = await geminiService.generateModelPaper(subject, examType);
const notes = await geminiService.generateNotes(content, topic);
```

### Data Persistence

#### Saving Data
```typescript
import { dbService } from '../services/dbService';

// Save data
await dbService.save('user_notebook', {
  id: '123',
  title: 'My Notes',
  content: 'Some content'
});
```

#### Loading Data
```typescript
// Load data
const notebook = await dbService.load('user_notebook');
if (notebook) {
  console.log(notebook);
}
```

#### Check Offline Database
```typescript
// Access permanent offline database
import { SAVED_PLANS, SAVED_ARTICLES } from '../data/permanentDB';

const savedPlans = SAVED_PLANS;
```

### Multi-Language Support

```typescript
// Create translation keys in TRANSLATIONS object
export const TRANSLATIONS = {
  en: {
    newFeature: {
      title: "Feature Title",
      description: "Feature Description",
      placeholder: "Enter something"
    }
  },
  hi: {
    newFeature: {
      title: "सुविधा शीर्षक",
      description: "सुविधा विवरण",
      placeholder: "कुछ दर्ज करें"
    }
  }
};

// Use in component
const t = TRANSLATIONS[currentLanguage];
<h1>{t.newFeature.title}</h1>
```

---

## Code Structure & Patterns

### Component Patterns

#### Functional Component Template
```typescript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const FeatureName: React.FC = () => {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load data on mount
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch data
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="feature-container">
      {/* Content */}
    </div>
  );
};
```

### Service Patterns

#### Creating a New Service
Create `services/myService.ts`:

```typescript
// Types
interface MyData {
  id: string;
  title: string;
  content: string;
}

// Service
export const myService = {
  async fetch(id: string): Promise<MyData> {
    // Implement fetch logic
    return data;
  },

  async save(data: MyData): Promise<void> {
    // Implement save logic
  },

  async delete(id: string): Promise<void> {
    // Implement delete logic
  }
};
```

### Styling Patterns

The app uses inline styles and CSS modules. For new features:

```typescript
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333'
  }
};

export const MyFeature = () => (
  <div style={styles.container}>
    <h1 style={styles.title}>Title</h1>
  </div>
);
```

---

## Testing & Debugging

### Browser DevTools

#### Check Console Errors
1. Open DevTools (F12)
2. Go to **Console** tab
3. Look for red error messages
4. Click on error to see stack trace

#### Debug Network Requests
1. Go to **Network** tab
2. Make API calls
3. See request/response details
4. Check for failed requests

#### Inspect Elements
1. Go to **Elements** tab
2. Hover over elements in inspector
3. See live CSS styles
4. Make temporary style changes to test

#### Check localStorage
1. Go to **Application** tab
2. Left sidebar → **Storage** → **Local Storage**
3. See all saved user data
4. Delete entries to test clean state

### TypeScript Error Checking

```bash
# Check for TypeScript errors (without building)
npm run type-check

# View errors in VS Code
# Errors appear with squiggly red underlines
# Error details in Problems panel (Ctrl+Shift+M)
```

### Manual Testing Checklist

- [ ] Features load without errors
- [ ] AI responses appear correctly
- [ ] Data saves to localStorage
- [ ] Navigation works
- [ ] Responsive design (test mobile view)
- [ ] Language switching works
- [ ] Offline mode functions
- [ ] All buttons are clickable
- [ ] Forms validate input
- [ ] Error messages display clearly

### Common Debugging Techniques

```typescript
// 1. Console logging
console.log('Value:', value);
console.error('Error:', error);
console.table(arrayData);

// 2. Conditional breakpoints
debugger; // Pauses execution here (remove before commit)

// 3. React DevTools
// Install React DevTools extension in Chrome
// Inspect components and watch state changes

// 4. Network issues
// Check CORS errors in console
// Verify API key in .env.local
// Test API manually with curl
```

---

## Performance & Optimization

### Bundle Size

```bash
# Analyze bundle size
npm run build

# Output shows size per file
# Target: Keep bundle under 500KB
```

### Optimization Tips

1. **Lazy Load Components**
   ```typescript
   const LazyComponent = React.lazy(() => import('./pages/Heavy'));
   
   <Suspense fallback={<Loading />}>
     <LazyComponent />
   </Suspense>
   ```

2. **Memoize Expensive Components**
   ```typescript
   const MyComponent = React.memo(({ prop }) => {
     return <div>{prop}</div>;
   });
   ```

3. **Optimize Images**
   - Use modern formats (WebP)
   - Compress images
   - Lazy load images with `loading="lazy"`

4. **Remove Unused Dependencies**
   ```bash
   npm unused
   ```

### Caching Strategy

- Static assets: Vite handles automatically
- API responses: Use localStorage caching
- User data: permanentDB for offline access

---

## Deployment Checklist

### Before Deployment

- [ ] Remove all `console.log()` statements
- [ ] Remove all `debugger;` statements
- [ ] Test all features work
- [ ] Verify `.env.local` is NOT committed
- [ ] Update version in `package.json`
- [ ] Update `README.md` with changes
- [ ] Test on mobile devices
- [ ] Run production build locally: `npm run build && npm run preview`
- [ ] Check for TypeScript errors: `npm run build`
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)

### Build for Production

```bash
# 1. Build the app
npm run build

# 2. This creates 'dist/' folder with optimized files
# 3. Preview the production build
npm run preview

# 4. Visit http://localhost:4173
```

### Deploy Steps

**For Vercel:**
```bash
npm install -g vercel
vercel
# Follow prompts, connect to GitHub
```

**For Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**For GitHub Pages:**
```bash
# Update vite.config.ts with correct base path
# Build and commit dist/ folder
npm run build
git add dist/
git commit -m "build: production build"
git push
```

### Post-Deployment

- [ ] Test deployed site works
- [ ] Check all features function
- [ ] Verify API key works (if needed)
- [ ] Test on mobile
- [ ] Monitor console for errors
- [ ] Check Analytics (if integrated)

---

## Git Workflow

### Commit Message Format

```
type: description

type can be:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Code style
- refactor: Code refactoring
- perf: Performance improvement
- test: Adding tests
```

Examples:
```
feat: add quiz feature to dashboard
fix: resolve Gemini API timeout issue
docs: update README with new features
refactor: optimize dbService performance
```

### Branch Naming

```
feature/feature-name
bugfix/bug-name
docs/what-documents
```

### Creating a Pull Request

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes and commits
git add .
git commit -m "feat: add new feature"

# 3. Push to GitHub
git push origin feature/my-feature

# 4. Create PR on GitHub with description
```

---

## Useful Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Maintenance
npm update              # Update all dependencies
npm outdated            # Check for outdated packages
npm audit              # Check for security issues

# Cleanup
rm -rf node_modules    # Remove dependencies
npm install            # Reinstall dependencies
npm cache clean --force # Clear npm cache
```

---

## Troubleshooting Common Issues

### Issue: Dev server won't start
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Issue: Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Gemini API not working
- Verify API key in `.env.local`
- Check API key format (should start with `AIza`)
- Verify key has Gemini API enabled
- Check browser console for errors

### Issue: TypeScript errors
- Save the file (VSCode may need to recompile)
- Reload window (Ctrl+Shift+P → Reload)
- Check tsconfig.json is valid

### Issue: Blank white page
- Check browser console (F12)
- Clear localStorage (DevTools → Application)
- Hard refresh (Ctrl+Shift+R)
- Check `.env.local` exists

### Issue: Styles not updating
- Hard refresh (Ctrl+Shift+R)
- Clear browser cache
- Restart dev server

---

## Additional Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Google Gemini API](https://ai.google.dev)
- [React Router](https://reactrouter.com)
- [MDN Web Docs](https://developer.mozilla.org)

---

**Last Updated**: February 2026
**Maintained By**: EduSphere AI Team
