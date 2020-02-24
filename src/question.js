const HIT_UNIT = 10
const byId = id => document.getElementById(id)
export class Mode2Game {
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

  get stillQuestionLeft() {
    return this.step < this.questions.length
  }

  start() {
    document.querySelector('#Mode2Rule').className = 'fk-hidden'
    this.renderQuestion()
    this.intervalId = setInterval(() => {
      this.timeOut -= 1
      this.counter.innerText = this.timeOut
      if (this.timeOut === 0 && this.stillQuestionLeft) {
        this.fail()
      }
    }, 1000)
    document.querySelector('#Mode2Game').className = 'mode2'
  }
  ready() {
    document.querySelector('#Mode2Rule').className = 'show-scene'
    document.querySelector('#Mode2Rule').querySelector('img').onclick = evt => {
      this.start()
    }
  }

  renderQuestion() {
    if (this.step === this.questions.length) {
      this.complete()
      return
    }
    const current = this.questions[this.step]
    this.question.innerText = current.question
    const answers = Array.from(this.answers)
    answers.forEach((el, idx) => {
      el.innerText = current.answers[idx].value
      el.dataset.isCorrect = current.answers[idx].isCorrect
      // change x and y here
    })
    this.step += 1
  }

  handleClick(event) {
    const {isCorrect} = event.target.dataset
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

  complete() {
    clearInterval(this.intervalId)
    this.info.innerText = 'Game Completed!'
  }

  fail() {
    this.info.innerText = 'Game Over'
    clearInterval(this.intervalId)
  }
}
