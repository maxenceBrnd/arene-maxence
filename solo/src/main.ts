import './components/score-board.ts'
import './components/x-timer.ts'
import './components/game-hud.ts'
import { Game } from './engine/game.ts'
import { bindKeyboard } from './input.ts'
import { arena } from './levels/arena.ts'
import { createRenderer } from './renderer.ts'

const canvas = document.querySelector<HTMLCanvasElement>('#arena')
const board = document.querySelector('score-board')
const timer = document.querySelector('x-timer')
const hud = document.querySelector('game-hud')
const message = document.querySelector<HTMLElement>('#message')
if (canvas === null || board === null || timer === null || hud === null || message === null) throw new Error('Page incomplète')

const PLAYER_ID = 'p1'
const game = new Game(arena, [{ id: PLAYER_ID, name: 'Moi', color: '#61dafb' }])
const draw = createRenderer(canvas, game.snapshot)

draw(game.snapshot)
bindKeyboard(game, PLAYER_ID)

game.events.on('tick', draw)
game.events.on('start', () => {
  board.value = 0
  timer.reset()
  timer.start()
  message.textContent = 'Flèches ou ZQSD pour tourner'
})
game.events.on('score', ({ score }) => {
  board.value = score
})
game.events.on('over', (state) => {
  timer.stop()
  const [player] = state.players
  message.textContent = `Perdu avec ${player.score} cible(s). Espace pour rejouer.`
})

game.events.on('score', ({ score }) => {
  canvas.dispatchEvent(new CustomEvent('game:score', { detail: { score }, bubbles: true }))
})
game.events.on('over', (state) => {
  canvas.dispatchEvent(new CustomEvent('game:over', { detail: state, bubbles: true }))
})
hud.addEventListener('hud:restart', () => game.start())

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && game.snapshot.status !== 'running') {
    event.preventDefault()
    game.start()
  }
})