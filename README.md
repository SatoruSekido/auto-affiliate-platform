# 自動マネタイズ・マルチサイトプラットフォーム

英語圏向けアフィリエイトサイトの自動生成・デプロイ・運用システム

## 🎯 プロジェクト概要

- **形態**: アフィリエイトマーケティング
- **ターゲット**: 英語圏ユーザー（グローバル）
- **サイト数**: 5サイト（拡張可能）
- **目標収益**: 月1万円〜（スケール可能）
- **運用**: 完全自動化

## 📊 展開サイト

| サイト | ニッチ | URL |
|--------|--------|-----|
| AI Tools Hub | AI・自動化ツール | https://ai-tools-hub.vercel.app |
| Tech Comparison Pro | ソフトウェア比較 | https://tech-comparison-pro.vercel.app |
| Dev Tips Daily | Web開発 | https://dev-tips-daily.vercel.app |
| Productivity Geek | 生産性ツール | https://productivity-geek.vercel.app |
| Tech How-To Guide | 技術チュートリアル | https://tech-howto-guide.vercel.app |

## 🚀 クイックスタート

### 1. インストール

```bash
npm install
```

### 2. コンテンツ生成

```bash
# Site 1用のコンテンツ生成
SITE_ID=site1 npm run generate-content
```

### 3. ローカル実行

```bash
SITE_ID=site1 npm run dev
```

### 4. デプロイ

詳細は [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) を参照

## 💰 収益化戦略

### アフィリエイトプログラム

- **Amazon Associates** - 物販アフィリエイト
- **ClickBank** - デジタル商品（高単価）
- **ShareASale** - 多様なマーチャント
- **CJ Affiliate** - 大手ブランド

### 審査不要・即時利用可能

- ClickBank（即時開始）
- Amazon Associates（180日以内に3件販売で承認）

## 🤖 自動化機能

### GitHub Actions

- 週2回（月・木）自動コンテンツ生成
- 自動コミット・プッシュ
- Vercel自動デプロイ

### スケーラビリティ

- サイト追加: `npm run setup-site`
- 1つのコードベースで複数サイト管理
- 環境変数で切り替え

## 📁 プロジェクト構造

```
.
├── app/                    # Next.js App Router
├── components/             # Reactコンポーネント
├── lib/                    # ユーティリティ
├── sites/                  # サイト別設定・コンテンツ
│   ├── site1/
│   │   ├── config/        # サイト設定
│   │   └── content/       # Markdownコンテンツ
│   ├── site2/
│   └── ...
├── scripts/               # 自動化スクリプト
│   ├── generate-content.js  # コンテンツ生成
│   └── setup-new-site.js    # 新サイト作成
└── .github/workflows/     # CI/CD自動化
```

## 🛠 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **ホスティング**: Vercel（無料枠）
- **CI/CD**: GitHub Actions
- **コンテンツ**: Markdown + Gray Matter

## 📈 SEO最適化

- ✅ 動的sitemap.xml生成
- ✅ robots.txt
- ✅ メタタグ最適化（OG、Twitter Card）
- ✅ セマンティックHTML
- ✅ モバイルレスポンシブ

## 🎨 カスタマイズ

### 新しいサイトを追加

```bash
npm run setup-site
```

対話形式でサイト情報を入力し、自動生成。

### コンテンツテンプレート編集

`scripts/generate-content.js`の`topicTemplates`を編集。

### デザインカスタマイズ

- `app/globals.css` - グローバルスタイル
- `tailwind.config.js` - Tailwind設定
- `components/` - コンポーネント

## 📚 ドキュメント

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 完全デプロイ手順
- [package.json](./package.json) - スクリプト一覧

## 🔧 コマンド一覧

```bash
# 開発サーバー起動
SITE_ID=site1 npm run dev

# ビルド
npm run build

# コンテンツ生成
SITE_ID=site1 npm run generate-content

# 新サイト作成
npm run setup-site

# デプロイガイド表示
./scripts/deploy-setup.sh
```

## 💡 収益予測

### 初期（1-3ヶ月）

- 5サイト × 月2,000円 = **月1万円**
- 各サイト10,000PV、成約6件/月

### 中期（6ヶ月）

- 10サイト × 月45,000円 = **月45万円**
- 各サイト50,000PV、成約75件/月

### 成長戦略

- サイト数を増やす（10, 20, 50...）
- コンテンツ質向上
- SEO最適化継続
- 高単価ニッチに参入

## 🚨 重要な注意事項

### アフィリエイト規約遵守

- 各プログラムの利用規約を確認
- 適切なディスクロージャー表示（実装済み）
- リンクのnofollow属性（実装済み）

### コンテンツ品質

- オリジナリティ確保
- ユーザー価値重視
- 定期的な更新

### データプライバシー

- クッキー利用通知（必要に応じて追加）
- プライバシーポリシー（必要に応じて追加）

## 📞 サポート

質問や問題がある場合は、GitHubのIssuesで報告してください。

## 📄 ライセンス

このプロジェクトは個人利用のために作成されています。

---

**⚡️ 今すぐ始める:**

1. `npm install`
2. `SITE_ID=site1 npm run generate-content`
3. `SITE_ID=site1 npm run dev`
4. [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) を読む

**成功への道は自動化から始まります！🚀**
