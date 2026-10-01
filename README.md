# schema-statique

Éditeur de schémas statiques pour notes de calcul : poutres continues, portiques,
consoles, avec appuis, charges nommées, cotations et annotations. Produit un SVG
vectoriel destiné à être inséré dans une note de calcul ou un rapport.

L'outil **dessine** et ne calcule rien. Il ne résout aucune structure, ne déduit
aucune réaction, ne vérifie aucune section. Les valeurs portées sur le schéma
sont celles saisies par l'utilisateur.

## Emploi

Ouvrir `index.html` dans un navigateur, ou la page publiée par GitHub Pages.
Aucune dépendance, aucune installation, aucune requête réseau : le dessin reste
dans le navigateur et le travail en cours est conservé dans le stockage local.

| Outil | Touche | Action |
|---|---|---|
| Sélection | `S` | sélectionner, déplacer un nœud, un texte, une cote, une étiquette ou une charge ; glisser le fond déplace la vue |
| Barre | `B` | cliquer les extrémités à la suite ; `Maj` contraint l'angle, `Échap` termine la polyligne |
| Appui | `A` | poser sur un nœud l'appui choisi dans le panneau : articulé fixe ou mobile, encastrement, encastrement glissant, appui pendulaire, ressort, ressort en rotation, rotule ; ou, sur une barre, un lit de ressorts linéaires. Un appui peut porter un tassement imposé |
| Force | `P` | sur un nœud ou en un point d'une barre, angle réglable |
| Répartie | `R` | sur une barre, uniforme ou triangulaire (puis trapézoïdale par `w1` et `w2`), verticale, horizontale depuis la gauche ou la droite, ou perpendiculaire ; par mètre de barre ou par mètre de projection |
| Moment | `M` | sur un nœud, sens horaire ou antihoraire |
| Cote | `C` | entre deux points ; accrochée aux nœuds, elle suit ensuite la géométrie |
| Texte | `T` | annotation libre |

`Ctrl+Z` annule, `Ctrl+Y` rétablit, `Suppr` efface la sélection, la molette zoome.

## Retoucher un schéma généré

Tout ce que produisent le générateur, les cas pratiques ou un modèle reste
éditable à la main :

- un **nœud** se glisse, et barres, charges et cotes qui s'y accrochent le suivent ;
- l'**étiquette** d'une charge ou d'une barre se glisse indépendamment de sa
  flèche, pour démêler deux textes qui se chevauchent ; le décalage se lit et se
  remet à zéro dans les champs *Etiquette dx / dy* ;
- une **charge répartie** glissée s'écarte de sa barre (champ *Base*), ce qui
  permet d'empiler G et Q sans les superposer ;
- une **cote** glissée s'éloigne ou se rapproche du dessin ;
- les **flèches du clavier** déplacent finement la sélection : nœuds et textes au
  pas de la grille, étiquettes et cotes de 2 px ; avec `Maj`, quatre pas ou 10 px.

Dans les propriétés d'une barre, *Rotule début* et *Rotule fin* l'articulent sur
son nœud sans articuler les autres barres qui y arrivent : une traverse posée
sur des poteaux continus, par exemple.

Une charge répartie cochée *Projection* est donnée par mètre de projection
horizontale, comme la neige sur un rampant ou l'exploitation d'un escalier. Son
diagramme se pose alors à l'horizontale, au-dessus du point haut de la barre,
avec des rappels pointillés, alors que le poids propre suit la barre.

## Modèles de base

Vingt-trois structures types, à charger puis adapter : poutre sur deux appuis,
poutre inclinée sous G et neige, poutre sous charge triangulaire,
encastrée-articulée, bi-encastrée, à encastrements élastiques, console, poutres
continues à deux et trois travées ou encastrées, poutre sur appuis ressorts,
poutre sur sol élastique (Winkler), poutre sur appui pendulaire, poutre continue
avec tassement d'appui, poteaux encastré-libre, articulé-articulé,
encastré-articulé, à tête guidée et sur semelle souple, portiques encastré,
articulé et à traverse articulée, cadre fermé sur sol élastique.

## Cas pratiques

Douze schémas complets, avec appuis, charges nommées et cotes, se chargent d'un
clic : poutre isostatique G + Q, poutre continue avec Q en alternance, linteau
sous poteau, balcon en console avec garde-corps, poutre Gerber, volée
d'escalier, portique à deux versants (neige et vent), portique à deux niveaux,
ferme à treillis, mur de soutènement, poteau bi-articulé, longrine sur appuis
élastiques.

Leurs valeurs sont **indicatives** : elles servent à habiller le schéma, ne
résultent d'aucun calcul, et sont à remplacer par celles de la note.

## Mes modèles

Un schéma s'enregistre sous un nom pour servir de point de départ à d'autres :
on le recharge, on change ce qui diffère, on exporte. Le modèle enregistré reste
intact. Le tableau **Charges** du panneau réunit le nom et la valeur de toutes
les charges, ce qui permet de décliner un modèle en quelques secondes.

La bibliothèque vit dans le stockage du navigateur, qui peut être vidé. *Exporter
la bibliothèque* la sauvegarde en un fichier `modeles-schema.json`, que le
bouton *Ouvrir* réimporte, sur ce poste ou sur un autre. Un modèle importé
remplace celui qui porte le même nom.

Le générateur paramétrique crée en une fois une poutre continue (portées séparées
par un point-virgule ou un espace, la virgule restant décimale), un portique à
traverse plate ou à deux pentes, ou une console, puis cote la géométrie.

## Unités et conventions

Longueurs en mètres, forces en kN, charges linéiques en kN/m, moments en kN·m,
angles en degrés trigonométriques, une force à `-90` étant dirigée vers le bas.
Les unités affichées restent libres : le champ *Unité* de chaque charge est un
texte.

## Export

SVG vectoriel et PNG tramé à l'échelle 3, tous deux sur fond blanc et cadrés sur
l'emprise réelle du dessin, étiquettes et diagrammes compris. Le modèle s'enregistre en JSON et se recharge à l'identique.

Les couleurs reprennent les jetons de `aedificium-ui` : structure en
`#1a1a1a`, charges en `#a8442a`, cotes en `#1e5aa8`.

## Licence

MIT, sans garantie.
