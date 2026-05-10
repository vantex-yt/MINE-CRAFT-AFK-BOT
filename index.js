const mineflayer = require('mineflayer')

let reconnecting = false

function startBot() {
  reconnecting = false

  const bot = mineflayer.createBot({
    host: 'GGALAXY.aternos.me',
    port: 20052,
    username: 'GALAXY_BOT',
    auth: 'offline'
  })

  bot.once('spawn', () => {
    console.log('✅ Bot joined successfully')
    bot.chat('/login galaxy123')
  })

  function reconnect() {
    if (reconnecting) return
    reconnecting = true

    console.log('🔁 Reconnecting in 15s...')
    setTimeout(startBot, 15000)
  }

  bot.on('end', reconnect)

  bot.on('kicked', reason => {
    console.log('⚠️ Kicked reason:', JSON.stringify(reason))
  })

  bot.on('error', err => {
    console.log('⚠️ Error full:', err)
  })
}

startBot()
