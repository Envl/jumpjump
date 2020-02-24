import music from './music'

// console.log(music[0])
export class Mode1Game {
  constructor() {
    this.player = document.querySelector('#Mode1Game > audio')
    this.player.onended = this.handleEnd.bind(this)
    this.info = document.querySelector('#Mode1Game .info')
    this.playGround = document.querySelector('#Mode1Game .playground')
    this.timeOut = 5
    this.totalSteps = music.length
    this.step = 0
    this.score = 0
    this.grids = []
    this.brickNow = document.querySelector('#step-cur')
    this.brickNext = document.querySelector('#step-next')
    this.nowPos = [900, 600]
    this.nexPos = this.genNextPos(
      this.nowPos[0],
      this.nowPos[1],
      150,
      1920,
      1080,
    )
  }

  get status() {
    return this.step < this.totalSteps && this.step > 0 ? 'Playing' : 'Complete'
  }

  start() {
    this.info.className += ' info-show'
    this.ruleDom.className += ' dimming'
    this.intervalId = setInterval(() => {
      // this.info.style.display = 'flex'
      this.info.innerText = this.timeOut
      this.timeOut -= 1
      if (this.timeOut === -1) {
        clearInterval(this.intervalId)
        // this.player.style.display = 'block'
        this.player.play()
        this.brickNow.style.visibility = 'visible'
        this.info.className = 'vanish'
        this.ruleDom.className = 'vanish'
        this.musicLoopId = setInterval(this.handleMusicLoop.bind(this), 500)
      }
    }, 1000)
  }

  ready() {
    this.ruleDom = document.querySelector('#Mode1Rule')
    this.ruleDom.className = 'show-scene'
    this.ruleDom.querySelector('img').onclick = evt => {
      this.start()
    }
  }
  genNextPos(x, y, r, scrW, scrH) {
    const w = scrW - 2 * r
    const h = scrH - 2 * r
    let newX, newY
    if (x > w / 2) newX = Math.random() * (x - 2 * r)
    else newX = (w - x - 2 * r) * Math.random() + x + 2 * r
    if (y > h / 2) newY = Math.random() * (y - 2 * r)
    else newY = (h - y - 2 * r) * Math.random() + y + 2 * r
    if (newX > w) newX = w - 2 * r
    if (newY > h) newY = h - 2 * r
    // newX = Math.random() * w
    // newY = Math.random() * h
    return [newX, newY]
  }

  handleMusicLoop() {
    const {currentTime} = this.player
    // console.log(currentTime * 1000, music[this.step][0])
    if (
      currentTime * 1000 >= music[this.step][0] &&
      currentTime * 1000 < music[this.step + 1][0] &&
      !this.grids.length
    ) {
      this.brickNext.className = ' visible'
      this.brickNow.className = ' visible'
      // const active = document.createElement('div')
      // active.className = 'active'
      // active.innerText = 'I am active'
      // active.onclick = () => (this.score += 10)
      // // change coordinates here
      // this.grids.push(active)
      // const inactive = document.createElement('div')
      // inactive.className = 'inactive'
      // inactive.innerText = 'I am inactive'
      // this.grids.push(inactive)
      // this.playGround.appendChild(active)
      // this.playGround.appendChild(inactive)
      // setTimeout(() => {
      //   active.remove()
      //   inactive.remove()
      //   this.grids = []
      //   this.step += 1
      // }, music[this.step][1])

      setTimeout(() => {
        this.brickNext.className = 'invisible'
        this.brickNow.className = 'dimmed'
        this.nowPos = this.nexPos
        this.nexPos = this.genNextPos(
          this.nowPos[0],
          this.nowPos[1],
          150,
          1280,
          720,
        )
        console.log(this.nowPos, this.nexPos)
        document.querySelector('#step-next').style.left = this.nexPos[0] + 'px'
        document.querySelector('#step-next').style.top = this.nexPos[1] + 'px'
        document.querySelector('#step-cur').style.left = this.nowPos[0] + 'px'
        document.querySelector('#step-cur').style.top = this.nowPos[1] + 'px'
        // this.brickNext.style.left = `${this.nexPos[0]}px !important;`
        // this.brickNext.style.top = `${this.nexPos[1]}px !important;`
        // this.brickNow.style.left = `${this.nowPos[0]}px !important;`
        // this.brickNow.style.top = `${this.nowPos[1]}px !important;`
        this.step += 2
      }, music[this.step][1] * 1.3)
    }
  }

  handleEnd() {
    clearInterval(this.musicLoopId)
    this.info.innerText = this.score
  }
}
