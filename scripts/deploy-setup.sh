#!/bin/bash

# Vercel デプロイセットアップスクリプト
# 各サイトを個別のVercelプロジェクトとしてデプロイ

SITES=("site1" "site2" "site3" "site4" "site5")

echo "=== Vercel Multi-Site Deployment Setup ==="
echo ""
echo "このスクリプトは5つのサイトをVercelにデプロイするためのガイドです"
echo ""

for site in "${SITES[@]}"; do
  echo "----------------------------------------"
  echo "Site: $site"
  echo "----------------------------------------"

  # サイト設定を読み込み
  CONFIG_FILE="sites/$site/config/site-config.json"

  if [ -f "$CONFIG_FILE" ]; then
    SITE_NAME=$(grep -o '"siteName": "[^"]*' "$CONFIG_FILE" | sed 's/"siteName": "//')
    echo "Site Name: $SITE_NAME"
    echo ""
    echo "手順:"
    echo "1. Vercelダッシュボードで新規プロジェクト作成"
    echo "2. このGitHubリポジトリを選択"
    echo "3. 環境変数を設定:"
    echo "   SITE_ID=$site"
    echo "4. プロジェクト名を設定 (例: ${site})"
    echo ""
    echo "または、Vercel CLIで:"
    echo "  SITE_ID=$site vercel --prod"
    echo ""
  fi
done

echo "----------------------------------------"
echo "全サイトのデプロイ後:"
echo "1. 各Vercelプロジェクトの環境変数にアフィリエイトIDを設定"
echo "2. カスタムドメインを設定 (オプション)"
echo "3. GitHub Actionsでの自動デプロイを有効化"
echo "----------------------------------------"
