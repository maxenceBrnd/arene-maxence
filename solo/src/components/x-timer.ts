class XTimer extends HTMLElement {
  private seconds = 0
  private interval = 0

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    this.stop()
  }

  start() {
    this.interval = window.setInterval(() => {
      this.seconds += 1
      this.render()
    }, 1000)
  }

  stop() {
    window.clearInterval(this.interval)
  }

  reset() {
    this.seconds = 0
    this.render()
  }

  private render() {
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
