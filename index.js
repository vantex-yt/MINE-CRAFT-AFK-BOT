const mineflayer = require('mineflayer')

let reconnecting = false

function startBot() {
  reconnecting = false

  const bot = mineflayer.createBot({
    host: 'GGALAXY.aternos.me',
    port: 20052,
    username: 'GALAXY',
    version: '1.21.1',
    auth: 'offline'
  })

  let moveInterval = null

  bot.once('spawn', () => {
    console.log('✅ Bot joined successfully')

    bot.chat('/register galaxy123 galaxy123')
    bot.chat('/login galaxy123')

    moveInterval = setInterval(() => {
      if (!bot.entity) return

      bot.setControlState('forward', true)
      bot.setControlState('jump', true)

      bot.look(
        Math.random() * Math.PI * 2,
        0,
        true
      )

      setTimeout(() => {
        bot.setControlState('forward', false)
        bot.setControlState('jump', false)
      }, 2000)

    }, 8000)
  })

  function reconnect() {
    if (reconnecting) return
    reconnecting = true

    if (moveInterval) clearInterval(moveInterval)

    console.log('🔁 Reconnecting in 10 seconds...')

    setTimeout(() => {
      startBot()
    }, 10000)
  }

  bot.on('end', reconnect)

  bot.on('kicked', reason => {
    console.log('⚠️ Kicked:', reason)
  })

  bot.on('error', err => {
    console.log('⚠️ Error:', err.message)
  })
}

startBot()
