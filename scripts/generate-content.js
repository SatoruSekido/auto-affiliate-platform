const fs = require('fs');
const path = require('path');

/**
 * 自動コンテンツ生成スクリプト
 *
 * 使用方法:
 * SITE_ID=site1 node scripts/generate-content.js
 *
 * または無料APIを使用する場合:
 * OPENAI_API_KEY=your_key SITE_ID=site1 node scripts/generate-content.js
 */

const siteId = process.env.SITE_ID || 'site1';
const configPath = path.join(__dirname, '..', 'sites', siteId, 'config', 'site-config.json');
const contentDir = path.join(__dirname, '..', 'sites', siteId, 'content');

if (!fs.existsSync(configPath)) {
  console.error(`Site config not found: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// コンテンツテンプレート（実際のAPIが利用できない場合のフォールバック）
const topicTemplates = {
  'ai-tools': [
    'Top 10 AI Tools for Content Creation in 2024',
    'How to Use ChatGPT for Business Automation',
    'AI Image Generators Comparison: Midjourney vs DALL-E',
    'Best AI Writing Assistants for Bloggers',
    'AI Tools That Can Save You 10+ Hours Per Week',
  ],
  'software-comparisons': [
    'Notion vs Obsidian: Which Note-Taking App Is Better?',
    'Figma vs Adobe XD: Complete Design Tool Comparison',
    'Slack vs Microsoft Teams: Best Team Chat in 2024',
    'Grammarly vs ProWritingAid: Grammar Checker Review',
    'Zoom vs Google Meet: Video Conferencing Showdown',
  ],
  'web-development': [
    'React Hooks Tutorial: useEffect Best Practices',
    'Next.js 14 App Router: Complete Guide',
    'Tailwind CSS Tips and Tricks for Faster Development',
    'TypeScript for Beginners: Essential Concepts',
    'Building a REST API with Node.js and Express',
  ],
  'productivity-tools': [
    'Best Time Tracking Apps for Freelancers in 2024',
    'How to Build a Perfect Morning Routine',
    'Top 7 Project Management Tools Compared',
    'Todoist vs Things 3: Task Manager Comparison',
    'Productivity Hacks Used by Successful Entrepreneurs',
  ],
  'tech-tutorials': [
    'How to Set Up a Home Server in 2024',
    'Complete Guide to Git and GitHub for Beginners',
    'Building Your First Chrome Extension: Step by Step',
    'How to Automate Tasks with Python Scripts',
    'Setting Up a Professional Blog with WordPress',
  ],
};

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function generateContent(topic) {
  const slug = generateSlug(topic);
  const date = new Date().toISOString().split('T')[0];
  const keywords = topic.toLowerCase().split(' ').filter(w => w.length > 3);

  // 基本的なコンテンツ構造
  const content = `---
title: "${topic}"
date: "${date}"
excerpt: "Discover everything you need to know about ${topic.toLowerCase()}. This comprehensive guide will help you make informed decisions."
keywords: ${JSON.stringify(keywords.slice(0, 5))}
---

## Introduction

${topic} is becoming increasingly important in today's digital landscape. In this comprehensive guide, we'll explore everything you need to know to make an informed decision.

## What You Need to Know

### Key Features

When considering ${topic.toLowerCase()}, there are several important factors to keep in mind:

- **Performance**: Understanding the performance characteristics
- **Usability**: How easy it is to use and implement
- **Cost**: Value for money and pricing considerations
- **Support**: Available resources and community support

### Benefits

The main advantages include:

1. **Efficiency**: Save time and increase productivity
2. **Quality**: Achieve better results with less effort
3. **Scalability**: Grow with your needs over time
4. **Integration**: Works well with existing tools and workflows

## Getting Started

Here's a step-by-step guide to get you started:

### Step 1: Research
Take time to understand your specific needs and requirements.

### Step 2: Compare Options
Look at different alternatives and their unique features.

### Step 3: Test
Try out different options before making a final decision.

### Step 4: Implement
Once you've made your choice, follow best practices for implementation.

## Best Practices

To get the most out of your choice:

- Start with the basics and gradually explore advanced features
- Join relevant communities for tips and support
- Keep updated with latest developments
- Document your process for future reference

## Common Mistakes to Avoid

- Rushing the decision without proper research
- Ignoring user reviews and feedback
- Not considering long-term costs
- Overlooking integration requirements

## Conclusion

${topic} offers significant value for those willing to invest time in learning and implementation. By following this guide, you'll be well-equipped to make the right choice for your needs.

Remember to bookmark this page and check back for updates as we continue to add more insights and recommendations.

## Frequently Asked Questions

**Q: Is this suitable for beginners?**
A: Yes, with proper guidance and patience, beginners can successfully get started.

**Q: What's the learning curve like?**
A: The initial learning curve is moderate, but becomes easier with practice.

**Q: Are there free alternatives?**
A: Yes, there are several free options available with different feature sets.

---

*Disclosure: This article contains affiliate links. We may earn a commission from purchases made through these links at no additional cost to you.*
`;

  return { slug, content };
}

async function generateWithAPI(topic) {
  // 将来的にOpenAI APIや他の無料APIを使用する場合
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.log('No API key found, using template generation');
    return generateContent(topic);
  }

  // TODO: OpenAI API統合
  // const axios = require('axios');
  // const response = await axios.post('https://api.openai.com/v1/chat/completions', {...});

  return generateContent(topic);
}

async function main() {
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const topics = topicTemplates[config.niche] || topicTemplates['ai-tools'];
  const numPosts = process.env.NUM_POSTS || 5;

  console.log(`Generating ${numPosts} posts for ${config.siteName} (${config.niche})`);

  for (let i = 0; i < Math.min(numPosts, topics.length); i++) {
    const topic = topics[i];
    const { slug, content } = await generateWithAPI(topic);
    const filePath = path.join(contentDir, `${slug}.md`);

    fs.writeFileSync(filePath, content);
    console.log(`✓ Generated: ${slug}.md`);
  }

  console.log(`\nSuccessfully generated ${numPosts} posts!`);
}

main().catch(console.error);
