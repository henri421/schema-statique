// Tests d'acceptation des finitions (etape 8.2) : textes affiches accentues,
// code intact. Lancement depuis la racine du depot :
//   ELECTRON_RUN_AS_NODE=1 "<Code.exe>" tests/finitions.test.mjs
// Sortie attendue : « N reussis, 0 echecs » et code de sortie 0.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const html = readFileSync(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);

let reussis = 0;
const echecs = [];
function verifier(nom, condition, detail = '') {
  if (condition) reussis++;
  else echecs.push(`${nom}${detail ? ' : ' + detail : ''}`);
}

// --- 1. Titre ----------------------------------------------------------------

verifier('titre de la page', /<title>Schéma statique<\/title>/.test(html), 'attendu <title>Schéma statique</title>');
verifier('titre h1', /<h1>Schéma statique<\/h1>/.test(html), 'attendu <h1>Schéma statique</h1>');

// --- 2. Textes affiches : forme accentuee presente, ancienne forme absente ---
// Chaque paire est [ancienne forme, forme attendue]. L'ancienne est cherchee
// telle quelle (casse comprise) entre deux bornes de mot.

const PAIRES = [
  ['Proprietes', 'Propriétés'],
  ['Selection', 'Sélection'],
  ['Repartie', 'Répartie'],
  ['Modeles de base', 'Modèles de base'],
  ['Mes modeles', 'Mes modèles'],
  ['Modele parametrique', 'Modèle paramétrique'],
  ['Portees (m)', 'Portées (m)'],
  ['Portee (m)', 'Portée (m)'],
  ['Generer', 'Générer'],
  ['Decimales', 'Décimales'],
  ['Articule fixe', 'Articulé fixe'],
  ['Articule mobile', 'Articulé mobile'],
  ['Poutre inclinee, G et neige', 'Poutre inclinée, G et neige'],
  ['Poutre encastree - articulee', 'Poutre encastrée - articulée'],
  ['Poutre bi-encastree', 'Poutre bi-encastrée'],
  ['Poutre a encastrements elastiques', 'Poutre à encastrements élastiques'],
  ['Poutre continue, 2 travees', 'Poutre continue, 2 travées'],
  ['Poutre continue encastree', 'Poutre continue encastrée'],
  ['Poutre sur sol elastique', 'Poutre sur sol élastique'],
  ['Poteau encastre - libre', 'Poteau encastré - libre'],
  ['Poteau articule - articule', 'Poteau articulé - articulé'],
  ['Poteau encastre - tete guidee', 'Poteau encastré - tête guidée'],
  ['Portique encastre', 'Portique encastré'],
  ['Portique a traverse articulee', 'Portique à traverse articulée'],
  ['Poutre continue, tassement d appui', "Poutre continue, tassement d'appui"],
  ['Cadre ferme sur sol elastique', 'Cadre fermé sur sol élastique'],
  ['Portique a deux versants', 'Portique à deux versants'],
  ['Ferme a treillis', 'Ferme à treillis'],
  ['Mur de soutenement', 'Mur de soutènement'],
  ['Volee d escalier', "Volée d'escalier"],
  ['Longrine sur appuis elastiques', 'Longrine sur appuis élastiques'],
  ['Ressorts lineaires', 'Ressorts linéaires'],
  ['Rotule debut', 'Rotule début'],
  ['Debut', 'Début'],
  ['Decalage', 'Décalage'],
  ['Epaisseur', 'Épaisseur'],
  ['Etiquette dx', 'Étiquette dx'],
  ['Fleche (m)', 'Flèche (m)'],
  ['Unite', 'Unité'],
  ['Alignee', 'Alignée'],
  ['Aucun modele a exporter.', 'Aucun modèle à exporter.'],
  ['Donnez un nom au modele.', 'Donnez un nom au modèle.'],
  ['Fichier charge.', 'Fichier chargé.'],
  ['Cliquez une barre. Les valeurs w1 et w2 se reglent a droite.', 'Cliquez une barre. Les valeurs w1 et w2 se règlent à droite.'],
  ['Cliquez un noeud. Le type se choisit a droite.', 'Cliquez un nœud. Le type se choisit à droite.'],
  ['Cliquez sur une barre pour y appliquer une charge repartie.', 'Cliquez sur une barre pour y appliquer une charge répartie.'],
  ['Encastrements aux deux extremites.', 'Encastrements aux deux extrémités.'],
  ['Pied encastre, tete guidee lateralement.', 'Pied encastré, tête guidée latéralement.'],
  ['Aucune selection', 'Aucune sélection'],
];

const echapperRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const borne = (s) => new RegExp(`(?<![\\p{L}\\p{N}_])${echapperRegex(s)}(?![\\p{L}\\p{N}_])`, 'u');

for (const [ancien, attendu] of PAIRES) {
  verifier(`ancienne forme absente : « ${ancien} »`, !borne(ancien).test(html));
  // L'apostrophe peut etre ecrite \' dans une chaine JS, ou &#39; / ’ dans le HTML.
  const variantes = [attendu, attendu.replace(/'/g, "\\'"), attendu.replace(/'/g, '&#39;'), attendu.replace(/'/g, '’')];
  verifier(`forme accentuee presente : « ${attendu} »`, variantes.some((v) => html.includes(v)));
}

// --- 3. Le code reste intact ---------------------------------------------------

verifier('un seul script', scripts.length >= 1);
for (const [i, code] of scripts.entries()) {
  let erreur = '';
  try {
    new vm.Script(code, { filename: `script-${i}.js` });
  } catch (e) {
    erreur = String(e && e.message);
  }
  verifier(`script ${i} : syntaxe JavaScript valide`, erreur === '', erreur);
}

const code = scripts.join('\n');
// Identifiants : aucun nom declare ni aucune propriete accedee ne porte d'accent.
const declares = [...code.matchAll(/\b(?:let|const|var|function)\s+([\p{L}_$][\p{L}\p{N}_$]*)/gu)].map((m) => m[1]);
const accentues = declares.filter((n) => /[^\x00-\x7F]/.test(n));
verifier('aucun identifiant declare accentue', accentues.length === 0, accentues.join(', '));
const proprietes = [...code.matchAll(/[\w)\]]\.([\p{L}_$][\p{L}\p{N}_$]*)/gu)].map((m) => m[1]).filter((n) => /[^\x00-\x7F]/.test(n));
verifier('aucune propriete accedee accentuee', proprietes.length === 0, [...new Set(proprietes)].join(', '));

// Noms internes qui doivent survivre tels quels (etat du dessin, fichiers et
// stockage deja enregistres chez les utilisateurs).
for (const nom of ['let etat = modeleVide()', "'schema-statique:auto'", 'function fleche(', 'epaisseur:', 'etiquette:']) {
  verifier(`code inchange : ${nom}`, code.includes(nom));
}

// --- Bilan ---------------------------------------------------------------------

for (const e of echecs) console.log('  ECHEC ' + e);
console.log(`${reussis} reussis, ${echecs.length} echecs`);
process.exitCode = echecs.length === 0 ? 0 : 1;
