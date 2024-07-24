# ベースイメージとしてNode.jsの公式イメージを使用
FROM node:20-alpine

# pnpmをグローバルにインストール
RUN npm install -g pnpm

# アプリケーションディレクトリを作成
WORKDIR /app

# package.jsonとpnpm-lock.yamlをコピー
COPY package.json pnpm-lock.yaml ./

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# アプリケーションのソースをコピー
COPY . .

# アプリケーションをビルド
RUN pnpm run build

# アプリケーションを実行
CMD ["pnpm", "start"]

# ポート3000を公開
EXPOSE 3000
