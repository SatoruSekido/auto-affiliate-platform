# 🔍 404エラー トラブルシューティング

## 問題：デプロイ成功したが404 Not Found

最も可能性が高い原因：**環境変数`SITE_ID`が設定されていない**

---

## ✅ 確認手順

### 1. Vercel環境変数の確認

1. **Vercel Dashboard** を開く
   - https://vercel.com/dashboard

2. **該当プロジェクト**をクリック
   - 例：`ai-tools-hub`

3. **Settings** タブをクリック

4. **Environment Variables** をクリック

5. **`SITE_ID`が存在するか確認**

#### 正しい設定例：

```
Name: SITE_ID
Value: site1
Environments: ✓ Production ✓ Preview ✓ Development
```

---

### 2. 環境変数が無い場合の追加方法

#### ステップ1: Environment Variables ページで

1. **Add New** ボタンをクリック

2. **Name** に入力：
   ```
   SITE_ID
   ```

3. **Value** に入力（サイトに応じて）：
   ```
   site1
   ```

4. **Environments** を選択：
   - ✓ Production
   - ✓ Preview
   - ✓ Development

5. **Save** をクリック

#### ステップ2: 再デプロイ

**重要**: 環境変数を追加しただけでは反映されません。再デプロイが必要です。

**方法A: Vercel UIから（簡単）**

1. **Deployments** タブをクリック
2. 最新のデプロイメントを見つける
3. 右側の **⋯** （3点メニュー）をクリック
4. **Redeploy** を選択
5. **Redeploy** ボタンをクリック

**方法B: GitHubから**

```bash
# READMEに空行追加など
echo "" >> README.md
git add README.md
git commit -m "Trigger redeploy"
git push
```

---

### 3. コンテンツの確認

404が出る場合、コンテンツが存在しない可能性もあります。

#### 確認するべきパス：

1. **トップページ**: `https://your-site.vercel.app/`
   - これも404なら環境変数の問題

2. **記事ページ**: `https://your-site.vercel.app/posts/top-10-ai-tools-for-content-creation-in-2024/`
   - トップページが表示されるが記事が404なら、コンテンツが不足

#### コンテンツ確認コマンド：

```bash
# ローカルで確認
ls sites/site1/content/
```

出力例：
```
ai-image-generators-comparison-midjourney-vs-dall-e.md
how-to-use-chatgpt-for-business-automation.md
top-10-ai-tools-for-content-creation-in-2024.md
```

ファイルがない場合：

```bash
SITE_ID=site1 npm run generate-content
git add sites/site1/content/
git commit -m "Add content for site1"
git push
```

---

## 🔧 各サイトの正しい環境変数設定

| Vercelプロジェクト名 | SITE_ID | コンテンツディレクトリ |
|---------------------|---------|---------------------|
| ai-tools-hub | site1 | sites/site1/content/ |
| tech-comparison-pro | site2 | sites/site2/content/ |
| dev-tips-daily | site3 | sites/site3/content/ |
| productivity-geek | site4 | sites/site4/content/ |
| tech-howto-guide | site5 | sites/site5/content/ |

**重要**: 各Vercelプロジェクトで異なる`SITE_ID`を設定してください！

---

## 🐛 その他の404の原因

### ケース1: `/posts/slug`にアクセスして404

**原因**: 末尾のスラッシュが必要

❌ `https://your-site.vercel.app/posts/top-10-ai-tools`
✅ `https://your-site.vercel.app/posts/top-10-ai-tools-for-content-creation-in-2024/`

**確認**:
```bash
# next.config.jsでtrailingSlash: trueが設定されているか確認
cat next.config.js | grep trailingSlash
```

### ケース2: トップページも404

**原因**: SITE_IDが間違っている

例：
- Vercel設定: `SITE_ID=site1`
- 実際のディレクトリ: `sites/site2/`

**解決**: Vercel環境変数を正しいIDに変更

### ケース3: ビルドログでエラー

Vercel Dashboard → Deployments → 最新のデプロイ → **View Function Logs**

エラーメッセージを確認

---

## 📋 完全チェックリスト

```
□ Vercel Dashboardにログイン
□ 該当プロジェクト（例：ai-tools-hub）を開く
□ Settings → Environment Variables を開く
□ SITE_ID が存在するか確認
□ 存在しない場合：
  □ Add New で追加
  □ Name: SITE_ID
  □ Value: site1（サイトに応じて）
  □ Environments: Production, Preview, Development 全てチェック
  □ Save をクリック
□ Deployments → 最新デプロイ → Redeploy
□ 2-3分待つ
□ https://your-site.vercel.app/ にアクセス
□ トップページが表示されるか確認
□ 記事ページにアクセスして確認
```

---

## 🎯 よくある質問

### Q: 環境変数を追加したのに404が出る

**A**: 再デプロイしましたか？環境変数の追加後は**必ず再デプロイ**が必要です。

### Q: SITE_ID=site1だが、site2のコンテンツが表示される

**A**: 別のVercelプロジェクトと環境変数が混在している可能性があります。各プロジェクトで個別に確認してください。

### Q: ローカルでは動くがVercelで404

**A**: ローカルとVercelで環境変数が異なる可能性があります。

ローカル：
```bash
export SITE_ID=site1
npm run dev
```

Vercel：Settings → Environment Variables で確認

### Q: 全てのページで404

**A**: next.config.jsまたはVercelのFramework設定の問題です。

Vercel Settings → General → Framework Preset が **Next.js** になっているか確認。

---

## 🚀 確認後の次のステップ

404が解決したら：

1. ✅ 5サイト全ての環境変数を設定
2. ✅ 各サイトに初期コンテンツ生成
3. ✅ Amazon Associates登録
4. ✅ アフィリエイトIDを環境変数に追加

---

## 📞 まだ解決しない場合

以下の情報を提供してください：

1. **アクセスしているURL**
   - 例：`https://ai-tools-hub.vercel.app/`

2. **Vercel環境変数のスクリーンショット**
   - Settings → Environment Variables

3. **ビルドログの最後の20行**
   - Deployments → View Function Logs

4. **ローカルで動作するか**
   ```bash
   SITE_ID=site1 npm run dev
   # http://localhost:3000 にアクセス
   ```

これらの情報があれば、さらに詳しく診断できます！
