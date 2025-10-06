# 📊 トラフィック追跡ガイド（完全無料）

5つのサイトのアクセス数を簡単に確認する方法をまとめました。

---

## 🎯 実装済み: Vercel Analytics（無料）

### ✅ 自動で追跡される指標

**各サイトで自動的に計測**:
- 📈 **ページビュー数**
- 👥 **ユニークビジター数**
- 🌍 **地域別アクセス**
- 📱 **デバイス種別**（PC/モバイル/タブレット）
- ⚡ **ページ読み込み速度**（Web Vitals）
- 🔗 **トップページ**（人気記事ランキング）

### 📱 確認方法

#### ステップ1: Vercelダッシュボードにアクセス

1. **https://vercel.com/dashboard** にアクセス
2. ログイン

#### ステップ2: 各プロジェクトの Analytics を確認

```
Vercel Dashboard
  ↓
Projects
  ↓
[サイト名をクリック]
  ↓
「Analytics」タブをクリック
```

#### ステップ3: データを確認

**無料プランで見れる内容**:
- **Overview**: 全体のトラフィックサマリー
- **Pages**: ページごとのアクセス数
- **Visitors**: 訪問者の推移グラフ
- **Locations**: 国別アクセス分布
- **Devices**: デバイス種別の割合

**データ保持期間**: 過去24時間（無料プラン）

---

## 📊 おすすめ: Google Analytics 4（完全無料・無制限）

### より詳細なデータが必要な場合

**Google Analytics 4の利点**:
- ✅ 完全無料
- ✅ データ無制限保存
- ✅ 詳細なレポート
- ✅ リアルタイムダッシュボード
- ✅ カスタムレポート作成可能

### 設定方法（5分）

#### ステップ1: Google Analytics アカウント作成

1. **https://analytics.google.com/** にアクセス
2. 「測定を開始」をクリック
3. アカウント名を入力（例: "My Affiliate Sites"）

#### ステップ2: プロパティ作成

各サイトごとにプロパティを作成:
- Site 1: AI Tools Hub
- Site 2: Tech Comparison Pro
- Site 3: Dev Tips Daily
- Site 4: Productivity Geek
- Site 5: Tech How-To Guide

#### ステップ3: 測定IDを取得

プロパティを作成すると、以下の形式のIDが発行されます:
```
G-XXXXXXXXXX
```

#### ステップ4: Next.jsに統合

環境変数に追加（各Vercelプロジェクト）:

```
Settings → Environment Variables → Add New

Name: NEXT_PUBLIC_GA_ID
Value: G-XXXXXXXXXX
```

#### ステップ5: コンポーネント作成（オプション）

以下のファイルを作成すると自動追跡されます:

**`components/GoogleAnalytics.tsx`**:
```typescript
'use client'

import Script from 'next/script'

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
```

**`app/layout.tsx` に追加**:
```typescript
import GoogleAnalytics from '@/components/GoogleAnalytics'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en">
      <body>
        {children}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
```

---

## 🔍 Google Search Console（完全無料・必須）

### SEOパフォーマンス追跡

**追跡できる指標**:
- 🔎 **検索キーワード**: どんな言葉で見つけられているか
- 📊 **検索順位**: Googleでの表示順位
- 👆 **クリック数**: 検索結果からのクリック数
- 👀 **表示回数**: 検索結果に表示された回数
- 📈 **CTR（クリック率）**: 表示回数に対するクリック率
- 📑 **インデックスページ数**: Googleに登録されたページ数

### 設定方法（5分）

#### ステップ1: Search Console にアクセス

1. **https://search.google.com/search-console** にアクセス
2. 「プロパティを追加」をクリック

#### ステップ2: 各サイトを追加

5つのサイトそれぞれを追加:

**プロパティタイプ**: URLプレフィックス
```
https://auto-affiliate-platform-tvjk.vercel.app
https://tech-comparison-pro-xxxx.vercel.app
...
```

#### ステップ3: 所有権の確認

**最も簡単な方法**: HTMLタグ

1. Search Consoleが提供するHTMLタグをコピー
2. `app/layout.tsx` の `<head>` に追加

または、**Vercelで自動確認**:
- Vercelダッシュボード → Settings → Domains
- 既にVercelで管理されているドメインは自動的に確認される場合あり

#### ステップ4: サイトマップ送信

各サイトで以下のURLを送信:

```
Search Console → サイトマップ → 新しいサイトマップの追加

https://your-site.vercel.app/sitemap.xml
```

---

## 📱 リアルタイム確認方法

### 1. Vercel Analytics（推奨 - 最も簡単）

**確認手順**:
```bash
1. Vercelダッシュボードにログイン
2. プロジェクトを選択
3. 「Analytics」タブをクリック
4. リアルタイムで過去24時間のデータを確認
```

**メリット**:
- ✅ 設定不要（既に実装済み）
- ✅ 5サイト全部一か所で管理
- ✅ シンプルで見やすい

### 2. Google Analytics 4 リアルタイムレポート

**確認手順**:
```bash
1. https://analytics.google.com/ にログイン
2. プロパティを選択
3. 左メニュー「リアルタイム」をクリック
4. 現在サイトを見ている人数が表示される
```

**メリット**:
- ✅ 完全無料
- ✅ 詳細なユーザー行動分析
- ✅ カスタムイベント追跡可能

### 3. Google Search Console

**確認手順**:
```bash
1. https://search.google.com/search-console にログイン
2. プロパティを選択
3. 「パフォーマンス」レポートを確認
```

**データ更新**: 通常24-48時間遅れ

---

## 📈 重要指標の見方

### 初期段階（月1-3）

**注目指標**:
- **ページビュー**: 50-500/日
- **インデックスページ数**: 増加しているか
- **検索クエリ数**: どんなキーワードで見つけられているか

**目標**: 記事がGoogleにインデックスされること

### 成長段階（月4-6）

**注目指標**:
- **ユニークビジター**: 100-1,000/日
- **平均掲載順位**: 50位 → 20位に改善
- **人気記事**: どの記事がアクセス多いか

**目標**: 検索順位の向上、トラフィック増加

### 収益化段階（月7-12）

**注目指標**:
- **コンバージョン率**: Amazonクリック率
- **トップトラフィックソース**: Google検索が70%以上
- **リピーター率**: 20-30%

**目標**: 安定した収益、月間10,000+ PV

---

## 🎯 おすすめのダッシュボード構成

### 毎日チェック（1分）

**Vercel Analytics**:
- 過去24時間のページビュー数
- トップページ確認

### 週1回チェック（5分）

**Google Analytics**:
- 週間ページビュー推移
- 人気記事ランキング
- 流入元（検索 vs 直接 vs SNS）

**Google Search Console**:
- 新しい検索クエリ
- 検索順位の変動
- クリック率

### 月1回チェック（15分）

**全体レビュー**:
- 月間トラフィック推移
- 成長率（前月比）
- 人気記事の傾向分析
- SEO改善ポイント

**Amazon Associates**:
- 月間収益
- クリック数
- コンバージョン率

---

## 💡 トラフィック増加のTips

### 1. 人気記事を特定

**Vercel Analytics / Google Analytics**:
- 最もアクセスの多い記事を確認
- その記事と類似したトピックで新記事作成

### 2. 検索キーワードを分析

**Google Search Console**:
- 「表示回数」が多いが「クリック数」が少ないキーワード
- → そのキーワードでタイトル・メタ説明を最適化

### 3. 検索順位を追跡

**目標順位**:
- 1-3位: 最高のトラフィック
- 4-10位: 良好なトラフィック
- 11-20位: 改善の余地あり

**改善方法**:
- 11-20位の記事を更新・拡充
- 内部リンクで人気記事へ誘導

---

## 🔧 トラブルシューティング

### Q: Vercel Analyticsにデータが表示されない

**解決策**:
1. デプロイが完了しているか確認
2. 24時間待つ（初回データ収集に時間がかかる）
3. ブラウザのキャッシュをクリア

### Q: Google Analyticsのデータが0のまま

**チェック項目**:
- [ ] 測定IDが正しく設定されているか
- [ ] 環境変数が各Vercelプロジェクトに設定されているか
- [ ] アドブロッカーを無効にして自分でサイト訪問
- [ ] 24-48時間待つ

### Q: Search Consoleにデータが表示されない

**解決策**:
1. サイトマップが送信されているか確認
2. robots.txtでクロールがブロックされていないか確認
3. 新しいサイトは2-4週間かかる場合あり

---

## ✅ 設定チェックリスト

```
現在（実装済み）:
✅ Vercel Analytics 実装済み
✅ Web Vitals計測 実装済み
✅ サイトマップ自動生成
✅ RSS フィード

推奨設定（5分で完了）:
□ Google Search Console 登録（5サイト）
□ サイトマップ送信（5サイト）

オプション（より詳細なデータが必要な場合）:
□ Google Analytics 4 設定
□ カスタムイベント追跡
```

---

## 🎉 まとめ

### 最も簡単な方法（今すぐ使える）

**Vercel Analytics**:
1. Vercelダッシュボードにログイン
2. 各プロジェクトの「Analytics」タブを開く
3. データ確認

**所要時間**: 1分
**コスト**: 完全無料
**データ**: 過去24時間

### 最も詳細な方法（推奨）

**Google Analytics 4 + Search Console**:
- 無制限のデータ保存
- 詳細なレポート
- カスタム分析

**初期設定**: 10-15分
**コスト**: 完全無料
**データ**: 無制限

---

**すべて無料で利用可能です！** 🎉
