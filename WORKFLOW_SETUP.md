# 🤖 自動コンテンツ更新ワークフローの設定ガイド

## 📋 現在の状況

GitHub Actionsワークフローは設定されていますが、**Vercelへの自動デプロイには追加の設定が必要**です。

---

## 🔧 必要な設定

### 1. Vercelの自動デプロイ設定（最重要）

#### ✅ 確認事項
Vercelは通常、GitHubの`main`ブランチへのプッシュを自動検知してデプロイします。

**確認手順**:
1. [Vercel Dashboard](https://vercel.com/dashboard) にログイン
2. プロジェクトを選択
3. **Settings** > **Git** を確認
4. 以下が有効になっているか確認:
   ```
   ✅ Production Branch: main
   ✅ Deploy Hooks: (オプション)
   ```

#### 🔴 問題がある場合

**Vercelが自動デプロイしない場合の対処法**:

##### オプション1: Deploy Hookを使用（推奨）

1. Vercel Dashboard で **Settings** > **Git** > **Deploy Hooks**
2. 「Create Hook」をクリック
3. 名前を入力（例: `auto-content-update`）
4. ブランチ: `main`
5. 「Create Hook」→ URLが生成されます（例: `https://api.vercel.com/v1/integrations/deploy/...`）

6. GitHubリポジトリの **Settings** > **Secrets and variables** > **Actions**
7. 「New repository secret」をクリック
8. 名前: `VERCEL_DEPLOY_HOOK`
9. 値: 上記で生成されたURL
10. 「Add secret」

7. ワークフローファイルを更新（後述）

##### オプション2: Vercel CLIを使用

GitHubリポジトリの **Settings** > **Secrets** に以下を追加:
- `VERCEL_TOKEN`: Vercelのトークン
- `VERCEL_ORG_ID`: Organization ID
- `VERCEL_PROJECT_ID`: Project ID

---

## 📝 ワークフローの動作説明

### 現在のワークフロー

```yaml
name: Auto Content Generation

on:
  schedule:
    # 毎週月・水・金の午前9時(UTC)に実行
    - cron: '0 9 * * 1,3,5'
  workflow_dispatch: # 手動実行も可能
```

**動作**:
1. ✅ 5つのサイト全てに対して並列実行
2. ✅ 各サイトで2記事を自動生成
3. ✅ GitHubにコミット＆プッシュ
4. ⚠️ Vercelへのデプロイ（設定次第）

---

## 🚀 Deploy Hookを使った改善版（推奨）

### ワークフローファイルの更新

もしDeploy Hookを設定した場合、以下のようにワークフローを改善できます：

```yaml
      - name: Trigger Vercel Deployment
        if: success()
        env:
          DEPLOY_HOOK_URL: ${{ secrets.VERCEL_DEPLOY_HOOK }}
        run: |
          if [ -n "$DEPLOY_HOOK_URL" ]; then
            echo "Triggering Vercel deployment..."
            curl -X POST "$DEPLOY_HOOK_URL"
            echo "✅ Deployment triggered for ${{ matrix.site }}"
          else
            echo "⚠️ VERCEL_DEPLOY_HOOK not set. Vercel will deploy on git push."
          fi
```

---

## 🧪 テスト方法

### 手動でワークフローを実行

1. GitHubリポジトリの **Actions** タブを開く
2. 左側の「Auto Content Generation」をクリック
3. 「Run workflow」ボタンをクリック
4. 「Run workflow」を確認

### 実行状況の確認

1. **GitHub Actions**:
   - ジョブが成功したか確認
   - ログでコミットが成功したか確認

2. **Vercel Dashboard**:
   - デプロイメントが開始されたか確認
   - デプロイ状況を確認

3. **実際のサイト**:
   - 新しいコンテンツが表示されているか確認

---

## ⚠️ トラブルシューティング

### 問題1: ワークフローが実行されない

**原因**: GitHub Actionsが無効になっている

**解決策**:
1. リポジトリの **Settings** > **Actions** > **General**
2. 「Allow all actions and reusable workflows」を選択
3. 「Save」

### 問題2: コンテンツは生成されるがVercelにデプロイされない

**原因**: Vercelが`main`ブランチの変更を検知していない

**解決策**:
1. Vercel Dashboardで **Settings** > **Git** を確認
2. Production Branchが`main`になっているか確認
3. Deploy Hookを設定（上記参照）

### 問題3: 並列実行でコンフリクトが発生

**原因**: 5つのジョブが同時にpushしようとしてコンフリクト

**現在の対策**: ワークフローに`git pull --rebase`を追加済み

**追加の解決策**:
並列実行を避けて順次実行にする場合:

```yaml
jobs:
  generate-content:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        site: [site1, site2, site3, site4, site5]
      max-parallel: 1  # 1つずつ実行
```

### 問題4: npmパッケージのインストールエラー

**原因**: `package-lock.json`の不整合

**解決策**:
```bash
# ローカルで実行
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

---

## 🎯 推奨設定（ベストプラクティス）

### 最小限の設定（現在の状態）

✅ **利点**: 設定が簡単
⚠️ **欠点**: Vercelの自動検知に依存

**動作**:
1. GitHub Actions → コンテンツ生成
2. Git push → Vercel自動デプロイ

### 推奨設定（Deploy Hook使用）

✅ **利点**: 確実にデプロイをトリガー
✅ **利点**: デプロイ状況を制御できる

**必要な手順**:
1. Vercel Deploy Hookを作成
2. GitHub Secretsに登録
3. ワークフロー更新（後述）

---

## 📋 Deploy Hook設定の詳細手順

### ステップ1: Vercel Deploy Hookの作成

1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. プロジェクトを選択
3. **Settings** タブをクリック
4. 左メニューから **Git** を選択
5. 下にスクロールして **Deploy Hooks** セクションを見つける
6. **Create Hook** をクリック
7. 以下を入力:
   ```
   Name: auto-content-update
   Git Branch: main
   ```
8. **Create Hook** をクリック
9. 生成されたURLをコピー（例: `https://api.vercel.com/v1/integrations/deploy/prj_xxx/yyy`）

### ステップ2: GitHub Secretsへの登録

1. GitHubリポジトリを開く
2. **Settings** タブをクリック
3. 左メニューから **Secrets and variables** > **Actions** を選択
4. **New repository secret** をクリック
5. 以下を入力:
   ```
   Name: VERCEL_DEPLOY_HOOK
   Secret: (ステップ1でコピーしたURL)
   ```
6. **Add secret** をクリック

### ステップ3: ワークフローの更新

以下の内容でワークフローを更新します:

```yaml
      - name: Trigger Vercel Deployment
        if: success()
        env:
          DEPLOY_HOOK_URL: ${{ secrets.VERCEL_DEPLOY_HOOK }}
        run: |
          if [ -n "$DEPLOY_HOOK_URL" ]; then
            echo "🚀 Triggering Vercel deployment..."
            response=$(curl -s -X POST "$DEPLOY_HOOK_URL")
            echo "Response: $response"
            echo "✅ Deployment triggered for ${{ matrix.site }}"
          else
            echo "⚠️ VERCEL_DEPLOY_HOOK not set"
            echo "Vercel will auto-deploy on git push to main branch"
          fi
```

---

## 🔄 完全版ワークフロー（Deploy Hook対応）

以下は、Deploy Hookに対応した完全版ワークフローです:

```yaml
name: Auto Content Generation

on:
  schedule:
    - cron: '0 9 * * 1,3,5'
  workflow_dispatch:

jobs:
  generate-content:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        site: [site1, site2, site3, site4, site5]
      max-parallel: 1  # コンフリクトを避けるため1つずつ実行

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Generate enhanced content for ${{ matrix.site }}
        env:
          SITE_ID: ${{ matrix.site }}
          NUM_POSTS: 2
          NEXT_PUBLIC_AMAZON_TAG: ${{ secrets.AMAZON_TAG }}
        run: npm run generate-enhanced

      - name: Commit and push changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add sites/${{ matrix.site }}/content/
          if git diff --staged --quiet; then
            echo "No changes to commit for ${{ matrix.site }}"
            echo "HAS_CHANGES=false" >> $GITHUB_ENV
          else
            git commit -m "🤖 Auto-generate content for ${{ matrix.site }}

            Generated $(date +%Y-%m-%d) by GitHub Actions

            Co-Authored-By: GitHub Actions <action@github.com>"
            git pull --rebase origin main
            git push origin main
            echo "✅ Changes committed and pushed for ${{ matrix.site }}"
            echo "HAS_CHANGES=true" >> $GITHUB_ENV
          fi

      - name: Trigger Vercel Deployment
        if: env.HAS_CHANGES == 'true'
        env:
          DEPLOY_HOOK_URL: ${{ secrets.VERCEL_DEPLOY_HOOK }}
        run: |
          if [ -n "$DEPLOY_HOOK_URL" ]; then
            echo "🚀 Triggering Vercel deployment for ${{ matrix.site }}..."
            response=$(curl -s -X POST "$DEPLOY_HOOK_URL")
            echo "Response: $response"
            echo "✅ Deployment triggered"
          else
            echo "⚠️ VERCEL_DEPLOY_HOOK not set"
            echo "Vercel will auto-deploy on git push to main branch"
          fi

      - name: Summary
        if: always()
        run: |
          echo "### Summary for ${{ matrix.site }}" >> $GITHUB_STEP_SUMMARY
          echo "- Content generation: ${{ job.status }}" >> $GITHUB_STEP_SUMMARY
          echo "- Changes committed: ${{ env.HAS_CHANGES }}" >> $GITHUB_STEP_SUMMARY
```

---

## 📊 モニタリングとデバッグ

### GitHub Actionsログの確認

1. リポジトリの **Actions** タブを開く
2. 実行されたワークフローをクリック
3. 各ジョブのログを確認:
   - ✅ Generate enhanced content: コンテンツ生成のログ
   - ✅ Commit and push changes: Gitコミットのログ
   - ✅ Trigger Vercel Deployment: デプロイトリガーのログ

### Vercelデプロイログの確認

1. [Vercel Dashboard](https://vercel.com/dashboard)
2. プロジェクトを選択
3. **Deployments** タブ
4. 最新のデプロイメントをクリック
5. ビルドログを確認

---

## 🎓 よくある質問（FAQ）

### Q1: ワークフローは動いているが、サイトに反映されない

**A**: 以下を確認してください:
1. Vercelのデプロイが成功しているか
2. ブラウザのキャッシュをクリア（Ctrl+Shift+R / Cmd+Shift+R）
3. 正しいサイトURLを見ているか（site1〜site5で異なる場合）

### Q2: 手動実行すると動くが、スケジュール実行が動かない

**A**: GitHubリポジトリの活動が必要です:
- リポジトリが60日間活動なしだとスケジュール実行が停止
- 対策: 定期的にコミットするか、手動実行を月1回実行

### Q3: 同じ内容の記事が生成される

**A**: コンテンツ生成スクリプトはテンプレートベースです:
- より多様なコンテンツには、OpenAI APIの統合を検討
- または手動でトピックを追加

### Q4: 5サイト全てに同時デプロイされてしまう

**A**: これは正常です。ワークフローは5サイト全てを更新します。
- 特定のサイトのみ更新したい場合は、手動で実行する際にワークフローファイルを一時的に編集

---

## 🚀 次のステップ

### 今すぐ実行
- [ ] Vercel Deploy Hookを作成
- [ ] GitHub Secretsに登録
- [ ] 手動でワークフローを実行してテスト

### 今週中
- [ ] スケジュール実行が動作するか確認（月・水・金）
- [ ] 生成されたコンテンツの品質チェック

### 将来の改善
- [ ] OpenAI API統合でより高品質なコンテンツ生成
- [ ] 多言語コンテンツの自動生成（`multilingual-content-generator.js`の統合）
- [ ] 画像の自動生成と追加

---

## 📞 サポート

問題が解決しない場合:
1. GitHub Actionsのログを確認
2. Vercelのデプロイログを確認
3. このドキュメントのトラブルシューティングを参照
4. GitHub Issuesで質問

---

**重要**: 現在のワークフローは基本的に動作します。Vercelが`main`ブランチへのpushを自動検知してデプロイするため、Deploy Hookの設定はオプションです。ただし、より確実な動作のためにはDeploy Hookの設定を推奨します。
