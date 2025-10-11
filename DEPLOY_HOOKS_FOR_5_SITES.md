# 🚀 5サイト全てに自動デプロイする方法

## 📊 現在の構成

あなたのプロジェクトには**5つの独立したVercelサイト**があります：

1. **site1**: AI Tools Hub (https://ai-tools-hub.vercel.app)
2. **site2**: Tech Comparison Pro (https://tech-comparison-pro.vercel.app)
3. **site3**: Dev Tips Daily
4. **site4**: Productivity Geek
5. **site5**: Tech How-To Guide

**重要**: 各サイトは別々のVercelプロジェクトとしてデプロイされています。

---

## 🔧 解決策：5つのDeploy Hookを設定

各Vercelプロジェクトに1つずつDeploy Hookを作成する必要があります。

### 方法1: Deploy Hookを5つ作成（推奨）

#### ステップ1: 5つのDeploy Hookを作成

各Vercelプロジェクトで以下を実行：

**Site1用**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → **AI Tools Hub**プロジェクト
2. Settings → Git → Deploy Hooks
3. Create Hook:
   ```
   Name: auto-content-site1
   Branch: main
   ```
4. URLをコピー（例: `https://api.vercel.com/v1/integrations/deploy/prj_xxx1/yyy1`）

**Site2用**:
1. Vercel Dashboard → **Tech Comparison Pro**プロジェクト
2. 同じ手順で Create Hook:
   ```
   Name: auto-content-site2
   Branch: main
   ```
3. URLをコピー

**Site3, Site4, Site5も同様に実行**

#### ステップ2: GitHub Secretsに5つのURLを登録

GitHubリポジトリの Settings → Secrets → Actions で以下を追加：

```
Name: VERCEL_DEPLOY_HOOK_SITE1
Value: (site1のDeploy Hook URL)

Name: VERCEL_DEPLOY_HOOK_SITE2
Value: (site2のDeploy Hook URL)

Name: VERCEL_DEPLOY_HOOK_SITE3
Value: (site3のDeploy Hook URL)

Name: VERCEL_DEPLOY_HOOK_SITE4
Value: (site4のDeploy Hook URL)

Name: VERCEL_DEPLOY_HOOK_SITE5
Value: (site5のDeploy Hook URL)
```

#### ステップ3: ワークフローを更新

ワークフローファイルを更新して、各サイトに対応するDeploy Hookを使用：

```yaml
      - name: Trigger Vercel Deployment
        if: success()
        env:
          SITE_ID: ${{ matrix.site }}
          DEPLOY_HOOK_SITE1: ${{ secrets.VERCEL_DEPLOY_HOOK_SITE1 }}
          DEPLOY_HOOK_SITE2: ${{ secrets.VERCEL_DEPLOY_HOOK_SITE2 }}
          DEPLOY_HOOK_SITE3: ${{ secrets.VERCEL_DEPLOY_HOOK_SITE3 }}
          DEPLOY_HOOK_SITE4: ${{ secrets.VERCEL_DEPLOY_HOOK_SITE4 }}
          DEPLOY_HOOK_SITE5: ${{ secrets.VERCEL_DEPLOY_HOOK_SITE5 }}
        run: |
          echo "✅ Content generated for $SITE_ID"

          # 該当するサイトのDeploy Hookを使用
          case $SITE_ID in
            site1)
              DEPLOY_HOOK_URL=$DEPLOY_HOOK_SITE1
              ;;
            site2)
              DEPLOY_HOOK_URL=$DEPLOY_HOOK_SITE2
              ;;
            site3)
              DEPLOY_HOOK_URL=$DEPLOY_HOOK_SITE3
              ;;
            site4)
              DEPLOY_HOOK_URL=$DEPLOY_HOOK_SITE4
              ;;
            site5)
              DEPLOY_HOOK_URL=$DEPLOY_HOOK_SITE5
              ;;
          esac

          if [ -n "$DEPLOY_HOOK_URL" ]; then
            echo "🚀 Triggering Vercel deployment for $SITE_ID..."
            response=$(curl -s -X POST "$DEPLOY_HOOK_URL")
            echo "Response: $response"
            echo "✅ Deploy hook triggered for $SITE_ID"
          else
            echo "⚠️ Deploy hook not set for $SITE_ID"
            echo "Vercel will auto-deploy on git push"
          fi
```

---

### 方法2: 簡単だけど確実性が低い方法

**何もしない（現在の設定）**

各Vercelプロジェクトが`main`ブランチへのpushを自動検知してデプロイします。

**動作**:
```
GitHub Actions → git push →
  ↓
Vercel site1 が検知 → デプロイ
Vercel site2 が検知 → デプロイ
Vercel site3 が検知 → デプロイ
Vercel site4 が検知 → デプロイ
Vercel site5 が検知 → デプロイ
```

**利点**: 設定不要
**欠点**:
- Vercelの自動検知に依存
- どのサイトがデプロイされたか不明確
- 環境変数`SITE_ID`が各プロジェクトで正しく設定されている必要がある

---

## 🎯 推奨アプローチ

### 短期的（今すぐ動かしたい）

**方法2を使用** - 何もしない

各Vercelプロジェクトの設定を確認：
1. Vercel Dashboard → 各プロジェクト
2. Settings → Environment Variables
3. `SITE_ID`が正しく設定されているか確認：
   ```
   SITE_ID = site1  (AI Tools Hub用)
   SITE_ID = site2  (Tech Comparison Pro用)
   ... など
   ```

### 長期的（確実に動かしたい）

**方法1を使用** - Deploy Hookを5つ設定（所要時間: 30分）

これにより：
- ✅ 確実に各サイトがデプロイされる
- ✅ デプロイ状況を明確に把握できる
- ✅ 環境変数の設定ミスを回避

---

## 🔍 現在の状況を確認する方法

### 各Vercelプロジェクトの設定確認

各サイトで以下を確認：

1. **Environment Variables**:
   ```
   SITE_ID = site1, site2, site3, site4, または site5
   ```

2. **Git Integration**:
   ```
   Production Branch: main
   Connected Repository: あなたのGitHubリポジトリ
   ```

3. **Build Settings**:
   ```
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

---

## 🧪 テスト方法

### 現在の設定でテスト（Deploy Hookなし）

1. GitHub Actions → Run workflow
2. 5-10分待つ
3. **各Vercelプロジェクト**のDeploymentsタブを確認
4. 5つ全てのサイトで新しいデプロイが開始されているか確認

**期待される結果**:
- ✅ 5つのVercelプロジェクト全てで新しいデプロイ
- ✅ デプロイ時刻がほぼ同じ（ワークフロー実行後）

**実際の結果がこれと異なる場合**: Deploy Hook設定が必要

---

## 📝 実装する場合のステップバイステップ

実際にワークフローを更新します。以下のコマンドを実行してください：

### オプションA: 私が更新します

このドキュメントを読んで、「方法1を実装してほしい」と言ってください。
ワークフローファイルを自動更新します。

### オプションB: 自分で更新

1. Deploy Hookを5つ作成（各Vercelプロジェクトで）
2. GitHub Secretsに5つ登録
3. 私に「ワークフローを更新して」と言ってください
4. ワークフローファイルを自動更新します

---

## 🎓 重要な理解ポイント

### なぜ5つ必要？

```
1つのGitHubリポジトリ
  ↓
5つの独立したVercelプロジェクト
  ↓
各プロジェクトが異なるSITE_IDでビルド
  ↓
5つの異なるURL/ドメイン
```

**結論**:
- 1つのコードベース
- 5つの独立したデプロイメント
- → 5つのDeploy Hook必要

### なぜ1つのDeploy Hookでは不十分？

Deploy Hookは**特定のVercelプロジェクト**に紐付いています。

例：
```
site1のDeploy Hook → AI Tools Hubのみデプロイ
```

全5サイトをデプロイするには：
```
site1のDeploy Hook → AI Tools Hub
site2のDeploy Hook → Tech Comparison Pro
site3のDeploy Hook → Dev Tips Daily
site4のDeploy Hook → Productivity Geek
site5のDeploy Hook → Tech How-To Guide
```

---

## 🚨 よくある誤解

### ❌ 誤解1: 「1つのDeploy Hookで全サイトデプロイできる」
**正解**: 各Vercelプロジェクトに1つずつ必要（計5つ）

### ❌ 誤解2: 「環境変数を変えればいい」
**正解**: Deploy HookはVercelプロジェクトに紐付いている

### ❌ 誤解3: 「設定しないと動かない」
**正解**: 設定しなくてもVercelの自動デプロイで動く（ただし確実性は低い）

---

## 🎯 次のステップ

### ステップ1: 現在の設定で動くか確認（5分）

1. GitHub Actions → Run workflow
2. 各Vercelプロジェクトで新しいデプロイを確認

**動いている場合**: 何もしなくてOK
**動いていない場合**: ステップ2へ

### ステップ2: Deploy Hookを設定（30分）

1. 5つのVercelプロジェクトで各Deploy Hookを作成
2. GitHub Secretsに5つ登録
3. 私に「ワークフローを更新して」と依頼
4. テスト実行

---

## 💬 質問があれば

- 「方法1を実装して」→ ワークフローを自動更新します
- 「現在の設定を確認したい」→ 確認方法を案内します
- 「Deploy Hookの作り方がわからない」→ スクリーンショット付きで説明します

---

**まとめ**: 5サイト全てを確実にデプロイするには、5つのDeploy Hookが必要です。ただし、Vercelの自動デプロイに依存する場合は設定不要です（確実性は劣る）。
