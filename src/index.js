const video = document.getElementById('video')
const startBtn = document.getElementById('button')
const select = document.getElementById('select')
let cap
let src
let dst
let streaming = true
let settings = {
  hideVidArea: false,
}

import {Mode2Game} from './question'
import {Mode1Game} from './mode1'

const byId = id => document.getElementById(id)

const page = {
  selectMode: true,
  Mode1Rule: false,
  Mode2Rule: false,
  Mode1Game: false,
  Mode2Game: false,
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
    // game2.start()
    game2.ready()
    return game2
  }
  if (pageName === 'Mode1Game') {
    const game1 = new Mode1Game()
    // document.querySelector('#Mode1Game').requestFullscreen()
    game1.ready()
    return game1
  }
}

window.onkeypress = evt => {
  if (evt.key == 'h') {
    settings.hideVidArea = !settings.hideVidArea
    document.querySelector('#vid-area').className = settings.hideVidArea
      ? 'fk-hidden'
      : ''
  }
}
function gotDevices(mediaDevices) {
  select.innerHTML = ''
  select.appendChild(document.createElement('option'))
  let count = 1
  mediaDevices.forEach(mediaDevice => {
    if (mediaDevice.kind === 'videoinput') {
      const option = document.createElement('option')
      option.value = mediaDevice.deviceId
      const label = mediaDevice.label || `Camera ${count++}`
      const textNode = document.createTextNode(label)
      option.appendChild(textNode)
      select.appendChild(option)
    }
  })
}
function stopMediaTracks(stream) {
  stream.getTracks().forEach(track => {
    track.stop()
  })
}
let currentStream
startBtn.onclick = event => {
  videoStarted = true
  if (typeof currentStream !== 'undefined') {
    stopMediaTracks(currentStream)
    console.log('stop')
  }
  const videoConstraints = {}
  if (select.value === '') {
    videoConstraints.facingMode = 'environment'
  } else {
    videoConstraints.deviceId = {exact: select.value}
  }
  const constraints = {
    video: videoConstraints,
    audio: false,
  }
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(mediaStream => {
      document.querySelector('video').srcObject = mediaStream
      currentStream = mediaStream
      return navigator.mediaDevices.enumerateDevices()
    })
    .then(gotDevices)
    .catch(error => {
      console.error(error)
    })
}
navigator.mediaDevices.enumerateDevices().then(gotDevices)

document.querySelector('.stop').onclick = evt => {
  streaming = false
}

let videoStarted = false
// do all your cv work here, after loading cv.js
cv['onRuntimeInitialized'] = () => {
  // function waiter() {
  //   console.log('tick')
  //   if (videoStarted) task()
  //   else setTimeout(waiter, 500)
  // }()
  ;(function tick() {
    // console.log('tick')
    if (videoStarted) setTimeout(task, 2000)
    else setTimeout(tick, 500)
  })()
  function task() {
    cap = new cv.VideoCapture(video)
    src = new cv.Mat(video.height, video.width, cv.CV_8UC4)
    dst = new cv.Mat(video.height, video.width, cv.CV_8UC4)
    // cv processing
    setTimeout(() => {
      try {
        if (!streaming) {
          // clean and stop.
          console.log('cleaning up')
          src.delete()
          dst.delete()
          gray.delete()
          faces.delete()
          classifier.delete()
          return
        }
        let begin = Date.now()
        // start processing.
        cap.read(src)
        src.copyTo(dst)
        cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0)
        // detect faces.
        classifier.detectMultiScale(gray, faces, 1.1, 3, 0)
        // draw faces.
        for (let i = 0; i < faces.size(); ++i) {
          let face = faces.get(i)
          let point1 = new cv.Point(face.x, face.y)
          let point2 = new cv.Point(face.x + face.width, face.y + face.height)
          cv.rectangle(dst, point1, point2, [255, 0, 0, 255])
        }
        cv.imshow('canvasOutput', dst)
        // schedule the next one.
        let delay = 1000 / FPS - (Date.now() - begin)
        setTimeout(processVideo, delay)
      } catch (err) {
        console.error(err)
      }
    }, 0)
  }
}
