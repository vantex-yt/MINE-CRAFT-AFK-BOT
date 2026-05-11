const mineflayer = require('mineflayer')

const HOST = 'GAALAXY.aternos.me'
const PORT = 20052
const USERNAME = 'GALAXY_BOT'
const PASSWORD = 'galaxy123'

let bot = null
let reconnectTimer = null
let loginDone = false

function startBot() {
  console.log('🚀 GALAXY_BOT kay7awel ydkhol...')

  bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    auth: 'offline',
    version: false,
    connectTimeout: 60000,
    checkTimeoutInterval: 60000
  })

  bot.once('spawn', () => {
    console.log('✅ GALAXY_BOT dkhel l server')
    loginDone = false

    setTimeout(() => {
      if (!bot) return
      bot.chat(`/login ${PASSWORD}`)
      loginDone = true
      console.log('🔐 Login sent')
    }, 5000)
  })

  bot.on('message', (msg) => {
    const text = msg.toString()
    console.log('📩 Server:', text)

    if (
      text.toLowerCase().includes('login') &&
      !loginDone
    ) {
      setTimeout(() => {
        if (!bot) return
        bot.chat(`/login ${PASSWORD}`)
        loginDone = true
        console.log('🔐 Login sent again')
      }, 3000)
    }
  })

  bot.on('end', () => {
    console.log('❌ Bot khrej mn server')
    reconnect()
  })

  bot.on('kicked', (reason) => {
    console.log('⚠️ Kicked:', JSON.stringify(reason))
  })

  bot.on('error', (err) => {
    console.log('⚠️ Error:', err.message)
  })
}

function reconnect() {
  if (reconnectTimer) return

  console.log('🔁 Ghadi y3awd ydkhol mn b3d 45s...')

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null
    startBot()
  }, 45000)
}

startBot()
