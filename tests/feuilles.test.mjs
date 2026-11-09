// Barre des feuilles de calcul (etape 9.5). Lancement depuis la racine du depot :
//   ELECTRON_RUN_AS_NODE=1 "<Code.exe>" tests/feuilles.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const lire = (f) => readFileSync(fileURLToPath(new URL(`../${f}`, import.meta.url)), 'utf8');
const html = lire('index.html');

assert.ok(html.indexOf('data-role="feuilles"') > html.indexOf('</header>'));
assert.ok(html.indexOf('data-role="feuilles"') < html.indexOf('<main>'));
assert.match(html, /src="feuilles\/brancher\.js"/);
assert.match(html, /barre && barre\.dansUnProjet\(\)\) \{ barre\.signaler\(\); return; \}/);
assert.match(html, /pile\.length = 0; pileRefaire\.length = 0;/);
assert.match(lire('feuilles/brancher.js'), /app: 'schema-statique'/);
for (const f of ['feuilles-dom', 'projets', 'projets-stockage', 'langue']) {
  assert.doesNotMatch(lire(`feuilles/${f}.js`), /from '\.\/[a-z-]+'/, `${f} : import sans .js`);
}
console.log('feuilles : reussi');
