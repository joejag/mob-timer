const ipc = require('electron').ipcRenderer

const pauseBtn = document.getElementById('pause')
const unpauseBtn = document.getElementById('unpause')
const skipBtn = document.getElementById('skip')
const startTurnBtn = document.getElementById('startTurn')
const currentEl = document.getElementById('current')
const nextEl = document.getElementById('next')
const countEl = document.getElementById('count')

function lpad(val) {
  return val < 10
    ? '0' + val
    : '' + val
}

function formatTime(totalSeconds) {
  const seconds = totalSeconds % 60
  const minutes = Math.floor(totalSeconds / 60)
  return `${minutes}:${lpad(seconds)}`
}

ipc.on('timerChange', (event, seconds) => {
  countEl.innerHTML = formatTime(seconds)
})

ipc.on('rotated', (event, data) => {
  currentEl.innerHTML = data.current.name
  nextEl.innerHTML = data.next.name
})

ipc.on('paused', _ => {
  pauseBtn.classList.add('hidden')
  unpauseBtn.classList.remove('hidden')
})

ipc.on('started', _ => {
  pauseBtn.classList.remove('hidden')
  unpauseBtn.classList.add('hidden')
  startTurnBtn.classList.add('hidden')
})

ipc.on('turnEnded', (event, data) => {
  unpauseBtn.classList.add('hidden')
  startTurnBtn.classList.remove('hidden')
})

pauseBtn.addEventListener('click', _ => ipc.send('pause'))
unpauseBtn.addEventListener('click', _ => ipc.send('unpause'))
skipBtn.addEventListener('click', _ => ipc.send('skip'))
startTurnBtn.addEventListener('click', _ => ipc.send('startTurn'))

ipc.send('timerWindowReady')
