const mineflayer = require('mineflayer')

const HOST = 'GAALAXY.aternos.me'
const PORT = 20052
const USERNAME = 'GALAXY_BOT'
const PASSWORD = 'galaxy123'

let reconnectTimer = null
let bot = null

function startBot() {
  console.log('🚀 Trying to join server...')

  bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    auth: 'offline',
    version: false,
    connectTimeout: 60000
  })

  bot.once('spawn', () => {
    console.log('✅ Bot دخل للسيرفر')

    setTimeout(() => {
      bot.chat(`/login ${PASSWORD}`)
      console.log('🔐 Login sent')
    }, 4000)
  })

  bot.on('end', () => {
    console.log('❌ Bot خرج من السيرفر')
    reconnect()
  })

  bot.on('kicked', (reason) => {
    console.log('⚠️ Kicked reason:', JSON.stringify(reason))
  })

  bot.on('error', (err) => {
    console.log('⚠️ Error:', err.message)
  })

  bot.on('message', (msg) => {
    console.log('📩 Server:', msg.toString())
  })
}

function reconnect() {
  if (reconnectTimer) return

  console.log('🔁 غادي يعاود يدخل من بعد 30 ثانية...')

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null
    startBot()
  }, 30000)
}

startBot()
