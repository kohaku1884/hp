# 要件定義書

- `requirements-definition.md` … 要件定義書の原稿（Markdown）
- `要件定義書_v1.0.pdf` … クライアント提出用のPDF（原稿から生成）

## PDFの作り方
```bash
node scripts/md-to-pdf.js docs/requirements/requirements-definition.md docs/requirements/要件定義書_v1.0.pdf
```
- pandocでHTMLに変換し、Chromium（Playwright）でA4のPDFに出力する
- 見た目は `scripts/requirements.css` で調整する
- 版を上げたときは、出力ファイル名も更新する（例：`要件定義書_v0.2.pdf`）
