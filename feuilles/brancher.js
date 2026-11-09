// Branche la barre des feuilles de calcul (projets de la suite) sur le schema.
// Le script principal de la page n'est pas un module : on passe par globalThis.
// Les autres fichiers de ce dossier sont generes (_banc-local/copier-projets.mjs).
import { brancherFeuilles } from './feuilles-dom.js';

globalThis.aedBarre = brancherFeuilles({
  app: 'schema-statique',
  nomApp: 'Schéma statique',
  conteneur: document.querySelector('[data-role="feuilles"]'),
  lire: () => globalThis.aedSchema.lire(),
  charger: (d) => globalThis.aedSchema.charger(d),
});
