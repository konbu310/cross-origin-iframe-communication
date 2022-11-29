# cross-origin-iframe-communication

`MessageChannel()`を使用してクロスオリジンな iframe と通信するテスト

## setup

### 1. mkcert のインストール

ref: https://web.dev/i18n/ja/how-to-use-local-https/

### 2. hosts ファイルの書き換え

```hosts
# 以下を追加
127.0.0.1 host.localhost
127.0.0.1 guest.localhost
```

### 3. ローカル CA と証明書の生成

```bash
mkcert -install

make gen-cert
```

### 4. リバースプロキシとサーバーのスタート

```bash
# nginx
make up

# hostサービス -> https://host.localhost
npm run host

# iframeサービス -> https://guest.localhost
npm run iframe
```

## Todo

- [ ] Safari 対応
- [ ] https 対応
- [ ] WKWebView のテスト
