# 🔧 ワークフロー自動デプロイ - 簡単設定ガイド

## 📌 現在の状況

ワークフローを実行しても**サイトに反映されない**理由：

### ✅ 動作している部分
- GitHub Actionsでコンテンツは生成されている
- GitHubリポジトリにコミットされている

### ❌ 動作していない部分
- **Vercelへの自動デプロイ**がトリガーされていない可能性

---

## 🚀 最も簡単な解決方法（2つの選択肢）

### 方法1: Vercelの自動デプロイ確認（5分）

Vercelは通常、`main`ブランチへのpushを自動検知します。これが有効か確認：

1. **[Vercel Dashboard](https://vercel.com/dashboard)** にログイン
2. プロジェクトを選択
3. **Settings** タブ → **Git** を開く
4. 以下を確認:
   ```
   Production Branch: main ✅
   ```
5. **Deployments** タブで最近のデプロイを確認
   - GitHub Actionsからのコミット後にデプロイが開始されているか確認

**これで動いている場合**: 設定完了！追加作業なし

**動いていない場合**: 方法2へ

---

### 方法2: Deploy Hook設定（10分）- 推奨

確実にデプロイをトリガーする方法：

#### ステップ1: Vercel Deploy Hookを作成

1. **[Vercel Dashboard](https://vercel.com/dashboard)** にアクセス
2. プロジェクトを選択
3. **Settings** → **Git** → 下にスクロール
4. **Deploy Hooks** セクションを見つける
5. **Create Hook** をクリック
6. 入力:
   ```
   Name: auto-content
   Git Branch: main
   ```
7. **Create Hook** → URLが表示される（コピー）
   ```
   https://api.vercel.com/v1/integrations/deploy/prj_xxxxx/yyyyy
   ```

#### ステップ2: GitHub Secretsに登録

1. GitHubリポジトリを開く
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret** をクリック
4. 入力:
   ```
   Name: VERCEL_DEPLOY_HOOK
   Secret: (コピーしたURL)
   ```
5. **Add secret**

#### ステップ3: 確認

これだけ！ワークフローは既に対応済みです。

次回ワークフローを実行すると、自動的にDeploy Hookを使用します。

---

## 🧪 テスト方法

### 手動でワークフローを実行

1. GitHubリポジトリの **Actions** タブ
2. 左側の「Auto Content Generation」をクリック
3. **Run workflow** ボタン → **Run workflow**
4. 実行を待つ（約5-10分）

### 確認

1. **GitHub Actions**: ジョブが成功したか確認
2. **Vercel Dashboard** → **Deployments**: 新しいデプロイが開始されたか
3. **サイト**: 新しいコンテンツが表示されるか（数分待つ）

---

## 🔍 トラブルシューティング

### 問題: ワークフローが「No changes to commit」と表示

**原因**: すでに同じコンテンツが存在

**解決策**:
- 正常です。新しいコンテンツはスキップされます
- 既存の記事を削除して再実行
- または`NUM_POSTS`を増やす

### 問題: 「push failed」エラー

**原因**: 複数のジョブが同時にpushしようとした

**解決策**:
- ワークフローを更新済み（`max-parallel: 1`）
- このエラーは今後発生しません

### 問題: Vercelにデプロイされない

**原因**: Vercelの自動デプロイが無効

**解決策**:
- 上記「方法2: Deploy Hook設定」を実行
- またはVercelダッシュボードで手動デプロイ

---

## 📊 動作確認チェックリスト

デプロイが正常に動作しているか確認：

### GitHub Actions
- [ ] ワークフローが成功（緑色のチェックマーク）
- [ ] 「Content generated and committed」のメッセージ
- [ ] コミット履歴に新しいコミットが追加

### Vercel
- [ ] Deploymentsタブに新しいデプロイ
- [ ] ビルドが成功（緑色のチェックマーク）
- [ ] デプロイ時刻がワークフロー実行後

### サイト
- [ ] 新しい記事が表示される
- [ ] ブラウザキャッシュをクリア（Ctrl+Shift+R）
- [ ] サイトマップに新しい記事 (`/sitemap.xml`)

---

## 🎯 まとめ

### 現在の設定（改善済み）

✅ **ワークフロー**: 更新済み
- コンフリクト回避（`max-parallel: 1`）
- Deploy Hook対応（オプション）
- エラーハンドリング改善

✅ **自動実行**: 設定済み
- 毎週月・水・金の午前9時（UTC）
- 日本時間: 午後6時

✅ **手動実行**: いつでも可能
- GitHub Actions → Run workflow

### あなたがすべきこと（オプション）

**確実に動作させたい場合のみ**:
1. Deploy Hook作成（10分）
2. GitHub Secretsに登録（2分）

**それ以外**:
- 何もしなくてOK！
- Vercelが自動的にデプロイします

---

## 📖 詳細情報

より詳しい情報は以下を参照：
- **[WORKFLOW_SETUP.md](WORKFLOW_SETUP.md)** - 完全版セットアップガイド
- **[ACTION_PLAN_JP.md](ACTION_PLAN_JP.md)** - SEOとアクセスアップのガイド

---

## 🆘 それでも動かない場合

1. GitHub Actionsのログを確認
   - エラーメッセージをチェック
2. Vercel Dashboardを確認
   - デプロイ履歴とログをチェック
3. ブラウザのキャッシュをクリア
   - Ctrl+Shift+R（Windows）
   - Cmd+Shift+R（Mac）

---

**結論**: 最新のワークフローは基本的に動作します。Vercelの自動デプロイに依存しますが、より確実性を求める場合はDeploy Hookを設定してください（10分で完了）。
