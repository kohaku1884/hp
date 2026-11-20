// 使い方: node scripts/md-to-pdf.js <入力.md> <出力.pdf> [css]
// pandocでMarkdownをHTMLに変換し、Chromium(Playwright)でA4のPDFに出力する
const { execFileSync } = require('child_process');
const fs = require('fs'), os = require('os'), path = require('path');
const { chromium } = require('playwright');

(async () => {
  const [input, output, cssArg] = process.argv.slice(2);
  if (!input || !output) { console.error('usage: node md-to-pdf.js in.md out.pdf [css]'); process.exit(1); }
  const css = path.resolve(cssArg || path.join(__dirname, 'requirements.css'));
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mdpdf-'));
  const html = path.join(tmp, 'doc.html');
  execFileSync('pandoc', [input, '-f', 'gfm', '-t', 'html5', '--standalone',
    '--metadata', 'pagetitle=要件定義書', '--css', css, '--embed-resources', '-o', html]);
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('file://' + html);
  await page.pdf({
    path: output, format: 'A4', printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#6b7280;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
    margin: { top: '18mm', bottom: '20mm', left: '16mm', right: '16mm' },
  });
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log('wrote', output);
})();
