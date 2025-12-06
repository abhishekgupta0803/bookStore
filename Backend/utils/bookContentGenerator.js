// Utility to generate unique book content based on book name/title
const generateBookContent = (bookName, bookTitle, category) => {
  const name = bookName.toLowerCase();
  const title = bookTitle || "";
  
  // Generate unique content based on book name and category
  const contentTemplates = {
    // Story & Fiction
    'story book': `# ${bookName}

${bookTitle || "An inspiring story collection for readers of all ages."}

## Chapter 1: The Beginning

Once upon a time, in a world filled with wonder and magic, stories began to unfold. This collection brings together tales that have inspired generations, each one carefully crafted to touch the hearts of readers young and old.

The first story tells of a young adventurer who discovered that the greatest treasures in life are not gold or jewels, but the friendships we make along the way. Through trials and tribulations, our hero learned valuable lessons about courage, kindness, and the power of believing in oneself.

## Chapter 2: Lessons Learned

As we journey through these pages, we encounter characters who face challenges with determination and grace. Each story is a window into different worlds, different perspectives, and different ways of thinking.

The narratives weave together themes of hope, resilience, and the enduring power of the human spirit. Whether you're reading alone or sharing these stories with loved ones, you'll find something meaningful in every chapter.

## Chapter 3: The Journey Continues

These stories remind us that life is an adventure, full of unexpected twists and turns. They teach us that every ending is a new beginning, and that the stories we tell shape the people we become.

As you read through this collection, take time to reflect on the messages within. Let these tales inspire you to write your own story, one filled with purpose, passion, and endless possibilities.

---

*This book is a celebration of storytelling, designed to inspire readers of all ages to discover the magic within themselves and the world around them.*`,

    'adventure tales': `# ${bookName}

${bookTitle || "Discover thrilling stories full of adventures."}

## Prologue: The Call to Adventure

Adventure calls to those who dare to answer. This book is a collection of thrilling tales that will take you on journeys across uncharted territories, through mysterious lands, and into the depths of the unknown.

## Chapter 1: The First Quest

Our first adventure begins with a map discovered in an ancient library. The map leads to a hidden treasure, but the path is fraught with danger. Our protagonist must navigate treacherous mountains, cross raging rivers, and solve puzzles left by those who came before.

Along the way, they encounter allies and enemies, each encounter teaching valuable lessons about trust, strategy, and the importance of perseverance. The quest is not just about finding treasure—it's about discovering who you truly are.

## Chapter 2: Into the Unknown

The second tale takes us deep into a jungle where ancient ruins hide secrets of a lost civilization. Our adventurer must use all their skills: climbing, problem-solving, and most importantly, understanding the language of the land.

The jungle teaches respect for nature and the wisdom of those who came before us. Every step forward reveals new mysteries, and every mystery solved brings us closer to understanding the greater purpose of the journey.

## Chapter 3: The Final Challenge

The climax of our adventure collection brings together all the lessons learned. Our hero faces their greatest challenge yet, one that tests not just their physical abilities, but their moral compass and their commitment to doing what's right.

In the end, the greatest adventure is not the destination, but the transformation that occurs along the way. These tales remind us that we are all adventurers in our own lives, writing our stories one day at a time.

---

*May these adventures inspire you to seek your own quests and discover the hero within.*`,

    'learning guide': `# ${bookName}

${bookTitle || "A perfect guide for beginners and learners."}

## Introduction: Your Learning Journey Begins

Welcome to your comprehensive learning guide! This book is designed to take you from beginner to confident learner, step by step. Whether you're starting a new skill or deepening existing knowledge, this guide will be your companion.

## Part 1: Foundations

Every great journey begins with solid foundations. In this section, we'll explore the fundamental concepts that form the bedrock of your learning path. Understanding these basics is crucial—they're the building blocks upon which all advanced knowledge rests.

We'll cover:
- Core principles and concepts
- Essential terminology
- Common mistakes to avoid
- Best practices for effective learning

## Part 2: Building Skills

Once you've mastered the foundations, it's time to build your skills. This section provides practical exercises, real-world examples, and hands-on activities that will help you apply what you've learned.

You'll discover:
- Step-by-step tutorials
- Practice exercises with solutions
- Tips from experienced learners
- How to track your progress

## Part 3: Advanced Techniques

As you progress, you'll want to explore more advanced techniques. This section introduces sophisticated concepts and strategies that will take your skills to the next level.

## Part 4: Putting It All Together

The final section shows you how to integrate everything you've learned into real-world applications. You'll see how all the pieces fit together and how to continue growing beyond this guide.

---

*Remember: Learning is a lifelong journey. This guide is just the beginning. Keep curious, keep practicing, and never stop exploring.*`,

    'motivational book': `# ${bookName}

${bookTitle || "Boost your confidence and stay motivated."}

## Chapter 1: The Power Within

You have within you everything you need to achieve your dreams. This book is designed to help you unlock that power, boost your confidence, and maintain the motivation needed to reach your goals.

## Chapter 2: Overcoming Obstacles

Life will present challenges—that's inevitable. But how you respond to those challenges defines who you become. In this chapter, we explore strategies for turning obstacles into opportunities and setbacks into stepping stones.

## Chapter 3: Building Confidence

Confidence isn't something you're born with—it's something you build. Through daily practices, positive affirmations, and consistent action, you can develop unshakeable confidence that carries you through any situation.

## Chapter 4: Staying Motivated

Motivation can be fleeting, but discipline is permanent. Learn how to create systems that keep you moving forward even when motivation wanes. Discover the power of habits, routines, and the compound effect of small, consistent actions.

## Chapter 5: Your Success Story

You are the author of your life story. This final chapter helps you envision your future, set meaningful goals, and create a plan to make your dreams a reality. Your success story starts today.

---

*Believe in yourself. You are capable of more than you know. Start now, and watch yourself transform.*`,

    'science explorer': `# ${bookName}

${bookTitle || "Learn amazing science facts and experiments."}

## Introduction: The World of Science

Science is all around us, from the smallest particles to the vastness of space. This book will take you on an exciting journey through the wonders of science, making complex concepts accessible and engaging.

## Chapter 1: The Building Blocks of Matter

Everything in the universe is made of atoms—tiny particles that combine in fascinating ways. Learn about the periodic table, chemical reactions, and how matter transforms. Simple experiments help you see these concepts in action.

## Chapter 2: Forces and Motion

Why do objects fall? How do rockets reach space? Explore the laws of physics that govern motion, gravity, and energy. Discover how these forces shape our world and enable incredible technologies.

## Chapter 3: Life Sciences

From single-celled organisms to complex ecosystems, life on Earth is diverse and interconnected. This chapter explores biology, ecology, and the amazing adaptations that help living things survive and thrive.

## Chapter 4: Earth and Space

Journey from the depths of the ocean to the far reaches of space. Learn about geology, weather patterns, planets, and stars. Understand our place in the cosmos and the incredible scale of the universe.

## Chapter 5: Hands-On Experiments

Put your knowledge to the test with safe, fun experiments you can do at home. Each experiment demonstrates scientific principles and helps you think like a scientist.

---

*Science is not just facts to memorize—it's a way of understanding the world. Keep asking questions, keep exploring, and keep discovering.*`
  };

  // Try to find matching template
  for (const [key, template] of Object.entries(contentTemplates)) {
    if (name.includes(key) || key.includes(name)) {
      return template;
    }
  }

  // Generate generic content based on category
  const categoryContent = {
    'free': `# ${bookName}

${bookTitle || "A valuable resource for all readers."}

## Introduction

Welcome to ${bookName}! This comprehensive guide is designed to provide you with valuable insights and knowledge. Whether you're a beginner or looking to expand your understanding, this book offers something for everyone.

## Main Content

Throughout these pages, you'll discover:
- Essential concepts and principles
- Practical applications and examples
- Tips and best practices
- Real-world insights

## Conclusion

This book is designed to be a valuable resource in your learning journey. Take your time, practice what you learn, and apply these concepts in your daily life.

---

*Thank you for reading. Continue your journey of discovery and growth.*`,

    'paid': `# ${bookName}

${bookTitle || "An in-depth exploration of essential topics."}

## Chapter 1: Getting Started

${bookName} is your comprehensive guide to mastering essential concepts and skills. This premium content has been carefully crafted to provide you with the most valuable and up-to-date information.

## Chapter 2: Core Concepts

Dive deep into the fundamental principles that form the foundation of this subject. We'll explore each concept thoroughly, with detailed explanations, examples, and practical applications.

## Chapter 3: Advanced Techniques

Once you've mastered the basics, we'll move on to more advanced techniques and strategies. These methods will help you achieve professional-level results and solve complex problems.

## Chapter 4: Real-World Applications

See how these concepts apply in real-world scenarios. Through case studies and practical examples, you'll learn how to adapt and apply your knowledge effectively.

## Chapter 5: Mastery and Beyond

The final chapter focuses on achieving mastery and continuing your growth beyond this book. You'll learn how to stay current, continue learning, and become a true expert in your field.

---

*This premium content represents years of expertise and research. Use it wisely, practice consistently, and watch yourself grow.*`
  };

  // Return category-based content or default
  if (categoryContent[category?.toLowerCase()]) {
    return categoryContent[category.toLowerCase()];
  }

  // Default generic content
  return `# ${bookName}

${bookTitle || "A comprehensive guide for readers."}

## Introduction

Welcome to ${bookName}! This book has been created to provide you with valuable content and insights. Each chapter is designed to build upon the previous one, creating a comprehensive learning experience.

## Main Content

The content of this book covers essential topics, practical examples, and actionable insights. As you read through each section, take time to reflect on how these concepts apply to your own situation.

## Key Topics Covered

- Fundamental principles
- Practical applications
- Best practices
- Advanced techniques
- Real-world examples

## Conclusion

We hope this book serves as a valuable resource in your journey. Remember that learning is a continuous process, and this book is just one step in your path to mastery.

---

*Thank you for choosing ${bookName}. We wish you success in all your endeavors.*`;
};

module.exports = { generateBookContent };

