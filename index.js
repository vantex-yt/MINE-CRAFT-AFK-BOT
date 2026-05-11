const mineflayer = require('mineflayer')

let bot
let reconnectDelay = 15000
let reconnecting = false

function startBot() {

  bot = mineflayer.createBot({
    host: 'GAALAXY.aternos.me',
    port: 20052,
    username: 'GALAXY_BOT',
    auth: 'offline',
    version: false,
    hideErrors: false
  })

  // ===== JOIN =====
  bot.once('spawn', () => {
    console.log('✅ Bot joined successfully')

    reconnecting = false

    // LOGIN
    setTimeout(() => {
      bot.chat('/login galaxy123')
    }, 3000)

    // ANTI AFK
    setInterval(() => {

      if (!bot.entity) return

      const yaw = bot.entity.yaw + 0.5
      bot.look(yaw, 0, true)

      bot.setControlState('jump', true)

      setTimeout(() => {
        bot.setControlState('jump', false)
      }, 1000)

    }, 30000)

    // CHAT MESSAGE
    setInterval(() => {
      bot.chat('⚡ GALAXY_BOT ONLINE ⚡')
    }, 300000)

  })

  // ===== RECONNECT =====
  function reconnect(reason) {

    if (reconnecting) return
    reconnecting = true

    console.log(`🔁 Reconnecting because: ${reason}`)

    try {
      bot.end()
    } catch (e) {}

    setTimeout(() => {
      startBot()
    }, reconnectDelay)
  }

  // ===== EVENTS =====
  bot.on('end', () => {
    reconnect('Disconnected')
  })

  bot.on('kicked', reason => {
    console.log('⚠️ Kicked:', reason)
    reconnect('Kicked')
  })

  bot.on('error', err => {
    console.log('⚠️ Error:', err.message)
  })

  // ===== AUTO RESPAWN =====
  bot.on('death', () => {
    console.log('☠️ Bot died')
  })

  // ===== KEEP ALIVE =====
  setInterval(() => {
    if (bot && bot._client) {
      bot._client.write('keep_alive', {})
    }
  }, 10000)

}

startBot()
