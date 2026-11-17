import { readFile, access, readdir } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const html = await readFile(resolve(root,'index.html'),'utf8');
let checked = 0;
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^(?:https?:|data:|mailto:)/.test(match[1])) continue;
  const name = match[1].split(/[?#]/)[0];
  await access(resolve(root,name)); checked++;
}
for (const file of await readdir(root)) {
  if (extname(file) !== '.css') continue;
  const css = await readFile(resolve(root,file),'utf8');
  for (const match of css.matchAll(/url\(\s*['"]?([^'"\)]+)['"]?\s*\)/g)) {
    if (/^(?:https?:|data:|#)/.test(match[1])) continue;
    await access(resolve(root,match[1])); checked++;
  }
}
console.log(`Site pronto: ${checked} referencias locais verificadas. Saida: dist/`);
