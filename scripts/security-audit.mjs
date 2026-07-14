import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcDir = path.join(root, 'src');
const findings = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!entry.isFile() || !entry.name.match(/\.(ts|tsx|js|jsx|mjs)$/)) continue;

    const content = fs.readFileSync(fullPath, 'utf8');
    const relPath = path.relative(root, fullPath).replace(/\\/g, '/');

    if (relPath.startsWith('src/app/api/')) {
      continue;
    }

    if (content.includes('process.env.API_URL') || content.includes('process.env.NEXT_PUBLIC_API_URL')) {
      findings.push(`${relPath}: uses direct API URL env variables`);
    }

    if (/fetch\(\s*["']https?:\/\//.test(content)) {
      findings.push(`${relPath}: uses hardcoded http(s) fetch URL`);
    }

    if (content.includes('document.cookie =') || content.includes('document.cookie=')) {
      findings.push(`${relPath}: sets browser cookies directly`);
    }

    if (content.includes('target="_blank"') && !content.includes('rel="noopener noreferrer"')) {
      findings.push(`${relPath}: target=_blank without rel="noopener noreferrer"`);
    }
  }
}

walk(srcDir);

if (findings.length > 0) {
  console.error('Security audit failed:');
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.log('Security audit passed.');
