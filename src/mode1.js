import music from './music'

console.log(music[0])
export class Mode1Game {
  constructor() {
    this.player = document.querySelector('#Mode1Game > audio')
    this.player.onended = this.handleEnd.bind(this)
    this.info = document.querySelector('#Mode1Game .info')
    this.playGround = document.querySelector('#Mode1Game .playground')
    this.timeOut = 3
    this.totalSteps = music.length
    this.step = 0
    this.score = 0
    this.grids = []
  }

  get status() {
    return this.step < this.totalSteps && this.step > 0 ? 'Playing' : 'Complete'
  }

  start() {
    this.intervalId = setInterval(() => {
      this.info.style.display = 'block'
      this.info.innerText = this.timeOut
      this.timeOut -= 1
      if (this.timeOut === -1) {
        clearInterval(this.intervalId)
        this.player.style.display = 'block'
        this.player.play()
        this.info.style.display = 'none'
        this.musicLoopId = setInterval(this.handleMusicLoop.bind(this), 500)
      }
    }, 1000)
  }

  handleMusicLoop() {
    const { currentTime } = this.player
    console.log(currentTime * 1000, music[this.step][0])
    if (
      currentTime * 1000 >= music[this.step][0] &&
      currentTime * 1000 < music[this.step + 1][0] &&
      !this.grids.length
    ) {
      const active = document.createElement('div')
      active.className = 'active'
      active.innerText = 'I am active'
      active.onclick = () => (this.score += 10)
      // change coordinates here
      this.grids.push(active)
      const inactive = document.createElement('div')
      inactive.className = 'inactive'
      inactive.innerText = 'I am inactive'
      this.grids.push(inactive)
      this.playGround.appendChild(active)
      this.playGround.appendChild(inactive)
      setTimeout(() => {
        active.remove()
        inactive.remove()
        this.grids = []
        this.step += 1
      }, music[this.step][1])
    }
  }

  handleEnd() {
    clearInterval(this.musicLoopId)
    this.info.innerText = this.score
  }
}
