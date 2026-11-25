Composant natif : <game-hud>

Fichier : solo/src/components/game-hud.ts

Le panneau d'interface d'Arène. Il regroupe le score et le timer grâce à des slots, affiche le message de fin de partie et propose un bouton « Rejouer ». Son rendu est dans un Shadow DOM : son style ne fuit pas dans la page et le style de la page n'entre pas dedans.

Son contenu vient d'un <template id="game-hud-template"> qui doit être présent dans la page (solo/index.html).

Attributs

Aucun.

Propriétés

Aucune propriété publique. Le shadow DOM est ouvert (mode: 'open') : il est accessible avec element.shadowRoot pour déboguer.

Slots
Nom	Rôle
score	l'affichage du score (ex. <score-board>)
timer	l'affichage du temps (ex. <x-timer>)
actions	des boutons supplémentaires
Parts (style depuis la page)
Nom	Élément
message	le message de fin de partie
restart	le bouton « Rejouer »
css
game-hud::part(restart) { color: gold; }
Événements
Événement	Sens	Donnée (detail)	Description
game:over	écouté	GameState	écouté sur document : affiche « Perdu avec X cible(s). » et montre le bouton « Rejouer »
hud:restart	émis	aucune	émis au clic sur « Rejouer », avec bubbles: true et composed: true pour traverser le shadow DOM

Les événements sont typés dans HTMLElementEventMap (et DocumentEventMap pour game:over), donc addEventListener connaît le type de event.detail.

Exemple d'utilisation
html
<game-hud>
  <score-board slot="score" value="0"></score-board>
  <x-timer slot="timer"></x-timer>
</game-hud>
ts
import './components/game-hud.ts'

const hud = document.querySelector('game-hud')
if (hud !== null) hud.addEventListener('hud:restart', () => game.start())

game.events.on('over', (state) => {
  canvas.dispatchEvent(new CustomEvent('game:over', { detail: state, bubbles: true }))
})