# Constats d'accessibilité - CinéScope

GROUPE:
- Noah CONTAL
- Théo GILLE

---

Principes suivis : HTML natif d'abord, aucun `tabindex`, ARIA uniquement quand le HTML ne suffit pas, apparence générale conservée.

## 1. Éléments interactifs non natifs (clavier impossible)
- **Constat** : les cartes (`div onClick`) et le logo (`div onClick`) n'étaient ni focalisables ni activables au clavier.
- **Correction** : le titre de chaque film est un vrai `<button>` (zone cliquable étendue à toute la carte via `::after`) et le logo est un `<button>`.

## 2. Focus supprimé et absence de retour au survol
- **Constat** : `outline: none` sur boutons, champ et liens rendait le focus invisible ; aucun style `:hover`.
- **Correction** : `:focus-visible` avec un contour de 3 px (blanc sur la barre sombre), états `:hover` sur liens, logo, cartes, favoris et champ, `:focus-within` sur les cartes, `prefers-reduced-motion` respecté.

## 3. Alternatives textuelles et information portée par la couleur seule
- **Constat** : images sans `alt` ; disponibilité indiquée uniquement par un point vert/rouge ; bouton favori réduit à « ☆ / ★ » sans nom accessible.
- **Correction** : `alt` descriptif sur les affiches, texte visible « Places disponibles » / « Complet », bouton favori nommé par un `aria-label` (« Ajouter aux favoris : titre » / « Retirer… »), seul ARIA du projet, nécessaire car le bouton ne contient qu'un glyphe. Cible tactile portée à 44 px.

## 4. Structure et repères de navigation
- **Constat** : tout en `div`, pas de `main`/`header`/`nav`, pas de lien d'évitement, titres `h1` puis `h4` (saut), lien « Informations » (`#infos`) pointant vers une cible inexistante.
- **Correction** : `header`, `nav`, `main`, `section`, lien d'évitement, titres de films en `h2` (plus de saut `h1` → `h4`), section `#infos` créée (texte provisoire à adapter).

## 5. Champ de recherche sans label
- **Constat** : seul le `placeholder` « Rechercher un film » nommait le champ. Il disparaît dès la saisie et n'est pas un vrai nom accessible : cliquer sur le texte ne donne pas le focus au champ.
- **Correction** : ajout d'un `<label>` visible relié au champ (`for`/`id`) et `type="search"` ; le `placeholder` est conservé en complément. Bordure du champ assombrie (≈ 1,9:1 → ≥ 3:1) et gris de texte secondaire / étoile favori légèrement assombris (≥ 4,5:1).
