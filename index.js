const mineflayer = require('mineflayer')

const SERVER_HOST = 'GAALAXY.aternos.me'
const SERVER_PORT = 20052
const BOT_NAME = 'GALAXY_BOT'
const PASSWORD = 'galaxy123'

let bot = null
let reconnecting = false
let antiAfkInterval = null

function startBot() {
  console.log('🚀 Starting GALAXY_BOT...')

  bot = mineflayer.createBot({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: BOT_NAME,
    auth: 'offline',
    version: false,
    hideErrors: false
  })

  bot.once('spawn', () => {
    console.log('✅ GALAXY_BOT دخل للسيرفر')
    reconnecting = false

    setTimeout(() => {
      bot.chat(`/login ${PASSWORD}`)
      console.log('🔐 Login sent')
    }, 3000)

    setTimeout(() => {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`)
      console.log('📝 Register sent if needed')
    }, 6000)

    if (antiAfkInterval) clearInterval(antiAfkInterval)

    antiAfkInterval = setInterval(() => {
      if (!bot || !bot.entity) return

      try {
        const moves = ['forward', 'back', 'left', 'right']
        const move = moves[Math.floor(Math.random() * moves.length)]

        bot.setControlState(move, true)
        bot.setControlState('jump', true)

        const yaw = bot.entity.yaw + (Math.random() * 1.5 - 0.75)
        const pitch = bot.entity.pitch + (Math.random() * 0.5 - 0.25)

        bot.look(yaw, pitch, true)
        bot.swingArm('right')

        setTimeout(() => {
          if (!bot) return
          bot.setControlState(move, false)
          bot.setControlState('jump', false)
        }, 2500)

        console.log('🚶 Anti AFK movement')
      } catch (err) {
        console.log('⚠️ Anti AFK error:', err.message)
      }
    }, 20000)
  })

  function reconnect(reason) {
    if (reconnecting) return
    reconnecting = true

    console.log('🔁 Bot غادي يعاود يدخل. Reason:', reason)

    if (antiAfkInterval) {
      clearInterval(antiAfkInterval)
      antiAfkInterval = null
    }

    try {
      if (bot) bot.removeAllListeners()
    } catch (e) {}

    setTimeout(() => {
      startBot()
    }, 15000)
  }

  bot.on('end', () => {
    reconnect('Disconnected')
  })

  bot.on('kicked', reason => {
    console.log('⚠️ Bot kicked:', JSON.stringify(reason))
    reconnect('Kicked')
  })

  bot.on('error', err => {
    console.log('⚠️ Error:', err.message)
  })

  bot.on('message', msg => {
    console.log('📩 Server:', msg.toString())
  })

  bot.on('death', () => {
    console.log('☠️ Bot مات')
    setTimeout(() => {
      if (bot) bot.chat('/spawn')
    }, 4000)
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return

    const msg = message.toLowerCase()

    if (msg.includes('hi') || msg.includes('hello') || msg.includes('salam')) {
      bot.chat(`👋 Salam ${username}`)
    }

    if (msg.includes('tp')) {
      bot.chat('/tpaccept')
    }
  })
}

startBot()
