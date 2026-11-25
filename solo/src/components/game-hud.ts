import type { GameState } from '../engine/types.ts'

class GameHud extends HTMLElement {
  readonly #root = this.attachShadow({ mode: 'open' })

  readonly #onOver = (event: CustomEvent<GameState>) => {
    const [player] = event.detail.players
    const message = this.#root.querySelector<HTMLElement>('[part="message"]')
    const restart = this.#root.querySelector<HTMLButtonElement>('[part="restart"]')
    if (message === null || restart === null) return
    message.textContent = `Perdu avec ${player.score} cible(s).`
    message.hidden = false
    restart.hidden = false
  }

  readonly #onRestart = () => {
    const message = this.#root.querySelector<HTMLElement>('[part="message"]')
    const restart = this.#root.querySelector<HTMLButtonElement>('[part="restart"]')
    if (message === null || restart === null) return
    message.hidden = true
    restart.hidden = true
    this.dispatchEvent(new CustomEvent('hud:restart', { bubbles: true, composed: true }))
  }

  connectedCallback() {
    const template = document.querySelector<HTMLTemplateElement>('#game-hud-template')
    if (template !== null) this.#root.append(template.content.cloneNode(true))
    this.#root.querySelector('[part="restart"]')?.addEventListener('click', this.#onRestart)
    document.addEventListener('game:over', this.#onOver)
  }

  disconnectedCallback() {
    this.#root.querySelector('[part="restart"]')?.removeEventListener('click', this.#onRestart)
    document.removeEventListener('game:over', this.#onOver)
  }
}
customElements.define('game-hud', GameHud)

declare global {
  interface HTMLElementTagNameMap {
    'game-hud': GameHud
  }
  interface HTMLElementEventMap {
    'hud:restart': CustomEvent<void>
    'game:score': CustomEvent<{ readonly score: number }>
    'game:over': CustomEvent<GameState>
  }
  interface DocumentEventMap {
    'game:over': CustomEvent<GameState>
  }
}