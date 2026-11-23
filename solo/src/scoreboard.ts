export class ScoreBoard extends HTMLElement {
  static readonly observedAttributes = ['value', 'label'] as const

  get value(): number {
    return Number(this.getAttribute('value') ?? 0)
  }

  set value(v: number) {
    this.setAttribute('value', String(v))
  }

  get label(): string {
    return this.getAttribute('label') ?? 'Score'
  }

  set label(v: string) {
    this.setAttribute('label', v)
  }

  connectedCallback(): void {
    this.render()
  }

  attributeChangedCallback(): void {
    this.render()
  }

  private render(): void {
    this.textContent = `${this.label} : ${this.value}`
  }
}

customElements.define('score-board', ScoreBoard)

declare global {
  interface HTMLElementTagNameMap {
    'score-board': ScoreBoard
  }
}