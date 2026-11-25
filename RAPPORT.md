Blocage et sa solution

Le HUD devait écouter game:over sur document, mais TypeScript refusait document.addEventListener('game:over', …) alors que l'événement était bien déclaré dans HTMLElementEventMap. La raison : document n'utilise pas HTMLElementEventMap mais sa propre liste, DocumentEventMap. J'ai ajouté game:over dans DocumentEventMap avec la même augmentation d'interface (declare global), et le type de event.detail est maintenant connu.

Usage IA

J'ai utiliser l'ia pour m'expliquer ligne par ligne certain des exemples donné dans le cours, je l'ai également utiliser comme débugueur et l'ai aussi utilisé pour mettre en forme et m'aider à compléter le readme.