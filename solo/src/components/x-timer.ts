export class XTimer extends HTMLElement {
  private seconds = 0
  private interval = 0

  connectedCallback(): void {
    this.render()
  }

  disconnectedCallback(): void {
    this.stop()
  }

  start(): void {
    if (this.interval !== 0) return
    this.interval = window.setInterval(() => {
      this.seconds += 1
      this.render()
    }, 1000)
  }

  stop(): void {
    window.clearInterval(this.interval)
    this.interval = 0
  }

  reset(): void {
    this.seconds = 0
    this.render()
  }

  private render(): void {
    const minutes = String(Math.floor(this.seconds / 60)).padStart(2, '0')
    const seconds = String(this.seconds % 60).padStart(2, '0')
    this.textContent = `${minutes}:${seconds}`
  }
}

customElements.define('x-timer', XTimer)

declare global {
  interface HTMLElementTagNameMap {
    'x-timer': XTimer
  }
}
