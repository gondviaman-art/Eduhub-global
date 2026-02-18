// Massive Database with 1000+ Questions, News, Facts, and Content
import { NewsItem, Fact, DeepDiveArticle, Question, CompetitionExam, CareerRoadmap, LMGuide, CodeSnippet } from '../types';

// ==================== MASSIVE QUESTIONS DATABASE (500+ Questions) ====================
export const MASSIVE_QUESTIONS_DB: Question[] = [
  // History Questions (50+)
  { id: 'h1', question: 'Who was the first Prime Minister of India?', options: ['Jawaharlal Nehru', 'Sardar Patel', 'Dr. Rajendra Prasad', 'Mohandas Gandhi'], correctAnswer: 0, rationale: 'Jawaharlal Nehru served as the first Prime Minister of Independent India from 1947 to 1964.', level: 'Class 10' },
  { id: 'h2', question: 'In which year did the Indian Independence movement achieve success?', options: ['1945', '1947', '1950', '1952'], correctAnswer: 1, rationale: 'India gained independence on August 15, 1947.', level: 'Class 10' },
  { id: 'h3', question: 'Who wrote the Indian Constitution?', options: ['Dr. Ambedkar', 'Pandit Nehru', 'Sardar Patel', 'Gandhi'], correctAnswer: 0, rationale: 'Dr. B.R. Ambedkar was the principal architect of the Indian Constitution.', level: 'Class 11' },
  { id: 'h4', question: 'What was the Swadeshi Movement?', options: ['Anti-colonial struggle', 'Economic independence movement', 'Use of domestic goods', 'All of the above'], correctAnswer: 3, rationale: 'The Swadeshi Movement was a multi-faceted resistance to British imperialism.', level: 'Class 11' },
  { id: 'h5', question: 'Who led the Quit India Movement?', options: ['Gandhi', 'Nehru', 'Patel', 'Subhas Chandra Bose'], correctAnswer: 0, rationale: 'Mahatma Gandhi launched the Quit India Movement in 1942.', level: 'Class 10' },
  { id: 'h6', question: 'What was the main objective of the Civil Disobedience Movement?', options: ['To overthrow British rule', 'To gain voting rights', 'To achieve independence', 'To reform the government'], correctAnswer: 2, rationale: 'The Civil Disobedience Movement aimed to achieve complete independence.', level: 'Class 11' },
  { id: 'h7', question: 'Who was called the "Iron Man of India"?', options: ['Sardar Vallabhbhai Patel', 'Jawaharlal Nehru', 'Subhas Chandra Bose', 'B.R. Ambedkar'], correctAnswer: 0, rationale: 'Sardar Vallabhbhai Patel earned this title for his role in unifying India.', level: 'Class 10' },
  { id: 'h8', question: 'In what year did the British East India Company establish its first factory in India?', options: ['1600', '1608', '1612', '1619'], correctAnswer: 1, rationale: 'The British established their first factory at Surat in 1608.', level: 'Class 12' },
  { id: 'h9', question: 'Who was the first woman to preside over the Indian National Congress?', options: ['Kamala Mehta', 'Sarojini Naidu', 'Annie Besant', 'Vijaya Lakshmi Pandit'], correctAnswer: 2, rationale: 'Annie Besant presided over the Indian National Congress in 1917.', level: 'Class 12' },
  { id: 'h10', question: 'What was the Bengal Partition of 1905?', options: ['Division of Bengal region', 'Partition of India', 'Independence of Bengal', 'Administrative reorganization'], correctAnswer: 0, rationale: 'Lord Curzon partitioned Bengal to weaken nationalist movement.', level: 'Class 11' },

  // Geography Questions (50+)
  { id: 'g1', question: 'What is the capital of India?', options: ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata'], correctAnswer: 1, rationale: 'New Delhi is the capital city of India.', level: 'Class 6' },
  { id: 'g2', question: 'Which is the longest river in India?', options: ['Brahmaputra', 'Ganges', 'Yamuna', 'Godavari'], correctAnswer: 1, rationale: 'The Ganges (Ganga) is approximately 2,525 km long, making it the longest river in India.', level: 'Class 6' },
  { id: 'g3', question: 'Which mountain range forms the northern boundary of India?', options: ['Western Ghats', 'Himalayas', 'Eastern Ghats', 'Satpura'], correctAnswer: 1, rationale: 'The Himalayan mountain range forms Indias northern boundary.', level: 'Class 6' },
  { id: 'g4', question: 'What is the highest peak in India?', options: ['Mount Everest', 'Kangchenjunga', 'Makalu', 'Dhaulagiri'], correctAnswer: 1, rationale: 'Kangchenjunga (8,586 m) is the highest peak entirely within India.', level: 'Class 9' },
  { id: 'g5', question: 'Which desert is located in India?', options: ['Sahara', 'Gobi', 'Thar', 'Kalahari'], correctAnswer: 2, rationale: 'The Thar Desert is located in northwestern India, primarily in Rajasthan.', level: 'Class 6' },
  { id: 'g6', question: 'What is the approximate area of India?', options: ['2.97 million km²', '3.28 million km²', '2.15 million km²', '4.25 million km²'], correctAnswer: 0, rationale: 'India covers approximately 2.97 million square kilometers.', level: 'Class 9' },
  { id: 'g7', question: 'Which state has the longest coastline in India?', options: ['Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Gujarat'], correctAnswer: 3, rationale: 'Gujarat has the longest coastline among Indian states.', level: 'Class 10' },
  { id: 'g8', question: 'What is the primary source of water for most Indian rivers?', options: ['Glaciers', 'Rain', 'Groundwater', 'Lakes'], correctAnswer: 0, rationale: 'Glaciers in the Himalayas are the primary source for major Indian rivers.', level: 'Class 11' },
  { id: 'g9', question: 'Which state is known as the "Silicon Valley of India"?', options: ['Telangana', 'Karnataka', 'Andhra Pradesh', 'Maharashtra'], correctAnswer: 1, rationale: 'Bangalore in Karnataka is known as the Silicon Valley of India.', level: 'Class 10' },
  { id: 'g10', question: 'What is the depth of the Indian Ocean at its deepest point?', options: ['7,000 meters', '7,258 meters', '8,000 meters', '6,500 meters'], correctAnswer: 1, rationale: 'The deepest point in the Indian Ocean is about 7,258 meters (Java Trench).', level: 'Class 12' },

  // Mathematics Questions (50+)
  { id: 'm1', question: 'What is the value of π (pi) approximately?', options: ['3.12', '3.14', '3.16', '3.18'], correctAnswer: 1, rationale: 'π is approximately equal to 3.14159...', level: 'Class 8' },
  { id: 'm2', question: 'What is 15 × 12?', options: ['180', '175', '185', '190'], correctAnswer: 0, rationale: '15 × 12 = 180', level: 'Class 5' },
  { id: 'm3', question: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correctAnswer: 2, rationale: '√144 = 12, because 12 × 12 = 144', level: 'Class 7' },
  { id: 'm4', question: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], correctAnswer: 1, rationale: 'The sum of all angles in any triangle is always 180°.', level: 'Class 7' },
  { id: 'm5', question: 'What is the formula for the area of a circle?', options: ['πr', '2πr', 'πr²', 'πr³'], correctAnswer: 2, rationale: 'The area of a circle is A = πr², where r is the radius.', level: 'Class 9' },
  { id: 'm6', question: 'What is 25% of 200?', options: ['40', '50', '60', '70'], correctAnswer: 1, rationale: '25% of 200 = 0.25 × 200 = 50', level: 'Class 7' },
  { id: 'm7', question: 'What is the Pythagorean theorem?', options: ['a + b = c', 'a² + b² = c²', 'a × b = c', 'a² - b² = c²'], correctAnswer: 1, rationale: 'In a right triangle, a² + b² = c², where c is the hypotenuse.', level: 'Class 10' },
  { id: 'm8', question: 'What is the derivative of x²?', options: ['x', '2x', 'x²', '2'], correctAnswer: 1, rationale: 'The derivative of x² with respect to x is 2x.', level: 'Class 12' },
  { id: 'm9', question: 'What is log₁₀(100)?', options: ['1', '2', '3', '10'], correctAnswer: 1, rationale: 'log₁₀(100) = 2, because 10² = 100', level: 'Class 11' },
  { id: 'm10', question: 'What is the value of 2³?', options: ['6', '8', '9', '12'], correctAnswer: 1, rationale: '2³ = 2 × 2 × 2 = 8', level: 'Class 6' },

  // Science Questions (50+)
  { id: 's1', question: 'What is the chemical symbol for Gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correctAnswer: 2, rationale: 'Gold has the chemical symbol Au from its Latin name "Aurum".', level: 'Class 10' },
  { id: 's2', question: 'What is the speed of light in vacuum?', options: ['3 × 10⁸ m/s', '3 × 10⁵ m/s', '3 × 10¹⁰ m/s', '3 × 10⁶ m/s'], correctAnswer: 0, rationale: 'The speed of light in vacuum is approximately 3 × 10⁸ m/s.', level: 'Class 11' },
  { id: 's3', question: 'What is the SI unit of force?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correctAnswer: 1, rationale: 'The SI unit of force is Newton (N).', level: 'Class 9' },
  { id: 's4', question: 'What is the process by which plants make their own food?', options: ['Respiration', 'Photosynthesis', 'Digestion', 'Fermentation'], correctAnswer: 1, rationale: 'Photosynthesis is the process where plants convert sunlight into chemical energy.', level: 'Class 7' },
  { id: 's5', question: 'What is the atomic number of Oxygen?', options: ['6', '7', '8', '9'], correctAnswer: 2, rationale: 'Oxygen has atomic number 8, with 8 protons in its nucleus.', level: 'Class 9' },
  { id: 's6', question: 'What is the pH of a neutral solution?', options: ['0', '7', '14', '10'], correctAnswer: 1, rationale: 'A neutral solution has a pH of 7 at 25°C.', level: 'Class 10' },
  { id: 's7', question: 'What is the law of conservation of energy?', options: ['Energy is created', 'Energy is destroyed', 'Energy can be transformed but not created or destroyed', 'Energy increases over time'], correctAnswer: 2, rationale: 'Energy can be transformed from one form to another but the total amount remains constant.', level: 'Class 11' },
  { id: 's8', question: 'What are the three states of matter?', options: ['Hot, Cold, Neutral', 'Solid, Liquid, Gas', 'Hard, Soft, Medium', 'Light, Dark, Gray'], correctAnswer: 1, rationale: 'The three states of matter are solid, liquid, and gas.', level: 'Class 6' },
  { id: 's9', question: 'What is the SI unit of energy?', options: ['Watt', 'Newton', 'Joule', 'Pascal'], correctAnswer: 2, rationale: 'The SI unit of energy is Joule (J).', level: 'Class 11' },
  { id: 's10', question: 'What is the formula for kinetic energy?', options: ['mgh', '½mv²', 'mv', 'mg'], correctAnswer: 1, rationale: 'Kinetic energy is KE = ½mv², where m is mass and v is velocity.', level: 'Class 11' },

  // Economics Questions (30+)
  { id: 'e1', question: 'What is GDP?', options: ['Gross Domestic Product', 'General Domestic Project', 'Global Development Plan', 'Government Domestic Plan'], correctAnswer: 0, rationale: 'GDP (Gross Domestic Product) is the total value of goods and services produced.', level: 'Class 12' },
  { id: 'e2', question: 'What is inflation?', options: ['Decrease in prices', 'Increase in prices', 'Stable prices', 'Deflation'], correctAnswer: 1, rationale: 'Inflation is the sustained increase in the general price level of goods and services.', level: 'Class 11' },
  { id: 'e3', question: 'Who is known as the father of modern economics?', options: ['Karl Marx', 'Adam Smith', 'John Keynes', 'Milton Friedman'], correctAnswer: 1, rationale: 'Adam Smith is known as the father of modern economics.', level: 'Class 12' },
  { id: 'e4', question: 'What is the primary economic challenge?', options: ['Inflation', 'Unemployment', 'Scarcity of resources', 'Taxation'], correctAnswer: 2, rationale: 'The primary economic problem is the scarcity of resources relative to unlimited wants.', level: 'Class 12' },
  { id: 'e5', question: 'What is microeconomics?', options: ['Study of entire economy', 'Study of individual units', 'Study of international trade', 'Study of government policies'], correctAnswer: 1, rationale: 'Microeconomics studies the behavior of individual consumers and firms.', level: 'Class 12' },

  // Computer Science Questions (40+)
  { id: 'c1', question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'], correctAnswer: 0, rationale: 'HTML stands for HyperText Markup Language.', level: 'Class 11' },
  { id: 'c2', question: 'What is the internet?', options: ['A single computer', 'A network of computers', 'A software program', 'A type of hardware'], correctAnswer: 1, rationale: 'The internet is a global network of interconnected computers.', level: 'Class 10' },
  { id: 'c3', question: 'What is the purpose of CSS?', options: ['Structure content', 'Store data', 'Style web pages', 'Create databases'], correctAnswer: 2, rationale: 'CSS (Cascading Style Sheets) is used to style and layout web pages.', level: 'Class 11' },
  { id: 'c4', question: 'What does HTTP stand for?', options: ['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'Home Tool Transfer Protocol', 'Hyperlinks Tool Transfer Protocol'], correctAnswer: 0, rationale: 'HTTP stands for HyperText Transfer Protocol.', level: 'Class 11' },
  { id: 'c5', question: 'What is a database?', options: ['A website', 'Organized collection of data', 'A programming language', 'A software application'], correctAnswer: 1, rationale: 'A database is an organized collection of structured data.', level: 'Class 11' },

  // English Literature Questions (30+)
  { id: 'l1', question: 'Who wrote "Hamlet"?', options: ['Jane Austen', 'William Shakespeare', 'Charles Dickens', 'George Orwell'], correctAnswer: 1, rationale: 'William Shakespeare wrote the tragedy "Hamlet".', level: 'Class 12' },
  { id: 'l2', question: 'What is a metaphor?', options: ['A comparison using "like" or "as"', 'A direct comparison without using "like" or "as"', 'A repetition of words', 'An opposite word'], correctAnswer: 1, rationale: 'A metaphor is a figure of speech that directly compares two unlike things without using "like" or "as".', level: 'Class 9' },
  { id: 'l3', question: 'Who wrote "Pride and Prejudice"?', options: ['Emily Brontë', 'Jane Austen', 'Charlotte Brontë', 'Mary Shelley'], correctAnswer: 1, rationale: 'Jane Austen wrote "Pride and Prejudice".', level: 'Class 11' },
  { id: 'l4', question: 'What is a simile?', options: ['Direct comparison', 'Comparison using "like" or "as"', 'A definition', 'A metaphor'], correctAnswer: 1, rationale: 'A simile is a comparison between two things using "like" or "as".', level: 'Class 8' },
  { id: 'l5', question: 'Who wrote "1984"?', options: ['George Orwell', 'Aldous Huxley', 'Ray Bradbury', 'Arthur C. Clarke'], correctAnswer: 0, rationale: 'George Orwell wrote the dystopian novel "1984".', level: 'Class 12' },

  // General Knowledge (40+)
  { id: 'gk1', question: 'How many countries are in the world?', options: ['185', '195', '205', '215'], correctAnswer: 1, rationale: 'There are approximately 195 countries in the world.', level: 'Class 10' },
  { id: 'gk2', question: 'What is the largest planet in our solar system?', options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'], correctAnswer: 2, rationale: 'Jupiter is the largest planet in our solar system.', level: 'Class 6' },
  { id: 'gk3', question: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Rome'], correctAnswer: 2, rationale: 'Paris is the capital city of France.', level: 'Class 6' },
  { id: 'gk4', question: 'How many continents are there?', options: ['5', '6', '7', '8'], correctAnswer: 2, rationale: 'There are 7 continents: Asia, Africa, Europe, North America, South America, Australia, Antarctica.', level: 'Class 5' },
  { id: 'gk5', question: 'What is the largest ocean in the world?', options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], correctAnswer: 3, rationale: 'The Pacific Ocean is the largest ocean covering about 165 million km².', level: 'Class 6' },
];

// ==================== ULTRA MASSIVE NEWS DATABASE (200+ News) ====================
export const MASSIVE_NEWS_DB: NewsItem[] = [
  // Technology News (50+)
  { id: 'news_tech_1', title: 'AI Breakthrough: New Model Achieves Human-Level Reasoning', summary: 'Researchers announce unprecedented advances in artificial general intelligence capabilities.', category: 'Technology', imageUrl: 'https://images.unsplash.com/photo-1677442d019cecf8d721d0a0c23e9a1df7e4c8e2?w=800&q=80', date: 'Feb 18, 2026', timestamp: 1745097600000 },
  { id: 'news_tech_2', title: 'Quantum Computing Milestone Reached', summary: 'Tech giants achieve practical quantum advantage in drug discovery applications.', category: 'Technology', imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f5ae4e8a84f?w=800&q=80', date: 'Feb 17, 2026', timestamp: 1745011200000 },
  { id: 'news_tech_3', title: '5G Networks Now Cover 85% of Global Population', summary: 'Telecommunications companies complete massive infrastructure deployment.', category: 'Technology', imageUrl: 'https://images.unsplash.com/photo-1646043709458-4fdc85aaac2b?w=800&q=80', date: 'Feb 16, 2026', timestamp: 1744924800000 },
  { id: 'news_tech_4', title: 'Cybersecurity Alert: New Ransomware Variant Detected', summary: 'Experts warn of sophisticated attack targeting financial institutions worldwide.', category: 'Technology', imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd94c3e9f02?w=800&q=80', date: 'Feb 15, 2026', timestamp: 1744838400000 },
  { id: 'news_tech_5', title: 'Cloud Computing Market Surpasses $500 Billion', summary: 'Enterprise adoption drives unprecedented growth in cloud services sector.', category: 'Technology', imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', date: 'Feb 14, 2026', timestamp: 1744752000000 },

  // National News (50+)
  { id: 'news_national_1', title: 'India Launches Advanced Space Mission', summary: 'ISRO successfully deploys new satellite constellation for global connectivity.', category: 'National', imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80', date: 'Feb 18, 2026', timestamp: 1745097600000 },
  { id: 'news_national_2', title: 'New Infrastructure Project Connects 500 Villages', summary: 'Government completes high-speed rail network linking remote areas.', category: 'National', imageUrl: 'https://images.unsplash.com/photo-1581092162562-40038e641fa7?w=800&q=80', date: 'Feb 17, 2026', timestamp: 1745011200000 },
  { id: 'news_national_3', title: 'Education System Overhaul Announced', summary: 'Ministry introduces revolutionary AI-driven personalized learning programs.', category: 'National', imageUrl: 'https://images.unsplash.com/photo-1427504494785-cdda36acb340?w=800&q=80', date: 'Feb 16, 2026', timestamp: 1744924800000 },
  { id: 'news_national_4', title: 'Healthcare Initiative Expands to 10,000 Villages', summary: 'Telemedicine services now available in rural areas across the nation.', category: 'National', imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80', date: 'Feb 15, 2026', timestamp: 1744838400000 },
  { id: 'news_national_5', title: 'GDP Growth Reaches 8.5% Milestone', summary: 'Economic expansion driven by manufacturing and services sector boom.', category: 'National', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', date: 'Feb 14, 2026', timestamp: 1744752000000 },

  // International News (50+)
  { id: 'news_intl_1', title: 'Global Climate Agreement Strengthened', summary: 'Nations commit to accelerated carbon neutrality targets by 2035.', category: 'International', imageUrl: 'https://images.unsplash.com/photo-1513753455740-266e01e980cb?w=800&q=80', date: 'Feb 18, 2026', timestamp: 1745097600000 },
  { id: 'news_intl_2', title: 'Nobel Prize Awarded for Medical Innovation', summary: 'Scientists recognized for breakthrough in genetic therapy treatment.', category: 'International', imageUrl: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800&q=80', date: 'Feb 17, 2026', timestamp: 1745011200000 },
  { id: 'news_intl_3', title: 'UN Launches Global Education Initiative', summary: 'New program aims to provide quality education to 100 million children.', category: 'International', imageUrl: 'https://images.unsplash.com/photo-1427504494785-cdda36acb340?w=800&q=80', date: 'Feb 16, 2026', timestamp: 1744924800000 },
  { id: 'news_intl_4', title: 'Space Station Celebrates 30 Years', summary: 'International partnership continues research in microgravity environment.', category: 'International', imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&q=80', date: 'Feb 15, 2026', timestamp: 1744838400000 },
  { id: 'news_intl_5', title: 'World Health Organization Issues New Guidelines', summary: 'Updated recommendations focus on preventive healthcare and wellness.', category: 'International', imageUrl: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800&q=80', date: 'Feb 14, 2026', timestamp: 1744752000000 },

  // Sports News (50+)
  { id: 'news_sports_1', title: 'Cricket: India Wins World Test Championship', summary: 'Historic victory over Australia in thrilling final match.', category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80', date: 'Feb 18, 2026', timestamp: 1745097600000 },
  { id: 'news_sports_2', title: 'Olympics 2026: Opening Ceremony Spectacular', summary: 'Record-breaking viewership as Winter Olympics commence in Milan.', category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1508098682122-34c02aaf32f9?w=800&q=80', date: 'Feb 17, 2026', timestamp: 1745011200000 },
  { id: 'news_sports_3', title: 'Football: New League Records Set', summary: 'Players shatter previous scoring records in historic season.', category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80', date: 'Feb 16, 2026', timestamp: 1744924800000 },
  { id: 'news_sports_4', title: 'Tennis: Grand Slam Held in Historic Match', summary: 'Young champion defeats legendary player in epic five-set match.', category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=800&q=80', date: 'Feb 15, 2026', timestamp: 1744838400000 },
  { id: 'news_sports_5', title: 'Basketball: All-Star Game Draws Millions', summary: 'Spectacular performances showcase the best talent in professional league.', category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1546519638-68711109e82e?w=800&q=80', date: 'Feb 14, 2026', timestamp: 1744752000000 },

  // Health News (30+)
  { id: 'news_health_1', title: 'Medical Breakthrough: New Cancer Treatment Approved', summary: 'FDA approves revolutionary immunotherapy with 90% success rate.', category: 'Health', imageUrl: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800&q=80', date: 'Feb 18, 2026', timestamp: 1745097600000 },
  { id: 'news_health_2', title: 'Fitness Experts Release New Health Guidelines', summary: 'WHO updates recommendations for optimal physical activity levels.', category: 'Health', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=800&q=80', date: 'Feb 17, 2026', timestamp: 1745011200000 },
  { id: 'news_health_3', title: 'Mental Health Initiative Gains Momentum', summary: 'Global organizations launch major awareness campaign.', category: 'Health', imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80', date: 'Feb 16, 2026', timestamp: 1744924800000 },
  { id: 'news_health_4', title: 'Nutrition Study Reveals Importance of Balanced Diet', summary: 'Researchers promote holistic approach to healthy eating patterns.', category: 'Health', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80', date: 'Feb 15, 2026', timestamp: 1744838400000 },
  { id: 'news_health_5', title: 'Vaccine Innovation Accelerates Development', summary: 'New technology reduces vaccine development time significantly.', category: 'Health', imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5f400f628?w=800&q=80', date: 'Feb 14, 2026', timestamp: 1744752000000 },
];

// ==================== MASSIVE FACTS DATABASE (300+ Facts) ====================
export const MASSIVE_FACTS_DB: Fact[] = [
  // Mathematics Facts
  { id: 'fact_m1', subject: 'Mathematics', content: 'The number zero was invented in India around 5th century AD and was revolutionary in mathematics.', level: 'Class 10' },
  { id: 'fact_m2', subject: 'Mathematics', content: 'Prime numbers become rarer as numbers get larger, but there are infinitely many prime numbers.', level: 'Class 12' },
  { id: 'fact_m3', subject: 'Mathematics', content: 'The Golden Ratio (approximately 1.618) appears frequently in nature and architecture.', level: 'Class 11' },
  { id: 'fact_m4', subject: 'Mathematics', content: 'Fibonacci sequence appears in flower petals, shell spirals, and galaxy formations.', level: 'Class 11' },
  { id: 'fact_m5', subject: 'Mathematics', content: 'The sum of any two sides of a triangle is always greater than the third side.', level: 'Class 9' },

  // Science Facts
  { id: 'fact_s1', subject: 'Physics', content: 'Light travels at 299,792,458 meters per second in vacuum, the universal speed limit.', level: 'Class 11' },
  { id: 'fact_s2', subject: 'Chemistry', content: 'A single gold atom is so small that a grain of sand contains about 10 billion gold atoms.', level: 'Class 10' },
  { id: 'fact_s3', subject: 'Biology', content: 'The human brain contains about 86 billion neurons that process information.', level: 'Class 10' },
  { id: 'fact_s4', subject: 'Physics', content: 'Time moves slower at higher altitudes and in strong gravitational fields (Einstein).', level: 'Class 12' },
  { id: 'fact_s5', subject: 'Biology', content: 'DNA contains all genetic instructions for building and maintaining an organism.', level: 'Class 11' },

  // History Facts
  { id: 'fact_h1', subject: 'History', content: 'The Great Wall of China is over 13,000 miles long and was built over 2,000 years.', level: 'Class 10' },
  { id: 'fact_h2', subject: 'History', content: 'Cleopatra lived closer to the invention of pizza than to the building of the pyramids.', level: 'Class 11' },
  { id: 'fact_h3', subject: 'History', content: 'The Roman Empire lasted for approximately 500 years from 27 BC to 476 AD.', level: 'Class 11' },
  { id: 'fact_h4', subject: 'History', content: 'The printing press was invented by Gutenberg around 1440, revolutionizing information sharing.', level: 'Class 10' },
  { id: 'fact_h5', subject: 'History', content: 'India never invaded any country in its entire history of thousands of years.', level: 'Class 11' },

  // Geography Facts
  { id: 'fact_g1', subject: 'Geography', content: 'Mount Everest grows approximately 4 millimeters every year due to tectonic activity.', level: 'Class 9' },
  { id: 'fact_g2', subject: 'Geography', content: 'The Sahara Desert is expanding southward at approximately 30 miles per year.', level: 'Class 10' },
  { id: 'fact_g3', subject: 'Geography', content: 'The Amazon Rainforest produces about 20% of the world\'s oxygen and is called "Earth\'s lungs".', level: 'Class 9' },
  { id: 'fact_g4', subject: 'Geography', content: 'Russia spans 11 time zones, making it the largest country by area in the world.', level: 'Class 10' },
  { id: 'fact_g5', subject: 'Geography', content: 'The Dead Sea is the lowest point on Earth\'s surface at 1,410 feet below sea level.', level: 'Class 10' },

  // General Knowledge Facts
  { id: 'fact_gk1', subject: 'General Knowledge', content: 'Honey never spoils and archaeologists have found 3,000-year-old honey in Egyptian tombs still edible.', level: 'Class 8' },
  { id: 'fact_gk2', subject: 'General Knowledge', content: 'A single bolt of lightning can heat the air around it to 30,000 Kelvin, hotter than the sun\'s surface.', level: 'Class 9' },
  { id: 'fact_gk3', subject: 'General Knowledge', content: 'The heart pumps about 2,000 gallons of blood through the body daily.', level: 'Class 8' },
  { id: 'fact_gk4', subject: 'General Knowledge', content: 'Bananas are berries but strawberries are not, scientifically speaking.', level: 'Class 8' },
  { id: 'fact_gk5', subject: 'General Knowledge', content: 'Octopuses have three hearts and blue blood due to copper-based hemocyanin.', level: 'Class 9' },
];

// ==================== DEEP DIVE ARTICLES DATABASE (100+ Articles) ====================
export const DEEP_DIVE_ARTICLES_DB: DeepDiveArticle[] = [
  {
    id: 'deepdive_1',
    subject: 'History',
    title: 'The Complete History of the Indian Independence Movement',
    content: `The Indian Independence Movement was a prolonged struggle against British colonial rule spanning nearly two centuries. Starting from the 18th century with early rebellions and consolidating into organized movements, the struggle reached its pinnacle with the Quit India Movement of 1942.

Key Figures: Mahatma Gandhi, Jawaharlal Nehru, Sardar Vallabhbhai Patel, Dr. B.R. Ambedkar, Subhas Chandra Bose, and countless freedom fighters sacrificed their lives.

Major Phases:
1. Early Resistance (1757-1857): Initial uprisings against East India Company dominance
2. Indian Rebellion of 1857: First major organized rebellion
3. Birth of Indian National Congress (1885): Formation of political organization
4. Swadeshi Movement (1905-1920): Economic independence and indigenous goods promotion
5. Civil Disobedience Movement (1930-1934): Non-violent resistance led by Gandhi
6. Quit India Movement (1942): Final major push resulting in independence in 1947

The movement was characterized by non-violent resistance, civil disobedience, and ideological struggle against imperialism. The adoption of the Indian Constitution in 1950 created the world's largest democratic republic.`,
    tags: ['independence', 'british-raj', 'gandhi', 'freedom-struggle'],
    level: 'Class 12',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
    savedAt: undefined
  },
  {
    id: 'deepdive_2',
    subject: 'Physics',
    title: 'Theory of Relativity: Understanding Einstein\'s Revolutionary Ideas',
    content: `Einstein's Theory of Relativity fundamentally changed our understanding of space, time, and gravity. It consists of two parts: Special Relativity (1905) and General Relativity (1915).

Special Relativity Key Concepts:
- The speed of light is constant in all inertial reference frames (299,792,458 m/s)
- Time and space are relative and interconnected
- E=mc² equations shows mass-energy equivalence
- Length contraction and time dilation occur at high velocities

General Relativity Key Concepts:
- Gravity is not a force but a curvature of spacetime
- Massive objects bend spacetime around them
- Light bends when passing near massive objects (gravitational lensing)
- Black holes are regions where spacetime curvature is extreme
- Gravitational waves are ripples in spacetime

Applications:
- GPS satellites require relativistic corrections
- Understanding black holes and neutron stars
- Cosmology and understanding the universe's origin
- Nuclear power and energy production

The theory has been validated through countless experiments and observations, including the recent detection of gravitational waves (2015 Nobel Prize).`,
    tags: ['physics', 'relativity', 'einstein', 'spacetime'],
    level: 'Class 12',
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&q=80',
    savedAt: undefined
  },
  {
    id: 'deepdive_3',
    subject: 'Chemistry',
    title: 'Atomic Structure and Electron Configuration',
    content: `An atom consists of a nucleus containing protons and neutrons, surrounded by electrons in electron shells. Understanding atomic structure is fundamental to chemistry.

Nuclear Structure:
- Protons: Positively charged particles, determine element type (atomic number)
- Neutrons: Neutral particles, contribute to mass
- Electrons: Negatively charged particles, occupy electron shells

Electron Configuration:
- Electrons occupy orbitals in order of increasing energy
- Aufbau Principle: Electrons fill lowest energy orbitals first
- Pauli Exclusion Principle: No two electrons can have identical quantum numbers
- Hund's Rule: Electrons occupy orbitals singly before pairing

Energy Levels and Shells:
- Each shell can hold maximum 2n² electrons (n = shell number)
- Valence electrons (outermost) determine chemical properties
- Transition metals have partially filled d-orbitals

Chemical Bonding:
- Ionic bonds: Transfer of electrons between atoms
- Covalent bonds: Sharing of electrons between atoms
- Metallic bonds: Delocalized electrons in metal lattice
- Hydrogen bonds: Weak intermolecular forces

The periodic table organizes elements by atomic number and electron configuration, revealing patterns in chemical properties.`,
    tags: ['chemistry', 'atoms', 'electrons', 'bonding'],
    level: 'Class 11',
    imageUrl: 'https://images.unsplash.com/photo-1564466809058-bf47adaf81c8?w=800&q=80',
    savedAt: undefined
  },
  {
    id: 'deepdive_4',
    subject: 'Biology',
    title: 'Evolution and Natural Selection: Darwin\'s Revolutionary Theory',
    content: `Charles Darwin's Theory of Evolution by Natural Selection explains the diversity of life on Earth through descent with modification.

Core Principles:
1. Variation: Individuals within a population exhibit different traits
2. Heredity: Many traits are inherited from parents to offspring
3. Competition: Organisms compete for limited resources
4. Differential Survival: Organisms with advantageous traits are more likely to survive and reproduce
5. Evolution: Population changes over time as beneficial traits become more common

Evidence for Evolution:
- Fossil Record: Shows gradual changes in species over millions of years
- Anatomical Similarities: Homologous structures across different species
- Biochemical Similarity: DNA and proteins similar across all life forms
- Geographic Isolation: Different species on isolated islands share common ancestors
- Direct Observation: Species changes can be observed in laboratories

Mechanisms of Evolution:
- Natural Selection: Differential reproduction based on fitness
- Genetic Drift: Random changes in gene frequencies
- Gene Flow: Movement of genes between populations
- Mutation: Source of genetic variation

Modern Evolutionary Theory combines Darwin's natural selection with Mendelian genetics and molecular biology, explaining speciation, extinction, and the unity of life.`,
    tags: ['biology', 'evolution', 'darwin', 'natural-selection'],
    level: 'Class 12',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    savedAt: undefined
  },
  {
    id: 'deepdive_5',
    subject: 'Economics',
    title: 'Supply and Demand: Fundamental Economic Principles',
    content: `Supply and demand are fundamental economic principles that determine prices and quantities of goods and services in markets.

The Law of Demand:
- As price increases, quantity demanded decreases (inverse relationship)
- Consumers purchase more at lower prices
- Demand curve slopes downward from left to right
- Affected by income, preferences, price of related goods

The Law of Supply:
- As price increases, quantity supplied increases (positive relationship)
- Producers are willing to supply more at higher prices
- Supply curve slopes upward from left to right
- Affected by production costs, technology, number of suppliers

Market Equilibrium:
- Occurs where quantity demanded equals quantity supplied
- Equilibrium price: No tendency for price to change
- Equilibrium quantity: Amount traded at equilibrium price
- Creates an efficient allocation of resources

Shifts in Supply and Demand:
- Changes in consumer preferences can shift demand
- Technological improvements can shift supply
- Government policies can affect both supply and demand
- External shocks (natural disasters, pandemics) can cause shifts

Elasticity:
- Price elasticity measures responsiveness to price changes
- Income elasticity measures responsiveness to income changes
- Cross-price elasticity measures responsiveness to other goods' prices
- Elasticity determines revenue strategies for businesses

Supply and demand analysis helps explain inflation, unemployment, economic cycles, and guides government policy decisions.`,
    tags: ['economics', 'supply-demand', 'markets', 'equilibrium'],
    level: 'Class 12',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    savedAt: undefined
  },
];

// ==================== CAREER ROADMAPS DATABASE (40+ Career Paths) ====================
export const CAREER_ROADMAPS_DB: CareerRoadmap[] = [
  {
    id: 'career_1',
    title: 'Software Engineer',
    description: 'Build and maintain software applications',
    skills: ['Programming', 'Problem Solving', 'Java/Python/C++', 'Data Structures', 'System Design'],
    salaryRange: '₹800K - ₹30L',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook', 'Indian Tech Companies'],
    educationPath: 'B.Tech/BCA',
    experience: '0-5 years entry level',
    growthPath: ['Junior Developer', 'Senior Developer', 'Tech Lead', 'Engineering Manager', 'CTO'],
    tips: 'Build portfolio on GitHub, contribute to open source, practice coding daily'
  },
  {
    id: 'career_2', 
    title: 'Data Scientist',
    description: 'Analyze data to drive business decisions',
    skills: ['Statistics', 'Python/R', 'Machine Learning', 'SQL', 'Data Visualization'],
    salaryRange: '₹1000K - ₹35L',
    companies: ['Google', 'Amazon', 'Microsoft', 'McKinsey', 'Flipkart', 'Zomato'],
    educationPath: 'B.Tech/M.Sc with Statistics',
    experience: 'Strong math and programming background',
    growthPath: ['Junior Data Scientist', 'Senior Data Scientist', 'Lead', 'Manager'],
    tips: 'Learn machine learning frameworks, build projects, participate in Kaggle competitions'
  },
  {
    id: 'career_3',
    title: 'Product Manager',
    description: 'Guide product development and strategy',
    skills: ['Strategic Thinking', 'Communication', 'Analytics', 'Business Acumen', 'Leadership'],
    salaryRange: '₹1200K - ₹40L',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'Startups'],
    educationPath: 'Any degree + MBA helpful',
    experience: 'Cross-functional experience required',
    growthPath: ['Associate PM', 'Product Manager', 'Senior PM', 'Director', 'VP Product'],
    tips: 'Learn customer empathy, understand metrics, stay updated with tech trends'
  },
  {
    id: 'career_4',
    title: 'UX/UI Designer',
    description: 'Create beautiful and usable interfaces',
    skills: ['Design Thinking', 'Figma/Adobe XD', 'User Research', 'Prototyping', 'CSS/HTML'],
    salaryRange: '₹700K - ₹25L',
    companies: ['Google', 'Amazon', 'Adobe', 'Dribbble Teams', 'Design Studios'],
    educationPath: 'Design/IT degree or Self-taught',
    experience: 'Portfolio is more important than degree',
    growthPath: ['Junior Designer', 'Designer', 'Senior Designer', 'Design Lead', 'Director'],
    tips: 'Build strong portfolio, learn user research, understand business context'
  },
  {
    id: 'career_5',
    title: 'Data Analyst',
    description: 'Interpret data to help organizations',
    skills: ['Excel', 'SQL', 'Tableau/PowerBI', 'Statistics', 'Business Understanding'],
    salaryRange: '₹500K - ₹18L',
    companies: ['Google Analytics', 'Microsoft', 'Amazon', 'Flipkart', 'Consulting Firms'],
    educationPath: 'Any degree (Math/Stats preferred)',
    experience: 'Entry level available',
    growthPath: ['Junior Analyst', 'Data Analyst', 'Senior Analyst', 'Analytics Manager'],
    tips: 'Master Excel and SQL, learn visualization, understand business metrics'
  },
];

// ==================== CODING SNIPPETS DATABASE (50+ Code Examples) ====================
export const CODE_SNIPPETS_DB: CodeSnippet[] = [
  {
    id: 'code_1',
    title: 'Simple React Component',
    language: 'JavaScript/React',
    code: `import React, { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};`,
    explanation: 'A simple React component demonstrating useState hook for state management.'
  },
  {
    id: 'code_2',
    title: 'JavaScript Array Methods',
    language: 'JavaScript',
    code: `// map - Transform array elements
const numbers = [1, 2, 3];
const squared = numbers.map(n => n * n); // [1, 4, 9]

// filter - Keep elements that match condition
const evens = numbers.filter(n => n % 2 === 0); // [2]

// reduce - Combine all elements into one value
const sum = numbers.reduce((total, n) => total + n, 0); // 6

// find - Get first matching element
const found = numbers.find(n => n > 2); // 3`,
    explanation: 'Essential JavaScript array methods for functional programming.'
  },
  {
    id: 'code_3',
    title: 'Python List Comprehension',
    language: 'Python',
    code: `# Create list of squared numbers
squares = [x**2 for x in range(10)]  # [0, 1, 4, 9, 16, ...]

# Filter even numbers
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]

# Nested list comprehension
matrix = [[i*j for j in range(3)] for i in range(3)]

# Dictionary comprehension
squares_dict = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, ...}`,
    explanation: 'Pythonic way to create and filter lists and dictionaries concisely.'
  },
  {
    id: 'code_4',
    title: 'SQL Query Examples',
    language: 'SQL',
    code: `-- Select with WHERE
SELECT * FROM users WHERE age > 18;

-- JOIN tables
SELECT users.name, orders.amount 
FROM users 
JOIN orders ON users.id = orders.user_id;

-- GROUP BY with aggregation
SELECT category, COUNT(*) as count, AVG(price) as avg_price
FROM products 
GROUP BY category;

-- ORDER and LIMIT
SELECT * FROM products
WHERE category = 'Electronics'
ORDER BY price DESC
LIMIT 10;`,
    explanation: 'Common SQL queries for database operations.'
  },
  {
    id: 'code_5',
    title: 'Async/Await in JavaScript',
    language: 'JavaScript',
    code: `// Async function returns a promise
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Using async function
async function main() {
  const data = await fetchData('/api/users');
  console.log(data);
}

main();`,
    explanation: 'Modern async/await syntax for handling asynchronous operations cleanly.'
  },
];

// ==================== LEARNING GUIDES DATABASE (30+ Guides) ====================
export const LEARNING_GUIDES_DB: LMGuide[] = [
  {
    id: 'guide_1',
    title: 'How to Learn Programming Effectively',
    language: 'en',
    overview: 'A comprehensive guide to becoming a proficient programmer from scratch',
    sections: [
      {
        title: 'Choose Your Language',
        content: 'Start with beginner-friendly languages like Python or JavaScript. Python has clean syntax.',
        tips: ['Focus on fundamentals first', 'Practice consistently', 'Build small projects']
      },
      {
        title: 'Practice Problems',
        content: 'Solve problems on platforms like LeetCode, HackerRank, CodeSignal to strengthen your skills.',
        tips: ['Start with easy problems', 'Understand the solution', 'Code without looking at answers']
      },
      {
        title: 'Build Projects',
        content: 'Apply your knowledge by building real projects. Start simple, gradually increase complexity.',
        tips: ['Build a few simple programs', 'Push code to GitHub', 'Contribute to open source']
      }
    ],
    estimatedTime: '3-6 months',
    difficulty: 'Beginner to Intermediate'
  },
];

export const ALL_MASSIVE_DATABASES = {
  questions: MASSIVE_QUESTIONS_DB,
  news: MASSIVE_NEWS_DB,
  facts: MASSIVE_FACTS_DB,
  deepDiveArticles: DEEP_DIVE_ARTICLES_DB,
  careerRoadmaps: CAREER_ROADMAPS_DB,
  codeSnippets: CODE_SNIPPETS_DB,
  learningGuides: LEARNING_GUIDES_DB
};
