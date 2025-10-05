# 📋 次にやるべきこと（優先順位順）

## 🚨 今すぐやること（今日中）

### 1. 依存関係のインストール ✅

```bash
npm install
```

### 2. 全サイトのコンテンツ生成 ✅

```bash
SITE_ID=site1 npm run generate-content
SITE_ID=site2 npm run generate-content
SITE_ID=site3 npm run generate-content
SITE_ID=site4 npm run generate-content
SITE_ID=site5 npm run generate-content
```

### 3. ローカルテスト

```bash
SITE_ID=site1 npm run dev
```

→ http://localhost:3000 で確認

### 4. GitHubリポジトリ作成

1. https://github.com/new でリポジトリ作成
2. リポジトリ名: `auto-monetize-platform`（任意）
3. Private/Public: どちらでも可

```bash
git add .
git commit -m "Initial commit: Auto-monetization platform"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## 📝 明日やること

### 5. アフィリエイト登録（所要時間: 各10分）

#### Amazon Associates（最優先）
- URL: https://affiliate-program.amazon.com/
- 審査: 180日以内に3件販売で承認
- **トラッキングIDをメモ**

#### ClickBank（審査なし・即利用可）
- URL: https://www.clickbank.com/
- 即座にアフィリエイトID取得
- 高単価商品多数

#### ShareASale
- URL: https://www.shareasale.com/
- 審査: 1-3日
- 多様なマーチャント

### 6. Vercel デプロイ（各サイト5分）

#### Site 1: AI Tools Hub

1. https://vercel.com/ → "New Project"
2. GitHubリポジトリ選択
3. **Environment Variables**:
   ```
   SITE_ID=site1
   NEXT_PUBLIC_AMAZON_TAG=your-amazon-tag
   ```
4. Project Name: `ai-tools-hub`
5. Deploy

#### Site 2-5も同様に

| Site ID | Project Name | SITE_ID |
|---------|--------------|---------|
| site2 | tech-comparison-pro | site2 |
| site3 | dev-tips-daily | site3 |
| site4 | productivity-geek | site4 |
| site5 | tech-howto-guide | site5 |

**重要**: 各プロジェクトの環境変数に以下を設定:
- `SITE_ID=siteX`
- `NEXT_PUBLIC_AMAZON_TAG=your-tag`（Amazonアカウント取得後）

---

## 🎯 1週間以内にやること

### 7. 各サイトのコンテンツを増やす

```bash
# 各サイトに追加で5-10記事生成
SITE_ID=site1 NUM_POSTS=10 npm run generate-content
SITE_ID=site2 NUM_POSTS=10 npm run generate-content
# ... 以下同様
```

目標: **各サイト10-15記事**

### 8. Google Search Console 登録

1. https://search.google.com/search-console
2. 5つのサイト全て登録
3. サイトマップ送信: `https://your-site.vercel.app/sitemap.xml`

### 9. Bing Webmaster Tools 登録

1. https://www.bing.com/webmasters
2. Google Search Consoleからインポート可能

### 10. 初期トラフィック獲得

#### Reddit投稿
- r/SideProject
- r/EntrepreneurRideAlong
- 各ニッチの関連サブレディット

#### Twitter/X
- アカウント作成
- ハッシュタグ活用: #AI #productivity #webdev

#### Quora
- 関連する質問に回答
- 記事リンクを適切に挿入

---

## 📊 1ヶ月以内にやること

### 11. コンテンツ拡充

目標: **各サイト30-50記事**

週2回の自動生成 + 手動追加

### 12. 収益モニタリング

- Amazon Associates ダッシュボード確認
- クリック率（CTR）分析
- 成約率確認

### 13. Google AdSense 申請準備

**条件:**
- 各サイト最低30記事
- 月間5,000PV以上
- 3ヶ月以上の運用実績

### 14. A/Bテスト開始

- アフィリエイトリンクの配置変更
- CTAボタンのテキスト変更
- 記事構成の最適化

---

## 🚀 3ヶ月以内にやること

### 15. サイト数拡大

```bash
npm run setup-site
```

新サイト追加（目標: 10サイト）

### 16. コンテンツ品質向上

- OpenAI API導入（オプション）
- 手動で高品質記事追加
- 既存記事のリライト

### 17. トラフィック拡大

- バックリンク構築
- ゲスト投稿
- SNSマーケティング強化

### 18. 収益最適化

- 高コンバージョン商品への変更
- 複数アフィリエイトプログラム比較
- 成果報酬の高いニッチへ参入

---

## 💰 収益目標

### 1ヶ月目
- **目標**: 初収益達成
- 予測: 1,000-3,000円

### 3ヶ月目
- **目標**: 月1万円達成
- 5サイト × 2,000円

### 6ヶ月目
- **目標**: 月5-10万円
- 10サイト × 5,000-10,000円

### 12ヶ月目
- **目標**: 月30-50万円
- 20サイト × 15,000-25,000円

---

## ⚠️ 重要な注意事項

### やってはいけないこと

❌ スパムコンテンツの生成
❌ アフィリエイト規約違反
❌ 著作権侵害
❌ 虚偽情報の掲載

### やるべきこと

✅ オリジナリティのあるコンテンツ
✅ ユーザー価値重視
✅ 定期的な更新
✅ 規約遵守

---

## 📞 困ったとき

### トラブルシューティング

1. **ビルドエラー**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)のトラブルシューティング参照
2. **GitHub Actions失敗**: リポジトリ Settings → Actions → "Allow all actions"
3. **サイトが表示されない**: Vercelの環境変数確認

### 参考資料

- [README.md](./README.md) - プロジェクト概要
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 詳細デプロイ手順
- [QUICK_START.md](./QUICK_START.md) - 最短手順

---

## ✅ チェックリスト

コピーして進捗管理に使用:

```
□ npm install 完了
□ 全サイトコンテンツ生成完了
□ ローカルテスト完了
□ GitHubリポジトリ作成・プッシュ完了
□ Amazon Associates登録完了
□ ClickBank登録完了
□ Site 1 Vercelデプロイ完了
□ Site 2 Vercelデプロイ完了
□ Site 3 Vercelデプロイ完了
□ Site 4 Vercelデプロイ完了
□ Site 5 Vercelデプロイ完了
□ Google Search Console登録完了
□ 初期トラフィック獲得開始
□ 各サイト30記事到達
□ 初収益達成
□ 月1万円達成
```

---

**🎉 成功を祈っています！**

質問があれば、GitHubのIssuesで気軽に聞いてください。
