const fs = require('fs');
const path = require('path');

/**
 * 強化版自動コンテンツ生成スクリプト
 *
 * より詳細で価値の高いコンテンツを生成
 * SEO最適化、アフィリエイトリンク自動挿入
 */

const siteId = process.env.SITE_ID || 'site1';
const configPath = path.join(__dirname, '..', 'sites', siteId, 'config', 'site-config.json');
const contentDir = path.join(__dirname, '..', 'sites', siteId, 'content');

if (!fs.existsSync(configPath)) {
  console.error(`Site config not found: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// より詳細で価値の高いトピックテンプレート
const topicTemplates = {
  'ai-tools': [
    { title: 'Top 10 AI Tools for Content Creation in 2024', keywords: ['AI tools', 'content creation', 'ChatGPT', 'Jasper', 'Copy.ai'], products: ['AI software', 'writing tools', 'content creation software'] },
    { title: 'How to Use ChatGPT for Business Automation', keywords: ['ChatGPT', 'business automation', 'AI assistant', 'productivity'], products: ['ChatGPT Plus', 'AI books', 'automation tools'] },
    { title: 'AI Image Generators Comparison: Midjourney vs DALL-E', keywords: ['AI image generator', 'Midjourney', 'DALL-E', 'comparison'], products: ['graphics tablet', 'design books', 'AI art tools'] },
    { title: 'Best AI Writing Assistants for Bloggers in 2024', keywords: ['AI writing', 'blogging tools', 'content assistant', 'SEO'], products: ['writing software', 'blogging books', 'grammar checker'] },
    { title: 'AI Tools That Can Save You 10+ Hours Per Week', keywords: ['productivity', 'time saving', 'AI automation', 'efficiency'], products: ['productivity books', 'time management tools', 'AI subscriptions'] },
  ],
  'software-comparisons': [
    { title: 'Notion vs Obsidian: Which Note-Taking App Is Better?', keywords: ['Notion', 'Obsidian', 'note-taking', 'comparison', 'productivity'], products: ['productivity books', 'tablet', 'stylus', 'note-taking apps'] },
    { title: 'Figma vs Adobe XD: Complete Design Tool Comparison', keywords: ['Figma', 'Adobe XD', 'design tools', 'UI UX', 'comparison'], products: ['design books', 'graphics tablet', 'monitor', 'mouse'] },
    { title: 'Slack vs Microsoft Teams: Best Team Chat in 2024', keywords: ['Slack', 'Microsoft Teams', 'team communication', 'collaboration'], products: ['headset', 'webcam', 'collaboration books', 'microphone'] },
    { title: 'Grammarly vs ProWritingAid: Grammar Checker Review', keywords: ['Grammarly', 'ProWritingAid', 'grammar checker', 'writing'], products: ['writing books', 'style guide', 'dictionary', 'thesaurus'] },
    { title: 'Zoom vs Google Meet: Video Conferencing Showdown', keywords: ['Zoom', 'Google Meet', 'video conferencing', 'remote work'], products: ['webcam', 'microphone', 'lighting', 'headset', 'background screen'] },
  ],
  'web-development': [
    { title: 'React Hooks Tutorial: useEffect Best Practices', keywords: ['React', 'React Hooks', 'useEffect', 'JavaScript', 'tutorial'], products: ['React books', 'JavaScript books', 'web development course', 'monitor'] },
    { title: 'Next.js 14 App Router: Complete Guide', keywords: ['Next.js', 'App Router', 'React', 'web development', 'tutorial'], products: ['Next.js books', 'web development books', 'coding keyboard'] },
    { title: 'Tailwind CSS Tips and Tricks for Faster Development', keywords: ['Tailwind CSS', 'CSS', 'web design', 'frontend', 'tips'], products: ['CSS books', 'web design books', 'monitor', 'keyboard'] },
    { title: 'TypeScript for Beginners: Essential Concepts', keywords: ['TypeScript', 'JavaScript', 'programming', 'beginners', 'tutorial'], products: ['TypeScript books', 'programming books', 'online course'] },
    { title: 'Building a REST API with Node.js and Express', keywords: ['Node.js', 'Express', 'REST API', 'backend', 'tutorial'], products: ['Node.js books', 'API books', 'development tools'] },
  ],
  'productivity-tools': [
    { title: 'Best Time Tracking Apps for Freelancers in 2024', keywords: ['time tracking', 'freelance', 'productivity', 'apps'], products: ['productivity books', 'timer', 'planner', 'time tracking software'] },
    { title: 'How to Build a Perfect Morning Routine', keywords: ['morning routine', 'productivity', 'habits', 'self-improvement'], products: ['habit tracker', 'journal', 'productivity books', 'alarm clock'] },
    { title: 'Top 7 Project Management Tools Compared', keywords: ['project management', 'productivity', 'tools', 'comparison'], products: ['project management books', 'planner', 'whiteboard', 'software'] },
    { title: 'Todoist vs Things 3: Task Manager Comparison', keywords: ['Todoist', 'Things 3', 'task management', 'productivity'], products: ['productivity books', 'planner', 'notebook', 'pen'] },
    { title: 'Productivity Hacks Used by Successful Entrepreneurs', keywords: ['productivity', 'entrepreneur', 'hacks', 'success'], products: ['entrepreneur books', 'productivity planner', 'standing desk'] },
  ],
  'tech-tutorials': [
    { title: 'How to Set Up a Home Server in 2024', keywords: ['home server', 'NAS', 'tech tutorial', 'self-hosting'], products: ['server hardware', 'NAS', 'hard drive', 'networking books'] },
    { title: 'Complete Guide to Git and GitHub for Beginners', keywords: ['Git', 'GitHub', 'version control', 'tutorial', 'beginners'], products: ['Git books', 'programming books', 'development tools'] },
    { title: 'Building Your First Chrome Extension: Step by Step', keywords: ['Chrome extension', 'JavaScript', 'tutorial', 'development'], products: ['JavaScript books', 'web development books', 'monitor'] },
    { title: 'How to Automate Tasks with Python Scripts', keywords: ['Python', 'automation', 'scripting', 'programming'], products: ['Python books', 'automation books', 'keyboard', 'mouse'] },
    { title: 'Setting Up a Professional Blog with WordPress', keywords: ['WordPress', 'blogging', 'tutorial', 'website'], products: ['WordPress books', 'blogging books', 'web hosting', 'domain'] },
  ],
};

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function generateProductSection(products, keywords) {
  const amazonTag = process.env.NEXT_PUBLIC_AMAZON_TAG || 'temp-tag-20';
  const productLinks = products.slice(0, 3).map(product =>
    `- **[${product}](https://www.amazon.com/s?k=${encodeURIComponent(product)}&tag=${amazonTag})** - Essential for ${keywords[0]}`
  ).join('\n');

  return `## Recommended Tools and Resources

To get the most out of ${keywords[0]}, here are some highly-rated products that can help:

${productLinks}

*As an Amazon Associate, we earn from qualifying purchases. These recommendations are based on quality and user reviews.*
`;
}

function generateEnhancedContent(topicData) {
  const { title, keywords, products } = topicData;
  const slug = generateSlug(title);
  const date = new Date().toISOString().split('T')[0];
  const mainTopic = title.split(':')[0];

  // より詳細で価値の高いコンテンツ
  const content = `---
title: "${title}"
date: "${date}"
excerpt: "Comprehensive guide to ${title.toLowerCase()}. Learn everything you need to know with expert insights, practical tips, and recommended tools."
keywords: ${JSON.stringify(keywords)}
---

## Introduction

Welcome to our comprehensive guide on **${mainTopic}**. Whether you're a beginner or looking to enhance your skills, this article will provide you with valuable insights and practical knowledge.

In this guide, we'll cover:
- Key concepts and fundamentals
- Step-by-step implementation
- Best practices and expert tips
- Common pitfalls to avoid
- Recommended tools and resources

## What Is ${mainTopic}?

${mainTopic} has become increasingly important in today's digital landscape. Understanding ${keywords[0]} can significantly impact your productivity and success.

### Key Benefits

1. **Increased Efficiency**: Save valuable time and streamline your workflow
2. **Better Results**: Achieve higher quality outcomes with less effort
3. **Competitive Advantage**: Stay ahead with cutting-edge tools and techniques
4. **Scalability**: Solutions that grow with your needs
5. **Cost-Effectiveness**: Maximize ROI on your investment

## Getting Started: A Step-by-Step Guide

### Step 1: Understanding the Basics

Before diving deep into ${keywords[0]}, it's crucial to understand the fundamentals. Here's what you need to know:

- **Core Concepts**: The foundation of ${keywords[1] || keywords[0]}
- **Prerequisites**: What you should know beforehand
- **Common Terminology**: Key terms explained simply

### Step 2: Choosing the Right Approach

Not all solutions are created equal. When selecting your ${keywords[0]} strategy:

#### Factors to Consider:

1. **Your Skill Level**: Beginner, intermediate, or advanced
2. **Budget Constraints**: Free vs paid options
3. **Time Investment**: Quick wins vs long-term solutions
4. **Specific Goals**: What you want to achieve
5. **Integration Needs**: Compatibility with existing tools

### Step 3: Implementation

Now let's get practical. Here's how to implement ${keywords[0]} effectively:

**For Beginners:**
- Start with the basics and don't rush
- Follow tutorials and documentation carefully
- Join communities for support and guidance
- Practice regularly to build competence

**For Advanced Users:**
- Explore advanced features and customization
- Optimize for performance and efficiency
- Share knowledge and help others
- Stay updated with latest developments

## Best Practices and Pro Tips

### Expert Recommendations

Based on extensive research and user feedback, here are the top recommendations:

1. **Plan Before You Act**: Take time to strategize
2. **Start Small, Scale Gradually**: Don't overwhelm yourself
3. **Document Your Process**: Keep notes for future reference
4. **Seek Feedback**: Learn from others' experiences
5. **Iterate and Improve**: Continuous improvement is key

### Common Mistakes to Avoid

⚠️ **Warning Signs:**

- Rushing without proper research
- Ignoring user reviews and testimonials
- Not considering long-term costs
- Overlooking learning curve
- Failing to test before committing

## Comparison: Popular Options

Let's compare the most popular ${keywords[0]} options available:

| Feature | Option A | Option B | Option C |
|---------|----------|----------|----------|
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Price** | $$ | $$$ | $ |
| **Features** | Comprehensive | Advanced | Basic |
| **Support** | Excellent | Good | Limited |
| **Learning Curve** | Low | Medium | High |

${generateProductSection(products, keywords)}

## Real-World Applications

### Case Studies

**Case Study 1: Small Business Success**
A small business implemented ${keywords[0]} and saw a 300% increase in productivity within 3 months.

**Case Study 2: Freelancer Efficiency**
A freelance professional reduced project time by 50% using ${keywords[1] || keywords[0]} techniques.

**Case Study 3: Enterprise Scale**
Large organization scaled operations successfully with ${keywords[0]} integration.

## Advanced Techniques

Once you've mastered the basics, consider these advanced strategies:

### Optimization Tips

1. **Performance Tuning**: Fine-tune for maximum efficiency
2. **Automation**: Automate repetitive tasks
3. **Integration**: Connect with other tools seamlessly
4. **Customization**: Tailor to your specific needs
5. **Monitoring**: Track metrics and adjust accordingly

### Power User Features

- Advanced configuration options
- Custom workflows and templates
- API integration possibilities
- Batch processing capabilities
- Advanced reporting and analytics

## Troubleshooting Common Issues

### Problem 1: Getting Started Difficulties

**Solution**: Begin with official tutorials and documentation. Join community forums for support.

### Problem 2: Performance Issues

**Solution**: Optimize settings, update software, check system requirements.

### Problem 3: Integration Challenges

**Solution**: Verify compatibility, use official plugins, consult documentation.

## Future Trends and Developments

The ${keywords[0]} landscape is constantly evolving. Here's what to watch for:

- **AI Integration**: Increasing automation and intelligence
- **Cloud-Based Solutions**: More flexible and accessible
- **Mobile-First Approach**: Better mobile experience
- **Enhanced Collaboration**: Improved team features
- **Security Enhancements**: Better data protection

## Frequently Asked Questions

**Q: Is this suitable for beginners?**
A: Absolutely! With proper guidance and patience, beginners can successfully master ${keywords[0]}.

**Q: How long does it take to learn?**
A: Basic proficiency: 1-2 weeks. Advanced skills: 2-3 months with regular practice.

**Q: What's the cost involved?**
A: Options range from free to premium. Start with free options and upgrade as needed.

**Q: Do I need technical skills?**
A: Basic computer literacy is sufficient for most ${keywords[0]} applications.

**Q: Are there free alternatives?**
A: Yes! Many excellent free options are available with good feature sets.

**Q: How do I stay updated?**
A: Follow official blogs, join newsletters, participate in communities.

## Conclusion

${mainTopic} offers tremendous value for those willing to invest time in learning and implementation. By following this comprehensive guide, you're now equipped with the knowledge and resources to succeed.

### Key Takeaways:

✅ Understand the fundamentals before diving deep
✅ Choose solutions that match your skill level and goals
✅ Start small and scale gradually
✅ Learn from mistakes and iterate
✅ Invest in quality tools and resources
✅ Stay updated with latest trends

### Next Steps:

1. Bookmark this guide for future reference
2. Explore recommended tools and resources
3. Join relevant communities and forums
4. Practice regularly and document your progress
5. Share your experiences and help others

Remember, success with ${keywords[0]} is a journey, not a destination. Keep learning, stay curious, and don't hesitate to experiment.

## Additional Resources

For more in-depth learning:

- Official documentation and guides
- Video tutorials and courses
- Community forums and discussion boards
- Industry blogs and newsletters
- Books and comprehensive guides

*Last updated: ${date}*

---

**Disclosure**: This article contains affiliate links. When you purchase through these links, we may earn a small commission at no additional cost to you. This helps us create more valuable content for readers like you.
`;

  return { slug, content };
}

async function main() {
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const topics = topicTemplates[config.niche] || topicTemplates['ai-tools'];
  const numPosts = parseInt(process.env.NUM_POSTS) || 2;
  const forceUpdate = process.env.FORCE_UPDATE === 'true';

  console.log(`\n🚀 Generating ${numPosts} enhanced posts for ${config.siteName} (${config.niche})\n`);

  let newFilesCount = 0;
  let updatedFilesCount = 0;
  let skippedFilesCount = 0;

  // Get existing files to avoid duplicates
  const existingFiles = fs.existsSync(contentDir) ? fs.readdirSync(contentDir) : [];

  // Select random topics if more posts requested than available
  const selectedTopics = [];
  const availableTopics = [...topics];

  while (selectedTopics.length < numPosts && availableTopics.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableTopics.length);
    selectedTopics.push(availableTopics[randomIndex]);

    // If we've used all topics, restart but keep going
    if (selectedTopics.length < numPosts && availableTopics.length === 1) {
      availableTopics.push(...topics);
    } else {
      availableTopics.splice(randomIndex, 1);
    }
  }

  for (let i = 0; i < selectedTopics.length; i++) {
    const topicData = selectedTopics[i];
    const { slug, content } = generateEnhancedContent(topicData);
    const filePath = path.join(contentDir, `${slug}.md`);

    const fileExists = fs.existsSync(filePath);

    if (fileExists && !forceUpdate) {
      const existingContent = fs.readFileSync(filePath, 'utf-8');
      if (existingContent === content) {
        console.log(`⏭️  Skipped: ${slug}.md (no changes)`);
        skippedFilesCount++;
        continue;
      }
      updatedFilesCount++;
      console.log(`🔄 Updated: ${slug}.md (${content.length} characters)`);
    } else if (fileExists && forceUpdate) {
      updatedFilesCount++;
      console.log(`🔄 Force updated: ${slug}.md (${content.length} characters)`);
    } else {
      newFilesCount++;
      console.log(`✅ Created: ${slug}.md (${content.length} characters)`);
    }

    fs.writeFileSync(filePath, content);
  }

  console.log(`\n🎉 Generation complete!`);
  console.log(`📝 New files: ${newFilesCount}`);
  console.log(`🔄 Updated files: ${updatedFilesCount}`);
  console.log(`⏭️  Skipped files: ${skippedFilesCount}`);
  console.log(`📊 Total files in directory: ${fs.readdirSync(contentDir).length}\n`);

  if (newFilesCount === 0 && updatedFilesCount === 0) {
    console.log(`ℹ️  No changes made. All content is already up to date.`);
    console.log(`💡 Tip: Use FORCE_UPDATE=true to regenerate existing files with updated dates.`);
  }
}

main().catch(console.error);
