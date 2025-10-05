# 🚀 クイックスタートガイド

すぐに始めるための最短手順

## ステップ1: 依存関係インストール（1分）

```bash
npm install
```

## ステップ2: 初期コンテンツ生成（各30秒）

```bash
# 全サイトに初期コンテンツを一括生成
SITE_ID=site1 npm run generate-content
SITE_ID=site2 npm run generate-content
SITE_ID=site3 npm run generate-content
SITE_ID=site4 npm run generate-content
SITE_ID=site5 npm run generate-content
```

## ステップ3: ローカル確認（1分）

```bash
# Site 1をローカルで確認
SITE_ID=site1 npm run dev
```

ブラウザで http://localhost:3000 を開く

## ステップ4: GitHubにプッシュ（2分）

```bash
# GitHubで新規リポジトリ作成後
git add .
git commit -m "Initial commit: Auto-monetization platform"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## ステップ5: アフィリエイト登録（10分）

### 最優先：Amazon Associates

1. https://affiliate-program.amazon.com/ にアクセス
2. アカウント作成
3. トラッキングID（例：`yourname-20`）をメモ

### 即時利用可能：ClickBank

1. https://www.clickbank.com/ にアクセス
2. 無料アカウント作成
3. アフィリエイトIDをメモ

## ステップ6: Vercelデプロイ（各サイト3分）

### Site 1をデプロイ

1. https://vercel.com/ にアクセス
2. "New Project" → GitHubリポジトリ選択
3. **Environment Variables** 設定:
   ```
   SITE_ID=site1
   NEXT_PUBLIC_AMAZON_TAG=yourname-20
   ```
4. "Deploy" クリック

### Site 2-5も同じ手順で

各サイトごとに`SITE_ID`を変更：
- Site 2: `SITE_ID=site2`
- Site 3: `SITE_ID=site3`
- Site 4: `SITE_ID=site4`
- Site 5: `SITE_ID=site5`

## ✅ 完了！

5つのサイトがライブになりました。

### 次にやること

1. **Google Search Console**に各サイト登録
2. **週2回自動でコンテンツ生成**されるのを待つ（GitHub Actions）
3. **トラフィック分析**を開始（Vercel Analytics）

### 詳細な運用マニュアル

[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) を参照

---

**所要時間合計: 約30分**

**次回からの運用: ほぼ自動（週1回チェックのみ）**
