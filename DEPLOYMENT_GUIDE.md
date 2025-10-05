# 自動マネタイズプログラム - デプロイ&運用マニュアル

## 📋 目次

1. [初期セットアップ](#初期セットアップ)
2. [アフィリエイトアカウント取得](#アフィリエイトアカウント取得)
3. [コンテンツ生成](#コンテンツ生成)
4. [Vercelデプロイ](#vercelデプロイ)
5. [自動化設定](#自動化設定)
6. [新サイト追加方法](#新サイト追加方法)
7. [収益最大化Tips](#収益最大化tips)

---

## 初期セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 初期コンテンツ生成

各サイトに初期コンテンツを生成します：

```bash
# Site 1: AI Tools Hub
SITE_ID=site1 npm run generate-content

# Site 2: Tech Comparison Pro
SITE_ID=site2 npm run generate-content

# Site 3: Dev Tips Daily
SITE_ID=site3 npm run generate-content

# Site 4: Productivity Geek
SITE_ID=site4 npm run generate-content

# Site 5: Tech How-To Guide
SITE_ID=site5 npm run generate-content
```

### 3. ローカルテスト

```bash
# 特定のサイトをローカルで確認
SITE_ID=site1 npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認。

---

## アフィリエイトアカウント取得

### Amazon Associates（優先度：高）

**登録URL:** https://affiliate-program.amazon.com/

**手順:**
1. アカウント作成（米国版推奨）
2. ウェブサイト情報を登録
3. 税務情報を入力
4. **180日以内に3件の販売**が必要（承認条件）
5. トラッキングID（例：`yourname-20`）を取得

**設定:**
- `.env`ファイルに追加：
  ```
  NEXT_PUBLIC_AMAZON_TAG=yourname-20
  ```

### ClickBank（優先度：高、審査なし）

**登録URL:** https://www.clickbank.com/

**手順:**
1. 無料アカウント作成
2. 即座にアフィリエイトID取得可能
3. マーケットプレイスで商品検索
4. 自分のニッチに合う商品を選択

**設定:**
- サイト設定ファイルに追加
- 高額報酬商品が多い（$50-200/件）

### ShareASale（優先度：中）

**登録URL:** https://www.shareasale.com/

**手順:**
1. アフィリエイト登録（審査あり、1-3日）
2. サイトを登録
3. マーチャントに個別申請

### CJ Affiliate（優先度：中）

**登録URL:** https://www.cj.com/

**手順:**
1. パブリッシャー登録
2. 審査（数日）
3. 広告主プログラムに申請

### Google AdSense（優先度：低、後回し）

**登録URL:** https://www.google.com/adsense/

**注意:**
- **最低10-15記事**、一定のトラフィックが必要
- サイト育成後（3-6ヶ月後）に申請推奨
- 審査に1-2週間

---

## コンテンツ生成

### 手動生成

```bash
# 特定のサイトに2記事生成
SITE_ID=site1 NUM_POSTS=2 npm run generate-content
```

### OpenAI API使用（オプション）

より高品質なコンテンツを生成する場合：

1. OpenAI APIキー取得（https://platform.openai.com/）
2. 環境変数設定：
   ```bash
   export OPENAI_API_KEY=sk-...
   ```
3. `scripts/generate-content.js`のTODOセクションを実装

### コンテンツカスタマイズ

`scripts/generate-content.js`の`topicTemplates`を編集して、独自のトピックを追加可能。

---

## Vercelデプロイ

### 前提条件

- GitHub無料アカウント
- Vercel無料アカウント（https://vercel.com/）

### デプロイ手順

#### 1. GitHubリポジトリ作成

```bash
# Gitリポジトリ初期化（既に完了）
git add .
git commit -m "Initial commit: Multi-site monetization platform"

# GitHubリポジトリ作成後
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

#### 2. Vercel連携

**Site 1 (AI Tools Hub):**

1. Vercel ダッシュボード → "New Project"
2. GitHubリポジトリを選択
3. **Environment Variables** に追加：
   ```
   SITE_ID=site1
   NEXT_PUBLIC_AMAZON_TAG=your-tag-20
   ```
4. **Project Name**: `ai-tools-hub`
5. "Deploy" をクリック

**Site 2-5 も同様に:**

各サイトごとに別のVercelプロジェクトを作成：

| Site ID | Project Name | Environment Variable |
|---------|--------------|---------------------|
| site2 | tech-comparison-pro | SITE_ID=site2 |
| site3 | dev-tips-daily | SITE_ID=site3 |
| site4 | productivity-geek | SITE_ID=site4 |
| site5 | tech-howto-guide | SITE_ID=site5 |

#### 3. カスタムドメイン設定（オプション）

無料の`.vercel.app`ドメインで十分ですが、独自ドメインも設定可能：

1. Vercel Project Settings → Domains
2. ドメイン追加
3. DNS設定

---

## 自動化設定

### GitHub Actions自動コンテンツ生成

既に設定済み（`.github/workflows/auto-content-generation.yml`）

**動作:**
- 毎週月曜日と木曜日の午前9時（UTC）に自動実行
- 各サイトに2記事ずつ自動生成
- 自動コミット & プッシュ
- Vercelが自動デプロイ

**手動実行:**
1. GitHubリポジトリ → "Actions"タブ
2. "Auto Content Generation" を選択
3. "Run workflow" をクリック

### Vercel自動デプロイ

Vercelはデフォルトで以下を自動デプロイ：
- `main`ブランチへのプッシュ
- プルリクエスト（プレビュー環境）

**設定確認:**
- Vercel Project Settings → Git
- "Production Branch"が`main`になっているか確認

---

## 新サイト追加方法

### ステップ1: 新サイト作成

```bash
npm run setup-site
```

対話形式で以下を入力：
- Site ID（例：site6）
- Site Name（例：Crypto News Hub）
- Description
- ニッチ選択

### ステップ2: コンテンツ生成

```bash
SITE_ID=site6 NUM_POSTS=5 npm run generate-content
```

### ステップ3: ローカルテスト

```bash
SITE_ID=site6 npm run dev
```

### ステップ4: Git コミット

```bash
git add sites/site6
git commit -m "Add site6: Crypto News Hub"
git push
```

### ステップ5: Vercelプロジェクト作成

1. Vercel → New Project
2. 同じGitHubリポジトリを選択
3. Environment Variables:
   ```
   SITE_ID=site6
   NEXT_PUBLIC_AMAZON_TAG=your-tag-20
   ```
4. Deploy

### ステップ6: GitHub Actions更新

`.github/workflows/auto-content-generation.yml`の`matrix.site`に追加：

```yaml
strategy:
  matrix:
    site: [site1, site2, site3, site4, site5, site6]  # site6を追加
```

---

## 収益最大化Tips

### 1. SEO最適化

✅ **既に実装済み:**
- 動的sitemap生成
- robots.txt
- メタタグ最適化
- セマンティックHTML

**追加推奨:**
- Google Search Console登録
- Bing Webmaster Tools登録
- Schema.org構造化データ追加

### 2. アフィリエイトリンク最適化

**高コンバージョンの配置:**
- 記事上部（導入部分の直後）
- 記事中央（比較表の近く）
- 記事下部（結論の前）

**A/Bテスト:**
- CTAボタンの文言変更
- リンク色の調整
- 商品画像の追加

### 3. コンテンツ戦略

**高収益キーワード:**
- "Best [product] for [use case]"
- "[Product A] vs [Product B]"
- "How to [achieve goal] with [tool]"
- "[Product] review"
- "Top 10 [category]"

**コンテンツ長:**
- 最低1,500語
- 理想は2,000-3,000語
- 包括的なガイドは5,000語以上

### 4. トラフィック獲得

**無料チャネル:**
- Reddit関連サブレディットに投稿
- Quora質問回答
- Twitter/X でシェア
- Medium記事からリンク
- Dev.to、Hashnode等に再投稿

**有料チャネル（後期）:**
- Google Ads（ROI確認後）
- Facebook Ads
- Reddit Ads

### 5. 収益予測

**保守的な見積もり:**

| 指標 | 値 |
|------|-----|
| サイト数 | 5 |
| 月間PV/サイト | 10,000 |
| CTR（クリック率） | 2% |
| 成約率 | 3% |
| 平均報酬/件 | ¥400 |
| **月間収益/サイト** | **¥2,400** |
| **総月間収益** | **¥12,000** |

**6ヶ月後の目標:**

| 指標 | 値 |
|------|-----|
| サイト数 | 10 |
| 月間PV/サイト | 50,000 |
| CTR | 3% |
| 成約率 | 5% |
| 平均報酬/件 | ¥600 |
| **月間収益/サイト** | **¥45,000** |
| **総月間収益** | **¥450,000** |

---

## トラブルシューティング

### ビルドエラー

```bash
# 依存関係の再インストール
rm -rf node_modules package-lock.json
npm install
```

### サイトが表示されない

1. 環境変数`SITE_ID`が正しいか確認
2. `sites/{SITE_ID}/content/`にコンテンツがあるか確認
3. Vercelログを確認

### GitHub Actionsが動かない

1. リポジトリ Settings → Actions → "Allow all actions"
2. ワークフローファイルの構文確認
3. Actions タブでエラーログ確認

---

## 次のステップ

### 即座に実行すべきこと（今日）:

1. ✅ Amazon Associates登録
2. ✅ ClickBank登録
3. ✅ GitHubリポジトリ作成
4. ✅ 5サイト全てをVercelにデプロイ

### 1週間以内:

1. Google Search Console登録
2. 各サイト10記事まで増やす
3. Reddit、Twitterで初期トラフィック獲得
4. アフィリエイトリンクのクリック率モニタリング

### 1ヶ月以内:

1. ShareASale、CJ Affiliate登録
2. 各サイト30記事到達
3. 初回収益確認
4. Google AdSense申請準備

### 3ヶ月以内:

1. 各サイト50-100記事
2. 月間10万PV達成
3. サイト数を10に拡大
4. 自動化スクリプトの改善

---

## 連絡先・サポート

- GitHub Issues: プロジェクトの問題報告
- 定期レビュー: 月次で収益・トラフィックレビュー

**成功を祈ります！🚀**
