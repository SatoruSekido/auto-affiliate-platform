const fs = require('fs');
const path = require('path');
const axios = require('axios');

/**
 * AI駆動コンテンツ生成スクリプト
 *
 * OpenAI APIを使用して本当に質の高いコンテンツを生成
 *
 * 使用方法:
 * OPENAI_API_KEY=your_key SITE_ID=site1 node scripts/ai-content-generator.js
 */

const siteId = process.env.SITE_ID || 'site1';
const apiKey = process.env.OPENAI_API_KEY;
const configPath = path.join(__dirname, '..', 'sites', siteId, 'config', 'site-config.json');
const contentDir = path.join(__dirname, '..', 'sites', siteId, 'content');

if (!fs.existsSync(configPath)) {
  console.error(`Site config not found: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// トピックテンプレート
const topicTemplates = {
  'ai-tools': [
    'Top 10 AI Tools for Content Creation in 2025',
    'How to Use ChatGPT for Business Automation',
    'AI Image Generators: Comprehensive Comparison',
    'Best AI Writing Assistants for Bloggers',
    'AI Productivity Tools That Save Time',
  ],
  'software-comparisons': [
    'Notion vs Obsidian: Complete Comparison',
    'Figma vs Adobe XD: Which is Better?',
    'Slack vs Microsoft Teams: Detailed Review',
    'Grammarly vs ProWritingAid: In-Depth Analysis',
    'Zoom vs Google Meet: Feature Comparison',
  ],
  'web-development': [
    'React Hooks: Complete Tutorial',
    'Next.js 14 App Router Guide',
    'Tailwind CSS Tips for Developers',
    'TypeScript Best Practices',
    'Building REST APIs with Node.js',
  ],
  'productivity-tools': [
    'Best Time Tracking Apps for 2025',
    'Perfect Morning Routine Guide',
    'Project Management Tools Compared',
    'Todoist vs Things 3 Review',
    'Productivity Hacks for Entrepreneurs',
  ],
  'tech-tutorials': [
    'Home Server Setup Guide',
    'Git and GitHub for Beginners',
    'Building Chrome Extensions',
    'Python Automation Scripts',
    'WordPress Blog Setup Tutorial',
  ],
};

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function generateWithOpenAI(topic, niche) {
  if (!apiKey) {
    console.error('❌ OPENAI_API_KEY not set');
    console.log('\nPlease set your OpenAI API key:');
    console.log('export OPENAI_API_KEY=your_key_here');
    console.log('\nOr use the template-based generator:');
    console.log('npm run generate-enhanced');
    process.exit(1);
  }

  console.log(`🤖 Generating AI content for: ${topic}`);

  const prompt = `Write a comprehensive, SEO-optimized blog post about "${topic}" for a ${niche} blog.

Requirements:
- 2500-3000 words
- Include practical examples and case studies
- Add FAQ section with 5 questions
- Use H2 and H3 headings
- Include specific tools, prices, and recommendations
- Write in a professional but accessible tone
- Add a comparison table if relevant
- Include actionable tips and best practices

Format in Markdown with frontmatter:
---
title: "[Title]"
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "[Compelling 2-sentence description]"
keywords: ["keyword1", "keyword2", "keyword3"]
---

[Full article content in markdown]`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo-preview', // または gpt-3.5-turbo（安価）
        messages: [
          {
            role: 'system',
            content: 'You are an expert content writer specializing in technology, productivity, and software reviews. You write engaging, informative, and SEO-optimized articles.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    console.log(`✅ Generated ${content.length} characters`);
    return content;

  } catch (error) {
    console.error('❌ OpenAI API Error:', error.response?.data || error.message);
    throw error;
  }
}

async function generateWithClaude(topic, niche) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error('❌ ANTHROPIC_API_KEY not set');
    throw new Error('Claude API key required');
  }

  console.log(`🤖 Generating AI content with Claude for: ${topic}`);

  const prompt = `Write a comprehensive blog post about "${topic}" for a ${niche} blog.

Requirements:
- 2500-3000 words
- Include practical examples
- Add FAQ section
- Use H2 and H3 headings
- Professional but accessible tone

Format in Markdown with frontmatter.`;

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
      },
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.content[0].text;
    console.log(`✅ Generated ${content.length} characters`);
    return content;

  } catch (error) {
    console.error('❌ Claude API Error:', error.response?.data || error.message);
    throw error;
  }
}

async function main() {
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const topics = topicTemplates[config.niche] || topicTemplates['ai-tools'];
  const numPosts = parseInt(process.env.NUM_POSTS) || 1;
  const provider = process.env.AI_PROVIDER || 'openai'; // 'openai' or 'claude'

  console.log(`\n🚀 Generating ${numPosts} AI-powered posts for ${config.siteName}\n`);
  console.log(`Provider: ${provider.toUpperCase()}`);
  console.log(`Niche: ${config.niche}\n`);

  for (let i = 0; i < Math.min(numPosts, topics.length); i++) {
    const topic = topics[i];
    const slug = generateSlug(topic);
    const filePath = path.join(contentDir, `${slug}.md`);

    try {
      let content;
      if (provider === 'claude') {
        content = await generateWithClaude(topic, config.niche);
      } else {
        content = await generateWithOpenAI(topic, config.niche);
      }

      fs.writeFileSync(filePath, content);
      console.log(`✅ Saved: ${slug}.md\n`);

      // Rate limiting - wait between requests
      if (i < numPosts - 1) {
        console.log('⏳ Waiting 5 seconds before next request...\n');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }

    } catch (error) {
      console.error(`❌ Failed to generate: ${topic}`);
      console.error(error.message);
    }
  }

  console.log(`\n🎉 Generation complete!`);
  console.log(`📊 Total files: ${fs.readdirSync(contentDir).length}\n`);
}

// エラーハンドリング
process.on('unhandledRejection', (error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});

main().catch(console.error);
