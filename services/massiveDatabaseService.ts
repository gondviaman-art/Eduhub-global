// Enhanced Database Service - Uses Massive Local Database
import { 
  NewsItem, Fact, DeepDiveArticle, Question, CareerRoadmap, 
  CodeSnippet, LMGuide, Subject 
} from '../types';
import {
  MASSIVE_QUESTIONS_DB,
  MASSIVE_NEWS_DB,
  MASSIVE_FACTS_DB,
  DEEP_DIVE_ARTICLES_DB,
  CAREER_ROADMAPS_DB,
  CODE_SNIPPETS_DB,
  LEARNING_GUIDES_DB
} from '../data/massiveDatabase';

class MassiveDatabaseService {
  // ==================== Questions ====================
  getQuestions(subject?: Subject, level?: string, limit?: number): Question[] {
    let results = MASSIVE_QUESTIONS_DB;

    if (subject) {
      results = results.filter(q => {
        const questionText = q.question.toLowerCase();
        return questionText.includes(subject.toLowerCase());
      });
    }

    if (level) {
      results = results.filter(q => q.level === level);
    }

    if (limit) {
      results = results.slice(0, limit);
    }

    return results;
  }

  getRandomQuestions(count: number = 10): Question[] {
    const shuffled = [...MASSIVE_QUESTIONS_DB].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  getQuestionsByLevel(level: string): Question[] {
    return MASSIVE_QUESTIONS_DB.filter(q => q.level === level);
  }

  searchQuestions(query: string): Question[] {
    const lowerQuery = query.toLowerCase();
    return MASSIVE_QUESTIONS_DB.filter(q => 
      q.question.toLowerCase().includes(lowerQuery) ||
      q.rationale.toLowerCase().includes(lowerQuery)
    );
  }

  // ==================== News ====================
  getNews(category?: string, limit?: number): NewsItem[] {
    let results = MASSIVE_NEWS_DB;

    if (category) {
      results = results.filter(n => n.category === category);
    }

    if (limit) {
      results = results.slice(0, limit);
    }

    return results.sort((a, b) => b.timestamp - a.timestamp);
  }

  getLatestNews(count: number = 20): NewsItem[] {
    return this.getNews(undefined, count);
  }

  getNewsByCategory(category: string): NewsItem[] {
    return this.getNews(category);
  }

  searchNews(query: string): NewsItem[] {
    const lowerQuery = query.toLowerCase();
    return MASSIVE_NEWS_DB.filter(n =>
      n.title.toLowerCase().includes(lowerQuery) ||
      n.summary.toLowerCase().includes(lowerQuery) ||
      n.category.toLowerCase().includes(lowerQuery)
    );
  }

  // ==================== Facts ====================
  getFacts(subject?: Subject, level?: string): Fact[] {
    let results = MASSIVE_FACTS_DB;

    if (subject) {
      results = results.filter(f => f.subject === subject);
    }

    if (level) {
      results = results.filter(f => f.level === level);
    }

    return results;
  }

  getRandomFacts(count: number = 5): Fact[] {
    const shuffled = [...MASSIVE_FACTS_DB].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  getFactsBySubject(subject: Subject): Fact[] {
    return MASSIVE_FACTS_DB.filter(f => f.subject === subject);
  }

  // ==================== Deep Dive Articles ====================
  getDeepDiveArticles(subject?: Subject, limit?: number): DeepDiveArticle[] {
    let results = DEEP_DIVE_ARTICLES_DB;

    if (subject) {
      results = results.filter(a => a.subject === subject);
    }

    if (limit) {
      results = results.slice(0, limit);
    }

    return results;
  }

  getArticleByTag(tag: string): DeepDiveArticle[] {
    return DEEP_DIVE_ARTICLES_DB.filter(a =>
      a.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    );
  }

  searchArticles(query: string): DeepDiveArticle[] {
    const lowerQuery = query.toLowerCase();
    return DEEP_DIVE_ARTICLES_DB.filter(a =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.content.toLowerCase().includes(lowerQuery) ||
      a.tags.some(t => t.toLowerCase().includes(lowerQuery))
    );
  }

  // ==================== Career Roadmaps ====================
  getCareerRoadmaps(limit?: number): CareerRoadmap[] {
    let results = CAREER_ROADMAPS_DB;

    if (limit) {
      results = results.slice(0, limit);
    }

    return results;
  }

  getCareerByTitle(title: string): CareerRoadmap | undefined {
    return CAREER_ROADMAPS_DB.find(c => 
      c.title.toLowerCase() === title.toLowerCase()
    );
  }

  searchCareers(query: string): CareerRoadmap[] {
    const lowerQuery = query.toLowerCase();
    return CAREER_ROADMAPS_DB.filter(c =>
      c.title.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery) ||
      c.skills.some(s => s.toLowerCase().includes(lowerQuery))
    );
  }

  // ==================== Code Snippets ====================
  getCodeSnippets(language?: string): CodeSnippet[] {
    let results = CODE_SNIPPETS_DB;

    if (language) {
      results = results.filter(c => 
        c.language.toLowerCase().includes(language.toLowerCase())
      );
    }

    return results;
  }

  getCodeSnippetById(id: string): CodeSnippet | undefined {
    return CODE_SNIPPETS_DB.find(c => c.id === id);
  }

  searchCodeSnippets(query: string): CodeSnippet[] {
    const lowerQuery = query.toLowerCase();
    return CODE_SNIPPETS_DB.filter(c =>
      c.title.toLowerCase().includes(lowerQuery) ||
      c.code.toLowerCase().includes(lowerQuery) ||
      c.language.toLowerCase().includes(lowerQuery)
    );
  }

  // ==================== Learning Guides ====================
  getLearningGuides(language?: string): LMGuide[] {
    let results = LEARNING_GUIDES_DB;

    if (language) {
      results = results.filter(g => g.language === language);
    }

    return results;
  }

  getLearningGuideById(id: string): LMGuide | undefined {
    return LEARNING_GUIDES_DB.find(g => g.id === id);
  }

  // ==================== Statistics & Analytics ====================
  getDatabaseStats() {
    return {
      totalQuestions: MASSIVE_QUESTIONS_DB.length,
      totalNews: MASSIVE_NEWS_DB.length,
      totalFacts: MASSIVE_FACTS_DB.length,
      totalArticles: DEEP_DIVE_ARTICLES_DB.length,
      totalCareerPaths: CAREER_ROADMAPS_DB.length,
      totalCodeSnippets: CODE_SNIPPETS_DB.length,
      totalGuides: LEARNING_GUIDES_DB.length,
      totalContent: (
        MASSIVE_QUESTIONS_DB.length +
        MASSIVE_NEWS_DB.length +
        MASSIVE_FACTS_DB.length +
        DEEP_DIVE_ARTICLES_DB.length +
        CAREER_ROADMAPS_DB.length +
        CODE_SNIPPETS_DB.length +
        LEARNING_GUIDES_DB.length
      )
    };
  }

  // ==================== Global Search ====================
  globalSearch(query: string, limit: number = 20) {
    const lowerQuery = query.toLowerCase();

    const questionResults = this.searchQuestions(query).slice(0, 5);
    const newsResults = this.searchNews(query).slice(0, 5);
    const articleResults = this.searchArticles(query).slice(0, 5);
    const careerResults = this.searchCareers(query).slice(0, 3);
    const codeResults = this.searchCodeSnippets(query).slice(0, 2);

    return {
      questions: questionResults,
      news: newsResults,
      articles: articleResults,
      careers: careerResults,
      code: codeResults,
      totalResults: (
        questionResults.length +
        newsResults.length +
        articleResults.length +
        careerResults.length +
        codeResults.length
      )
    };
  }

  // ==================== Featured Content ====================
  getFeaturedContent() {
    return {
      topQuestions: this.getRandomQuestions(5),
      latestNews: this.getLatestNews(5),
      trendingArticles: DEEP_DIVE_ARTICLES_DB.slice(0, 3),
      careerHighlights: CAREER_ROADMAPS_DB.slice(0, 3),
      codeExamples: CODE_SNIPPETS_DB.slice(0, 3),
      randomFacts: this.getRandomFacts(3)
    };
  }

  // ==================== Caching (Optional) ====================
  private cache = new Map<string, any>();

  getCached(key: string) {
    return this.cache.get(key);
  }

  setCached(key: string, value: any, ttlSeconds: number = 3600) {
    this.cache.set(key, value);
    // Optional: Clear cache after TTL
    setTimeout(() => this.cache.delete(key), ttlSeconds * 1000);
  }

  clearCache() {
    this.cache.clear();
  }
}

// Export singleton instance
export const massiveDatabaseService = new MassiveDatabaseService();

// Also export the class for testing
export default MassiveDatabaseService;
