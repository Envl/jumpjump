console.log(12345)

const byId = id => document.getElementById(id)

const page = {
  selectMode: true,
  Mode1Rule: false,
  Mode2Rule: false,
  Mode1Game: false,
  Mode2Game: true,
}
import mode2Questions from './mode2Questions'

byId('mode1').onclick = () => changePageTo('Mode1Game')
byId('mode2').onclick = () => changePageTo('Mode2Game')

const changePageTo = (pageName, ...options) => {
  const allPages = Object.keys(page)
  allPages.forEach(pn => {
    byId(pn).style.display = 'none'
    page[pn] = false
  })
  page[pageName] = true
  byId(pageName).style.display = 'block'
  if (pageName === 'Mode2Game') {
    const game2 = new Mode2Game(15, mode2Questions)
    game2.start()
    return game2
  }
}

const HIT_UNIT = 10

class Mode2Game {
  constructor(timeOut = 10, questions) {
    this.timeOut = timeOut
    this.root = byId('Mode2Game')
    this.questions = questions
    this.counter = document.querySelector('#Mode2Game .timer')
    this.question = document.querySelector('#Mode2Game .question')
    this.answers = document.querySelectorAll('#Mode2Game .answer')
    this.answers.forEach(el => (el.onclick = this.handleClick.bind(this)))
    this.step = 0
    this.info = document.querySelector('#Mode2Game .info')
  }

  get status() {
    return this.intervalId ? (this.timeOut > 0 ? 'Playing' : 'Over') : 'Pending'
  }

  start() {
    this.renderQuestion()
    this.intervalId = setInterval(() => {
      this.timeOut -= 1
      this.counter.innerText = this.timeOut
      if (this.timeOut === 0) {
        clearInterval(this.intervalId)
      }
      console.log(this.status)
    }, 1000)
  }

  renderQuestion() {
    if (this.step === this.questions.length) {
      this.end()
      return
    }
    const current = this.questions[this.step]
    this.question.innerText = current.question
    const answers = Array.from(this.answers)
    answers.forEach((el, idx) => {
      el.innerText = current.answers[idx].value
      el.dataset.isCorrect = current.answers[idx].isCorrect
    })
    this.step += 1
  }

  handleClick(event) {
    const { isCorrect } = event.target.dataset
    if (isCorrect == 1) {
      console.log(isCorrect)
      this.hit()
    } else {
      this.miss()
    }
    this.renderQuestion()
  }

  hit() {
    this.timeOut += HIT_UNIT
  }

  miss() {
    this.timeOut -= HIT_UNIT
  }

  end() {
    clearInterval(this.intervalId)
    this.info.innerText = 'Game Completed!'
  }
}
