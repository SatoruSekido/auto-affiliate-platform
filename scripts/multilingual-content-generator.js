const fs = require('fs');
const path = require('path');

/**
 * 多言語対応コンテンツ生成スクリプト
 *
 * 世界中からアクセスを集めるための多言語コンテンツを生成
 * 英語、日本語、スペイン語、フランス語、ドイツ語、中国語に対応
 */

const siteId = process.env.SITE_ID || 'site1';
const language = process.env.LANG || 'en';
const configPath = path.join(__dirname, '..', 'sites', siteId, 'config', 'site-config.json');
const contentDir = path.join(__dirname, '..', 'sites', siteId, 'content', language);

if (!fs.existsSync(configPath)) {
  console.error(`Site config not found: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// 多言語トピックテンプレート
const topicTemplates = {
  en: {
    'ai-tools': [
      {
        title: '10 Best AI Tools for Content Creation in 2025',
        keywords: ['AI tools', 'content creation', 'ChatGPT', 'artificial intelligence', 'productivity'],
        products: ['AI writing software', 'content creation tools', 'AI assistant'],
        searchTerms: ['best AI tools 2025', 'AI content creator', 'ChatGPT alternatives']
      },
      {
        title: 'How to Use ChatGPT to Boost Your Business Productivity',
        keywords: ['ChatGPT', 'business automation', 'AI productivity', 'workflow automation'],
        products: ['ChatGPT Plus subscription', 'AI productivity books', 'automation tools'],
        searchTerms: ['ChatGPT business tips', 'AI automation', 'productivity hacks']
      },
    ],
    'software-comparisons': [
      {
        title: 'Notion vs Obsidian 2025: Complete Comparison Guide',
        keywords: ['Notion', 'Obsidian', 'note-taking', 'productivity apps', 'comparison'],
        products: ['note-taking apps', 'productivity tools', 'tablet for notes'],
        searchTerms: ['Notion vs Obsidian', 'best note app', 'digital note-taking']
      },
    ],
  },
  ja: {
    'ai-tools': [
      {
        title: '2025年版：コンテンツ制作に最適なAIツール10選',
        keywords: ['AIツール', 'コンテンツ作成', 'ChatGPT', '人工知能', '生産性'],
        products: ['AI文章作成ソフト', 'コンテンツ作成ツール', 'AIアシスタント'],
        searchTerms: ['AIツール おすすめ 2025', 'AI コンテンツ作成', 'ChatGPT 代替']
      },
      {
        title: 'ChatGPTでビジネスの生産性を劇的に向上させる方法',
        keywords: ['ChatGPT', 'ビジネス自動化', 'AI生産性', 'ワークフロー'],
        products: ['ChatGPT Plusサブスクリプション', 'AI生産性本', '自動化ツール'],
        searchTerms: ['ChatGPT ビジネス活用', 'AI 自動化', '生産性向上']
      },
    ],
  },
  es: {
    'ai-tools': [
      {
        title: 'Las 10 Mejores Herramientas de IA para Creación de Contenido 2025',
        keywords: ['herramientas IA', 'creación contenido', 'ChatGPT', 'inteligencia artificial'],
        products: ['software escritura IA', 'herramientas creación', 'asistente IA'],
        searchTerms: ['mejores herramientas IA 2025', 'IA creador contenido', 'alternativas ChatGPT']
      },
    ],
  },
  fr: {
    'ai-tools': [
      {
        title: '10 Meilleurs Outils IA pour la Création de Contenu 2025',
        keywords: ['outils IA', 'création contenu', 'ChatGPT', 'intelligence artificielle'],
        products: ['logiciel écriture IA', 'outils création', 'assistant IA'],
        searchTerms: ['meilleurs outils IA 2025', 'IA créateur contenu', 'alternatives ChatGPT']
      },
    ],
  },
  de: {
    'ai-tools': [
      {
        title: '10 Beste KI-Tools für Content-Erstellung 2025',
        keywords: ['KI-Tools', 'Content-Erstellung', 'ChatGPT', 'künstliche Intelligenz'],
        products: ['KI-Schreibsoftware', 'Content-Tools', 'KI-Assistent'],
        searchTerms: ['beste KI-Tools 2025', 'KI Content Creator', 'ChatGPT Alternativen']
      },
    ],
  },
  zh: {
    'ai-tools': [
      {
        title: '2025年最佳AI内容创作工具10选',
        keywords: ['AI工具', '内容创作', 'ChatGPT', '人工智能', '生产力'],
        products: ['AI写作软件', '内容创作工具', 'AI助手'],
        searchTerms: ['最佳AI工具2025', 'AI内容创作', 'ChatGPT替代品']
      },
    ],
  },
};

const languageNames = {
  en: 'English',
  ja: '日本語',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  zh: '中文'
};

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function generateProductSection(products, keywords, lang) {
  const amazonTag = process.env.NEXT_PUBLIC_AMAZON_TAG || 'temp-tag-20';

  const translations = {
    en: {
      heading: '## Recommended Tools and Resources',
      intro: 'To get the most out of',
      essential: 'Essential for',
      disclosure: '*As an Amazon Associate, we earn from qualifying purchases.*'
    },
    ja: {
      heading: '## おすすめのツールとリソース',
      intro: 'を最大限に活用するために、',
      essential: 'に必須',
      disclosure: '*Amazonアソシエイトとして、適格販売により収入を得ています。*'
    },
    es: {
      heading: '## Herramientas y Recursos Recomendados',
      intro: 'Para aprovechar al máximo',
      essential: 'Esencial para',
      disclosure: '*Como Asociado de Amazon, ganamos con compras calificadas.*'
    },
    fr: {
      heading: '## Outils et Ressources Recommandés',
      intro: 'Pour tirer le meilleur parti de',
      essential: 'Essentiel pour',
      disclosure: '*En tant qu\'Associé Amazon, nous gagnons sur les achats qualifiés.*'
    },
    de: {
      heading: '## Empfohlene Tools und Ressourcen',
      intro: 'Um das Beste aus',
      essential: 'Unverzichtbar für',
      disclosure: '*Als Amazon-Partner verdienen wir an qualifizierten Verkäufen.*'
    },
    zh: {
      heading: '## 推荐工具和资源',
      intro: '要充分利用',
      essential: '对于...至关重要',
      disclosure: '*作为亚马逊联盟会员，我们从合格购买中获得收入。*'
    }
  };

  const t = translations[lang] || translations.en;
  const productLinks = products.slice(0, 3).map(product =>
    `- **[${product}](https://www.amazon.com/s?k=${encodeURIComponent(product)}&tag=${amazonTag})** - ${t.essential} ${keywords[0]}`
  ).join('\n');

  return `${t.heading}

${t.intro} ${keywords[0]}:

${productLinks}

${t.disclosure}
`;
}

function generateEnhancedContent(topicData, lang) {
  const { title, keywords, products, searchTerms } = topicData;
  const slug = generateSlug(title);
  const date = new Date().toISOString().split('T')[0];

  const translations = {
    en: {
      intro: 'Introduction',
      introText: 'Welcome to our comprehensive guide on',
      benefits: 'Key Benefits',
      benefit1: 'Increased Efficiency: Save valuable time',
      benefit2: 'Better Results: Higher quality outcomes',
      benefit3: 'Competitive Advantage: Stay ahead',
      benefit4: 'Scalability: Grow with your needs',
      benefit5: 'Cost-Effective: Maximize ROI',
      gettingStarted: 'Getting Started: Step-by-Step Guide',
      step1: 'Step 1: Understanding the Basics',
      step2: 'Step 2: Choosing the Right Approach',
      step3: 'Step 3: Implementation',
      bestPractices: 'Best Practices and Pro Tips',
      mistakes: 'Common Mistakes to Avoid',
      comparison: 'Popular Options Comparison',
      faq: 'Frequently Asked Questions',
      conclusion: 'Conclusion',
      nextSteps: 'Next Steps',
      disclosure: 'Disclosure: This article contains affiliate links.',
      lastUpdated: 'Last updated',
    },
    ja: {
      intro: 'はじめに',
      introText: 'このガイドでは',
      benefits: '主なメリット',
      benefit1: '効率アップ：貴重な時間を節約',
      benefit2: '高品質な結果：より良い成果を実現',
      benefit3: '競争優位性：最先端をキープ',
      benefit4: '拡張性：ニーズに合わせて成長',
      benefit5: 'コスト効果：ROIを最大化',
      gettingStarted: '始め方：ステップバイステップガイド',
      step1: 'ステップ1：基礎を理解する',
      step2: 'ステップ2：適切なアプローチを選ぶ',
      step3: 'ステップ3：実装',
      bestPractices: 'ベストプラクティスとプロのヒント',
      mistakes: 'よくある間違いを避ける',
      comparison: '人気オプションの比較',
      faq: 'よくある質問',
      conclusion: 'まとめ',
      nextSteps: '次のステップ',
      disclosure: '開示：この記事にはアフィリエイトリンクが含まれています。',
      lastUpdated: '最終更新',
    },
    es: {
      intro: 'Introducción',
      introText: 'Bienvenido a nuestra guía completa sobre',
      benefits: 'Beneficios Clave',
      benefit1: 'Mayor Eficiencia: Ahorra tiempo valioso',
      benefit2: 'Mejores Resultados: Resultados de mayor calidad',
      benefit3: 'Ventaja Competitiva: Mantente adelante',
      benefit4: 'Escalabilidad: Crece con tus necesidades',
      benefit5: 'Rentable: Maximiza el ROI',
      gettingStarted: 'Comenzando: Guía Paso a Paso',
      step1: 'Paso 1: Entendiendo lo Básico',
      step2: 'Paso 2: Eligiendo el Enfoque Correcto',
      step3: 'Paso 3: Implementación',
      bestPractices: 'Mejores Prácticas y Consejos Pro',
      mistakes: 'Errores Comunes a Evitar',
      comparison: 'Comparación de Opciones Populares',
      faq: 'Preguntas Frecuentes',
      conclusion: 'Conclusión',
      nextSteps: 'Próximos Pasos',
      disclosure: 'Divulgación: Este artículo contiene enlaces de afiliados.',
      lastUpdated: 'Última actualización',
    },
  };

  const t = translations[lang] || translations.en;

  const content = `---
title: "${title}"
date: "${date}"
excerpt: "Comprehensive guide to ${title}. Expert insights, practical tips, and recommended tools for success."
keywords: ${JSON.stringify(keywords)}
searchTerms: ${JSON.stringify(searchTerms)}
language: "${lang}"
---

## ${t.intro}

${t.introText} **${title}**. ${lang === 'ja' ? 'について、包括的に解説します。' : 'This comprehensive guide covers everything you need to know.'}

### ${t.benefits}

1. ✅ **${t.benefit1}**
2. ✅ **${t.benefit2}**
3. ✅ **${t.benefit3}**
4. ✅ **${t.benefit4}**
5. ✅ **${t.benefit5}**

## ${t.gettingStarted}

### ${t.step1}

${keywords[0]} ${lang === 'ja' ? 'を始める前に、基本を理解することが重要です。' : 'is essential for modern productivity and success.'}

**${lang === 'ja' ? '重要なポイント' : 'Key Points'}:**
- ${lang === 'ja' ? '基本概念の理解' : 'Understanding core concepts'}
- ${lang === 'ja' ? '前提知識の確認' : 'Prerequisites and requirements'}
- ${lang === 'ja' ? '用語の理解' : 'Common terminology explained'}

### ${t.step2}

${lang === 'ja' ? '適切なアプローチを選択することで、成功率が大幅に向上します。' : 'Choosing the right approach significantly increases your success rate.'}

**${lang === 'ja' ? '考慮すべき要素' : 'Factors to Consider'}:**

1. **${lang === 'ja' ? 'スキルレベル' : 'Your Skill Level'}**: ${lang === 'ja' ? '初心者、中級者、上級者' : 'Beginner, intermediate, or advanced'}
2. **${lang === 'ja' ? '予算' : 'Budget'}**: ${lang === 'ja' ? '無料 vs 有料オプション' : 'Free vs paid options'}
3. **${lang === 'ja' ? '時間投資' : 'Time Investment'}**: ${lang === 'ja' ? '短期的な成果 vs 長期的な解決策' : 'Quick wins vs long-term solutions'}
4. **${lang === 'ja' ? '具体的な目標' : 'Specific Goals'}**: ${lang === 'ja' ? '達成したいこと' : 'What you want to achieve'}

### ${t.step3}

${lang === 'ja' ? '実装のステップ：' : 'Implementation steps:'}

**${lang === 'ja' ? '初心者向け' : 'For Beginners'}:**
- ${lang === 'ja' ? '基礎から始めて、焦らない' : 'Start with basics, don\'t rush'}
- ${lang === 'ja' ? 'チュートリアルに従う' : 'Follow tutorials carefully'}
- ${lang === 'ja' ? 'コミュニティに参加' : 'Join communities for support'}
- ${lang === 'ja' ? '定期的に練習' : 'Practice regularly'}

**${lang === 'ja' ? '上級者向け' : 'For Advanced Users'}:**
- ${lang === 'ja' ? '高度な機能を探索' : 'Explore advanced features'}
- ${lang === 'ja' ? 'パフォーマンスを最適化' : 'Optimize for performance'}
- ${lang === 'ja' ? '知識を共有' : 'Share knowledge with others'}
- ${lang === 'ja' ? '最新情報を追跡' : 'Stay updated with trends'}

## ${t.bestPractices}

### ${lang === 'ja' ? '専門家の推奨事項' : 'Expert Recommendations'}

1. 📋 **${lang === 'ja' ? '計画を立てる' : 'Plan Before You Act'}**: ${lang === 'ja' ? '戦略を練る時間を取る' : 'Take time to strategize'}
2. 🎯 **${lang === 'ja' ? '小さく始める' : 'Start Small'}**: ${lang === 'ja' ? '段階的に拡大' : 'Scale gradually'}
3. 📝 **${lang === 'ja' ? 'プロセスを文書化' : 'Document Your Process'}**: ${lang === 'ja' ? '将来の参考のためにメモを取る' : 'Keep notes for reference'}
4. 🔄 **${lang === 'ja' ? 'フィードバックを求める' : 'Seek Feedback'}**: ${lang === 'ja' ? '他者の経験から学ぶ' : 'Learn from others'}
5. 🚀 **${lang === 'ja' ? '継続的に改善' : 'Iterate and Improve'}**: ${lang === 'ja' ? '改善を続ける' : 'Continuous improvement'}

### ${t.mistakes}

⚠️ **${lang === 'ja' ? '避けるべき間違い' : 'Warning Signs'}:**

- ${lang === 'ja' ? '十分な調査をせずに急ぐ' : 'Rushing without proper research'}
- ${lang === 'ja' ? 'ユーザーレビューを無視' : 'Ignoring user reviews'}
- ${lang === 'ja' ? '長期的なコストを考慮しない' : 'Not considering long-term costs'}
- ${lang === 'ja' ? '学習曲線を見落とす' : 'Overlooking learning curve'}
- ${lang === 'ja' ? 'コミットする前にテストしない' : 'Failing to test before committing'}

## ${t.comparison}

${lang === 'ja' ? '人気のある' : 'Popular'} ${keywords[0]} ${lang === 'ja' ? 'オプションの比較：' : 'options comparison:'}

| ${lang === 'ja' ? '機能' : 'Feature'} | ${lang === 'ja' ? 'オプションA' : 'Option A'} | ${lang === 'ja' ? 'オプションB' : 'Option B'} | ${lang === 'ja' ? 'オプションC' : 'Option C'} |
|---------|----------|----------|----------|
| **${lang === 'ja' ? '使いやすさ' : 'Ease of Use'}** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **${lang === 'ja' ? '価格' : 'Price'}** | $$ | $$$ | $ |
| **${lang === 'ja' ? '機能' : 'Features'}** | ${lang === 'ja' ? '包括的' : 'Comprehensive'} | ${lang === 'ja' ? '高度' : 'Advanced'} | ${lang === 'ja' ? '基本' : 'Basic'} |
| **${lang === 'ja' ? 'サポート' : 'Support'}** | ${lang === 'ja' ? '優秀' : 'Excellent'} | ${lang === 'ja' ? '良い' : 'Good'} | ${lang === 'ja' ? '限定的' : 'Limited'} |

${generateProductSection(products, keywords, lang)}

## ${lang === 'ja' ? '実世界での応用' : 'Real-World Applications'}

### ${lang === 'ja' ? 'ケーススタディ' : 'Case Studies'}

**${lang === 'ja' ? 'ケーススタディ1：中小企業の成功' : 'Case Study 1: Small Business Success'}**
${lang === 'ja' ? '中小企業が実装し、3ヶ月で生産性が300%向上しました。' : 'A small business implemented this and saw 300% productivity increase in 3 months.'}

**${lang === 'ja' ? 'ケーススタディ2：フリーランサーの効率化' : 'Case Study 2: Freelancer Efficiency'}**
${lang === 'ja' ? 'フリーランサーがプロジェクト時間を50%削減しました。' : 'A freelancer reduced project time by 50% using these techniques.'}

**${lang === 'ja' ? 'ケーススタディ3：エンタープライズ規模' : 'Case Study 3: Enterprise Scale'}**
${lang === 'ja' ? '大企業が統合に成功し、業務をスケールしました。' : 'Large organization successfully scaled operations with integration.'}

## ${t.faq}

**Q: ${lang === 'ja' ? '初心者に適していますか？' : 'Is this suitable for beginners?'}**
A: ${lang === 'ja' ? 'はい！適切なガイダンスと忍耐があれば、初心者でも成功できます。' : 'Absolutely! With proper guidance, beginners can succeed.'}

**Q: ${lang === 'ja' ? '学習にどれくらいかかりますか？' : 'How long does it take to learn?'}**
A: ${lang === 'ja' ? '基本的な習熟：1-2週間。上級スキル：定期的な練習で2-3ヶ月。' : 'Basic proficiency: 1-2 weeks. Advanced skills: 2-3 months with practice.'}

**Q: ${lang === 'ja' ? 'コストはどれくらいですか？' : 'What\'s the cost involved?'}**
A: ${lang === 'ja' ? '無料からプレミアムまで様々です。無料オプションから始めることをお勧めします。' : 'Options range from free to premium. Start with free and upgrade as needed.'}

**Q: ${lang === 'ja' ? '技術的なスキルは必要ですか？' : 'Do I need technical skills?'}**
A: ${lang === 'ja' ? '基本的なコンピュータリテラシーがあれば十分です。' : 'Basic computer literacy is sufficient for most applications.'}

**Q: ${lang === 'ja' ? '無料の代替品はありますか？' : 'Are there free alternatives?'}**
A: ${lang === 'ja' ? 'はい！多くの優れた無料オプションがあります。' : 'Yes! Many excellent free options are available.'}

## ${t.conclusion}

${title} ${lang === 'ja' ? 'は、学習と実装に時間を投資する価値があります。このガイドに従えば、成功するための知識とリソースが得られます。' : 'offers tremendous value for those willing to invest time in learning and implementation.'}

### ${lang === 'ja' ? '重要なポイント' : 'Key Takeaways'}:

✅ ${lang === 'ja' ? '深く掘り下げる前に基礎を理解する' : 'Understand fundamentals before diving deep'}
✅ ${lang === 'ja' ? 'スキルレベルと目標に合ったソリューションを選ぶ' : 'Choose solutions matching your skill level'}
✅ ${lang === 'ja' ? '小さく始めて徐々に拡大する' : 'Start small and scale gradually'}
✅ ${lang === 'ja' ? '間違いから学び、反復する' : 'Learn from mistakes and iterate'}
✅ ${lang === 'ja' ? '質の高いツールとリソースに投資する' : 'Invest in quality tools and resources'}

### ${t.nextSteps}:

1. ${lang === 'ja' ? 'このガイドをブックマークする' : 'Bookmark this guide for reference'}
2. ${lang === 'ja' ? '推奨ツールとリソースを探索する' : 'Explore recommended tools'}
3. ${lang === 'ja' ? '関連コミュニティに参加する' : 'Join relevant communities'}
4. ${lang === 'ja' ? '定期的に練習し、進捗を記録する' : 'Practice regularly and track progress'}
5. ${lang === 'ja' ? '経験を共有し、他の人を助ける' : 'Share experiences and help others'}

${lang === 'ja' ? '成功は旅であり、目的地ではありません。学び続け、好奇心を持ち続けてください。' : 'Success is a journey, not a destination. Keep learning and stay curious.'}

*${t.lastUpdated}: ${date}*

---

**${t.disclosure}** ${lang === 'ja' ? 'これらのリンクを通じて購入すると、追加費用なしで少額の手数料を得られます。' : 'We may earn a commission at no additional cost to you.'}
`;

  return { slug, content };
}

async function main() {
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const langTopics = topicTemplates[language] || topicTemplates.en;
  const topics = langTopics[config.niche] || langTopics['ai-tools'] || [];
  const numPosts = parseInt(process.env.NUM_POSTS) || topics.length;

  console.log(`\n🌍 Generating ${numPosts} posts in ${languageNames[language]} for ${config.siteName}\n`);

  for (let i = 0; i < Math.min(numPosts, topics.length); i++) {
    const topicData = topics[i];
    const { slug, content } = generateEnhancedContent(topicData, language);
    const filePath = path.join(contentDir, `${slug}.md`);

    fs.writeFileSync(filePath, content);
    console.log(`✅ [${language.toUpperCase()}] Generated: ${slug}.md (${content.length} characters)`);
  }

  console.log(`\n🎉 Successfully generated ${Math.min(numPosts, topics.length)} posts in ${languageNames[language]}!\n`);
}

main().catch(console.error);
