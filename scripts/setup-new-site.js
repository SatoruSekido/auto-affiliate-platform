const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

const nicheKeywords = {
  'ai-tools': ['AI tools', 'artificial intelligence', 'productivity', 'automation', 'ChatGPT'],
  'software-comparisons': ['software comparison', 'vs', 'best', 'alternatives', 'reviews'],
  'web-development': ['web development', 'JavaScript', 'React', 'tutorials', 'coding tips'],
  'productivity-tools': ['productivity', 'time management', 'apps', 'tools', 'efficiency'],
  'tech-tutorials': ['how to', 'tutorial', 'guide', 'tech', 'step by step'],
  'custom': [],
};

async function main() {
  console.log('=== New Site Setup Wizard ===\n');

  const siteId = await question('Site ID (e.g., site6): ');
  const siteName = await question('Site Name: ');
  const description = await question('Site Description: ');

  console.log('\nAvailable niches:');
  Object.keys(nicheKeywords).forEach((niche, i) => {
    console.log(`${i + 1}. ${niche}`);
  });

  const nicheChoice = await question('\nSelect niche (1-6): ');
  const niches = Object.keys(nicheKeywords);
  const niche = niches[parseInt(nicheChoice) - 1] || 'ai-tools';

  let keywords = nicheKeywords[niche];
  if (niche === 'custom') {
    const customKeywords = await question('Enter keywords (comma-separated): ');
    keywords = customKeywords.split(',').map((k) => k.trim());
  }

  const sitesDir = path.join(__dirname, '..', 'sites', siteId);
  const configDir = path.join(sitesDir, 'config');
  const contentDir = path.join(sitesDir, 'content');

  // ディレクトリ作成
  fs.mkdirSync(configDir, { recursive: true });
  fs.mkdirSync(contentDir, { recursive: true });

  // 設定ファイル作成
  const config = {
    siteId,
    siteName,
    siteUrl: `https://${siteId}.vercel.app`,
    description,
    niche,
    keywords,
    affiliatePrograms: {
      amazon: {
        enabled: true,
        trackingId: 'YOUR_AMAZON_TRACKING_ID',
      },
      clickbank: {
        enabled: true,
        vendorId: 'YOUR_CLICKBANK_ID',
      },
    },
    contentStrategy: {
      postsPerWeek: 3,
      minWordCount: 1500,
      targetKeywords: 10,
    },
  };

  const configPath = path.join(configDir, 'site-config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  console.log(`\n✓ Site ${siteId} created successfully!`);
  console.log(`\nNext steps:`);
  console.log(`1. Generate content: SITE_ID=${siteId} npm run generate-content`);
  console.log(`2. Test locally: SITE_ID=${siteId} npm run dev`);
  console.log(`3. Deploy: Push to GitHub and set up Vercel`);

  rl.close();
}

main().catch(console.error);
