const mineflayer = require('mineflayer')

let bot
let reconnecting = false
let reconnectDelay = 15000

function createBot() {

  console.log('🚀 Starting GALAXY_BOT...')

  bot = mineflayer.createBot({
    host: 'GAALAXY.aternos.me',
    port: 20052,
    username: 'GALAXY_BOT',
    auth: 'offline',
    version: false,
    hideErrors: false,
    checkTimeoutInterval: 60000
  })

  // ===== JOIN =====
  bot.once('spawn', () => {

    console.log('✅ Bot joined the server')

    reconnecting = false

    // LOGIN
    setTimeout(() => {
      bot.chat('/login galaxy123')
    }, 4000)

    // REGISTER IF NEEDED
    setTimeout(() => {
      bot.chat('/register galaxy123 galaxy123')
    }, 7000)

    // ===== ANTI AFK =====
    setInterval(() => {

      if (!bot.entity) return

      // LOOK RANDOM
      const yaw = bot.entity.yaw + (Math.random() - 0.5)
      const pitch = bot.entity.pitch + (Math.random() - 0.5)

      bot.look(yaw, pitch, true)

      // JUMP
      bot.setControlState('jump', true)

      setTimeout(() => {
        bot.setControlState('jump', false)
      }, 1200)

      // WALK RANDOM
      const moves = ['forward', 'back', 'left', 'right']

      const randomMove = moves[Math.floor(Math.random() * moves.length)]

      bot.setControlState(randomMove, true)

      setTimeout(() => {
        bot.setControlState(randomMove, false)
      }, 3000)

    }, 25000)

    // ===== CHAT AUTO MESSAGE =====
    setInterval(() => {

      const messages = [
        '⚡ GALAXY_BOT ONLINE ⚡',
        '🔥 BEST SERVER 🔥',
        '💎 GALAXY SMP 💎',
        '🚀 NEVER GIVE UP 🚀'
      ]

      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)]

      bot.chat(randomMessage)

    }, 300000)

    // ===== RANDOM ACTION =====
    setInterval(() => {

      if (!bot.entity) return

      bot.swingArm()

    }, 45000)

  })

  // ===== AUTO RESPAWN =====
  bot.on('death', () => {

    console.log('☠️ Bot died')

    setTimeout(() => {
      bot.chat('/spawn')
    }, 5000)

  })

  // ===== AUTO RECONNECT =====
  function reconnect(reason) {

    if (reconnecting) return

    reconnecting = true

    console.log(`🔁 Reconnecting because: ${reason}`)

    try {
      bot.end()
    } catch (e) {}

    setTimeout(() => {
      createBot()
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

  // ===== PLAYER JOIN LOGGER =====
  bot.on('playerJoined', player => {

    if (!player || !player.username) return

    console.log(`👤 ${player.username} joined`)

  })

  // ===== PLAYER LEFT LOGGER =====
  bot.on('playerLeft', player => {

    if (!player || !player.username) return

    console.log(`❌ ${player.username} left`)

  })

  // ===== AUTO REPLY =====
  bot.on('chat', (username, message) => {

    if (username === bot.username) return

    console.log(`💬 ${username}: ${message}`)

    if (message.includes('hi')) {
      bot.chat(`👋 Hello ${username}`)
    }

    if (message.includes('tp')) {
      bot.chat(`/tpaccept`)
    }

  })

  // ===== KEEP ALIVE =====
  setInterval(() => {

    if (bot && bot._client) {

      try {
        bot._client.write('keep_alive', {})
      } catch (e) {}

    }

  }, 10000)

}

createBot()
