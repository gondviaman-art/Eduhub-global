# 🤖 Eduhub AI Multi-Provider Setup Guide

This guide helps you configure AI APIs for your Eduhub application. The app now supports **5 different AI providers** with intelligent automatic fallback - if one provider fails or quota is exceeded, the app automatically switches to the next available provider.

## 📊 Provider Comparison

| Provider | Cost | Speed | Quality | Setup Time | Use Case |
|----------|------|-------|---------|-----------|----------|
| **Google Gemini** | ✅ FREE (₹0) | 🚀 Very Fast | ⭐⭐⭐⭐⭐ | 5 min | PRIMARY (try first) |
| **OpenAI ChatGPT** | 💰 Paid (~₹100+/month) | 🚀 Fast | ⭐⭐⭐⭐⭐ | 10 min | FALLBACK 2 |
| **Anthropic Claude** | 💰 Paid (~₹100+/month) | 🚀 Fast | ⭐⭐⭐⭐⭐ | 10 min | FALLBACK 3 |
| **Cohere** | ✅ FREE (500K tokens/month) | ⚡ Moderate | ⭐⭐⭐⭐ | 5 min | FALLBACK 4 |
| **Together AI** | ✅ FREE (~$1 credit) | ⚡ Moderate | ⭐⭐⭐⭐ | 5 min | FALLBACK 5 |

## 🎯 Recommended Setup Scenarios

### **Scenario 1: FREE ONLY (No spending)**
- ✅ Google Gemini (FREE)
- ✅ Cohere (FREE - 500K tokens)
- ✅ Together AI (FREE - $1 credit)
- Setup time: 15 minutes
- Cost: ₹0
- Reliability: Good (3 free providers)

### **Scenario 2: SAFER (Recommended for production)**
- ✅ Google Gemini (FREE)
- ✅ OpenAI ChatGPT (₹200/month budget)
- ✅ Cohere (FREE)
- Setup time: 25 minutes
- Cost: ~₹200/month
- Reliability: Excellent (1 free + 1 paid)

### **Scenario 3: BEST (Maximum reliability)**
- ✅ Google Gemini (FREE)
- ✅ OpenAI ChatGPT (₹200/month)
- ✅ Anthropic Claude (₹200/month)
- ✅ Cohere (FREE)
- ✅ Together AI (FREE)
- Setup time: 45 minutes
- Cost: ~₹400/month
- Reliability: Outstanding (3 free + 2 paid)

---

## 🔑 Step-by-Step API Setup

### **1️⃣ Google Gemini (FREE - Recommended First)**

Google Gemini is **FREE** with generous limits. Perfect starting point!

**Setup:**
1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Create API Key" (accepts all users, no credit card)
3. Copy the API key
4. Add to `.env.local`:
   ```bash
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

**Free Tier:**
- 60 requests per minute (RPM)
- 1500 requests per day
- Perfect for educational use

**Limits:**
- If you hit 1500 requests/day, system auto-switches to next provider ✅

---

### **2️⃣ OpenAI ChatGPT (PAID - ₹200+/month)**

Premium quality GPT-4 responses.

**Setup:**
1. Visit [OpenAI Platform](https://platform.openai.com/account/billing/overview)
2. Click "Create new secret key"
3. Copy the key (`sk-...`)
4. Add **$5-$20 credit** to account (₹400-₹1600)
5. Add to `.env.local`:
   ```bash
   VITE_OPENAI_API_KEY=sk_your_key_here
   ```

**Free Trial:**
- $18 free credit (expires after 3 months) ✅
- Start here FIRST before adding payment

**Pricing:**
- GPT-4o: ₹5 per 1M input tokens (very cheap)
- For student app: ₹100-300/month typical

**When Used:**
- Fallback 2 (if Gemini fails)

---

### **3️⃣ Anthropic Claude (PAID - ₹200+/month)**

Most harmless, educational-friendly AI.

**Setup:**
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create account (accept 18+)
3. Click "Create API Key"
4. Add $5-$20 USD credit
5. Add to `.env.local`:
   ```bash
   VITE_CLAUDE_API_KEY=sk-ant-your_key_here
   ```

**Pricing:**
- Claude 3 Haiku: ₹1.5 per 1M input tokens (cheapest)
- Claude 3.5 Sonnet: ₹5 per 1M input tokens (premium)
- For student app: ₹100-300/month typical

**When Used:**
- Fallback 3 (if Gemini + OpenAI fail)

---

### **4️⃣ Cohere (FREE - 500K tokens/month)**

Generous FREE tier, perfect fallback.

**Setup:**
1. Visit [Cohere Dashboard](https://dashboard.cohere.com/)
2. Sign up (instant approval)
3. Go to API Keys → Create → "Trial"
4. Copy the key (`8xx...`)
5. Add to `.env.local`:
   ```bash
   VITE_COHERE_API_KEY=your_key_here
   ```

**Free Tier:**
- 500,000 tokens/month (approximately 100K-200K requests)
- Excellent fallback option
- No credit card needed

**When Used:**
- Fallback 4 (if Gemini, OpenAI, Claude fail)

---

### **5️⃣ Together AI (FREE - $1 credit)**

Community-driven, uses open source models.

**Setup:**
1. Visit [Together AI](https://www.together.ai/)
2. Sign up with GitHub/Google
3. Get $1 free credit
4. Go to Dashboard → API Keys → Create
5. Copy key
6. Add to `.env.local`:
   ```bash
   VITE_TOGETHER_API_KEY=your_key_here
   ```

**Free Tier:**
- $1 initial credit
- Can request more credit (free research program)
- 400K tokens/month typical on free tier

**When Used:**
- Fallback 5 (ultimate backup)

---

## 📝 Configure Your App

### **Step 1: Copy environment template**
```bash
cp .env.example .env.local
```

### **Step 2: Add your API keys**

Open `.env.local` and fill in the keys you have:

```bash
# MINIMUM SETUP (Just Gemini FREE)
VITE_GEMINI_API_KEY=AIzaSy...your_key...

# SAFER SETUP (Gemini + OpenAI)
VITE_GEMINI_API_KEY=AIzaSy...your_key...
VITE_OPENAI_API_KEY=sk-proj-...your_key...

# BEST SETUP (All 5)
VITE_GEMINI_API_KEY=AIzaSy...your_key...
VITE_OPENAI_API_KEY=sk-proj-...your_key...
VITE_CLAUDE_API_KEY=sk-ant-...your_key...
VITE_COHERE_API_KEY=8xx-...your_key...
VITE_TOGETHER_API_KEY=your_key_here
```

### **Step 3: Restart development server**
```bash
npm run dev
```

The app will auto-detect available providers and use them in priority order.

---

## ✅ How the Fallback System Works

```
User sends message
         ↓
    Try Gemini (FREE) → ✅ Success? Done!
         ↓ (Failed/Quota)
    Try OpenAI (Paid) → ✅ Success? Done!
         ↓ (Failed/Quota)
    Try Claude (Paid) → ✅ Success? Done!
         ↓ (Failed/Quota)
    Try Cohere (FREE) → ✅ Success? Done!
         ↓ (Failed/Quota)
    Try Together AI (FREE) → ✅ Success? Done!
         ↓ (All failed)
    Use Mock Response → 🎯 Feature still works!
```

**Key Features:**
- ✅ **Automatic switching** - No manual intervention
- ✅ **Quota-aware** - Detects HTTP 429 errors
- ✅ **Priority based** - Always tries best option first
- ✅ **Graceful degradation** - Works offline with mock responses
- ✅ **Monitoring** - Check API status anytime

---

## 🧪 Testing the Multi-AI System

### **Test 1: Check available providers**
```javascript
// In browser console (F12)
import { multiAIService } from './services/multiAIService';
console.log(multiAIService.getProviderStatus());
```

**Expected output:**
```json
{
  "available": ["gemini", "cohere", "together"],
  "failed": [],
  "gemini": { "status": "available", "requests": 5 },
  "openai": { "status": "not_configured" },
  "claude": { "status": "not_configured" }
}
```

### **Test 2: Test AI response**
1. Open **Chatbot** page
2. Send: "Hello, which AI are you?"
3. Look at console for provider info
4. Should show which provider succeeded ✅

### **Test 3: Simulate Gemini failure**
1. Temporarily remove `VITE_GEMINI_API_KEY` from `.env.local`
2. Restart dev server
3. Test Chatbot again
4. Should automatically use next provider ✅

---

## 📊 Monitoring API Usage

Check API stats in console:

```javascript
multiAIService.getStats()
```

Example output:
```json
{
  "gemini": { "success": 12, "failed": 2, "quota_exceeded": 1 },
  "openai": { "success": 5, "failed": 0, "quota_exceeded": 0 },
  "cohere": { "success": 3, "failed": 0, "quota_exceeded": 0 },
  "total_requests": 20,
  "uptime_percentage": 95.2
}
```

---

## 🆘 Troubleshooting

### **Problem: "No providers configured"**
- **Fix:** Add at least one API key to `.env.local`
- Mock responses will be used (features work but limited quality)

### **Problem: "Gemini working but Chatbot slow"**
- **Check:** Gemini might have quota limits
- **Fix:** Add OpenAI or Cohere as fallback

### **Problem: "Only mock responses, no real AI"**
- **Check:** Do you have any API keys configured?
- **Fix:** Follow setup steps above
- Open DevTools (F12) → Console → Check for errors

### **Problem: "Response takes long time"**
- **Check:** App might be trying multiple providers
- **Status:** This is normal during fallback, response will eventually come
- **Fix:** Add more API keys for faster responses

---

## 💡 Pro Tips

1. **Start with Gemini** - It's FREE and works great
2. **Add Cohere as backup** - Also FREE, very reliable
3. **Test your setup** - Using Chatbot page
4. **Monitor usage** - Check `multiAIService.getStats()` regularly
5. **Remove failed keys** - If a key is invalid, remove it from `.env.local`

---

## 📞 Getting Help

If features don't work:

1. **Check Console** - Open DevTools (F12) → Console tab
2. **Look for errors** - Red text shows what went wrong
3. **Check API keys** - Verify keys in `.env.local` are correct
4. **Test providers** - Run `multiAIService.getProviderStatus()`
5. **Try Chatbot** - Test if any AI works

---

## ✨ You're All Set! 

Your Eduhub app now has **enterprise-grade AI reliability** with automatic fallback across 5 providers. Even if one service goes down, your features keep working! 🚀

Next step: Open Chatbot page and test! 💬
