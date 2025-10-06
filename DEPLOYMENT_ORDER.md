# 🔄 正しいデプロイ順序（鶏と卵問題の解決）

## 問題点

- ❌ Amazonアフィリエイト登録 → サイトURLが必要
- ❌ Vercelデプロイ → トラッキングIDが必要

## ✅ 解決策：3ステップアプローチ

---

## ステップ1: 仮IDでVercelデプロイ（10分）

### Site 1をデプロイ

1. https://vercel.com/ → "New Project"
2. GitHubリポジトリ選択
3. **Environment Variables**に**仮のID**を設定:

```
SITE_ID=site1
NEXT_PUBLIC_AMAZON_TAG=temp-tag-20
```

4. Project Name: `ai-tools-hub`
5. **Deploy** クリック

### Site 2-5も同様に仮IDでデプロイ

| Site ID | Project Name | Environment Variables |
|---------|--------------|---------------------|
| site1 | ai-tools-hub | SITE_ID=site1<br>NEXT_PUBLIC_AMAZON_TAG=temp-tag-20 |
| site2 | tech-comparison-pro | SITE_ID=site2<br>NEXT_PUBLIC_AMAZON_TAG=temp-tag-20 |
| site3 | dev-tips-daily | SITE_ID=site3<br>NEXT_PUBLIC_AMAZON_TAG=temp-tag-20 |
| site4 | productivity-geek | SITE_ID=site4<br>NEXT_PUBLIC_AMAZON_TAG=temp-tag-20 |
| site5 | tech-howto-guide | SITE_ID=site5<br>NEXT_PUBLIC_AMAZON_TAG=temp-tag-20 |

### デプロイ完了後、URLをメモ

```
✅ https://ai-tools-hub.vercel.app
✅ https://tech-comparison-pro.vercel.app
✅ https://dev-tips-daily.vercel.app
✅ https://productivity-geek.vercel.app
✅ https://tech-howto-guide.vercel.app
```

---

## ステップ2: Amazon Associates登録（15分）

### サイトURLを使って登録

1. https://affiliate-program.amazon.com/
2. アカウント作成
3. **ウェブサイトURL**入力時に、ステップ1で取得したURLを使用:

```
Website 1: https://ai-tools-hub.vercel.app
Website 2: https://tech-comparison-pro.vercel.app
Website 3: https://dev-tips-daily.vercel.app
Website 4: https://productivity-geek.vercel.app
Website 5: https://tech-howto-guide.vercel.app
```

4. 残りの情報を入力（[AFFILIATE_REGISTRATION_GUIDE.md](./AFFILIATE_REGISTRATION_GUIDE.md)参照）
5. **Tracking ID**を取得:

```
例: yourname-20
```

**このIDをメモ！**

---

## ステップ3: Vercelの環境変数を本物に更新（5分）

### 各Vercelプロジェクトの環境変数を更新

#### Site 1の更新

1. Vercel Dashboard → `ai-tools-hub` プロジェクト
2. **Settings** → **Environment Variables**
3. `NEXT_PUBLIC_AMAZON_TAG` を見つける
4. **Edit** をクリック
5. 値を変更:

```
変更前: temp-tag-20
変更後: yourname-20  ← 本物のトラッキングID
```

6. **Save** をクリック
7. **重要**: Redeployが必要

#### 自動再デプロイ方法

**オプション1: Vercel UIから**
1. **Deployments** タブ
2. 最新のデプロイメントの `⋯` メニュー
3. **Redeploy** をクリック

**オプション2: GitHubから（推奨）**

何か小さな変更をプッシュすると自動的に再デプロイ:

```bash
# READMEに空行追加など
echo "" >> README.md
git add README.md
git commit -m "Update environment variables"
git push
```

→ Vercelが自動的に全サイトを再デプロイ

#### Site 2-5も同様に更新

各プロジェクトで環境変数を本物のIDに変更。

---

## 完全な手順フロー

```
1. npm install ✅
   ↓
2. コンテンツ生成（全サイト） ✅
   ↓
3. GitHubリポジトリ作成・プッシュ ✅
   ↓
4. Vercelデプロイ（仮ID使用）
   環境変数: NEXT_PUBLIC_AMAZON_TAG=temp-tag-20
   ↓
5. デプロイ完了URLを取得
   例: https://ai-tools-hub.vercel.app
   ↓
6. Amazon Associates登録
   上記URLを使用
   ↓
7. 本物のTracking ID取得
   例: yourname-20
   ↓
8. Vercel環境変数を更新
   temp-tag-20 → yourname-20
   ↓
9. 再デプロイ
   （GitHubプッシュまたはVercel UIから）
   ↓
10. 完了！🎉
```

---

## 代替アプローチ（非推奨だが可能）

### アプローチA: SNSで仮登録

Amazon登録時にTwitter/LinkedInのURLを使用:

```
例: https://twitter.com/your_account
```

- ✅ すぐ登録可能
- ❌ 後でサイトURL追加が必要
- ❌ 手間が二度かかる

### アプローチB: ローカル環境変数なしでデプロイ

環境変数を全く設定せずデプロイ:

- ✅ Amazon登録後に一度だけ設定
- ❌ サイトにアフィリエイトリンクが表示されない状態でデプロイ
- ❌ 見た目が不完全

---

## おすすめ：ステップ1-3の3ステップアプローチ

### メリット

✅ **サイトがすぐライブになる**
✅ **Amazon登録時に実際のURLを使える**
✅ **環境変数の更新は簡単**（1分/サイト）
✅ **一度設定すれば永久に有効**

### デメリット

⚠️ 再デプロイが必要（ただし自動）
⚠️ 仮IDの期間中はアフィリエイトリンクが無効（問題なし）

---

## 環境変数更新の詳細手順（画像で説明）

### Vercel Dashboard での変更方法

1. **プロジェクトを選択**
   ```
   Vercel Dashboard → Projects → ai-tools-hub
   ```

2. **Settings タブ**
   ```
   上部メニュー → Settings
   ```

3. **Environment Variables**
   ```
   左サイドバー → Environment Variables
   ```

4. **変数を編集**
   ```
   NEXT_PUBLIC_AMAZON_TAG の右側の ⋯ → Edit
   ```

5. **値を変更**
   ```
   Value: temp-tag-20 → yourname-20
   ```

6. **保存して再デプロイ**
   ```
   Save → Deployments タブ → Redeploy
   ```

---

## よくある質問

### Q: 仮IDの状態でもサイトは動きますか？

**A:** はい、完全に動作します。ただしアフィリエイトリンクが無効なので、クリックされても収益になりません。

### Q: 環境変数更新後、すぐ反映されますか？

**A:** 再デプロイが必要です。デプロイ完了（1-2分）後に反映されます。

### Q: 5サイト全ての環境変数を更新する必要がありますか？

**A:** はい。各Vercelプロジェクトは独立しているため、それぞれ更新が必要です。

### Q: GitHubプッシュで再デプロイすると、5サイト全て更新されますか？

**A:** はい！GitHubに1回プッシュすると、連携している全てのVercelプロジェクトが自動的に再デプロイされます。（環境変数の更新は各プロジェクトで個別に必要）

---

## 実践チェックリスト

### フェーズ1: 仮デプロイ（今日）

```
□ GitHubリポジトリ作成・プッシュ完了
□ Site 1を仮ID（temp-tag-20）でデプロイ
□ Site 2を仮IDでデプロイ
□ Site 3を仮IDでデプロイ
□ Site 4を仮IDでデプロイ
□ Site 5を仮IDでデプロイ
□ 全5サイトのURLをメモ
```

### フェーズ2: Amazon登録（今日または明日）

```
□ Amazon Associates アカウント作成
□ 5サイトのURLを登録
□ 税務情報入力
□ 銀行情報入力
□ Tracking ID取得・メモ
```

### フェーズ3: 本番IDに更新（Amazon登録後すぐ）

```
□ Site 1の環境変数を本物のIDに更新
□ Site 2の環境変数を本物のIDに更新
□ Site 3の環境変数を本物のIDに更新
□ Site 4の環境変数を本物のIDに更新
□ Site 5の環境変数を本物のIDに更新
□ GitHubに小さな変更をプッシュ（再デプロイのため）
□ 全サイトの再デプロイ完了を確認
```

---

## まとめ

**今日やること:**
1. ✅ 仮ID `temp-tag-20` で5サイトをVercelデプロイ
2. ✅ デプロイURLを使ってAmazon Associates登録
3. ✅ 本物のTracking IDに環境変数を更新
4. ✅ GitHubプッシュで自動再デプロイ

**所要時間:** 合計30-40分

**この方法なら迷わず進められます！🚀**
