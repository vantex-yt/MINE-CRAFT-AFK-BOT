const mineflayer = require('mineflayer')

function createBot() {

  const bot = mineflayer.createBot({
    host: 'GAALAXY.aternos.me',
    port: 20052,
    username: 'GALAXY_BOT',
    auth: 'offline',
    version: '1.21.1'
  })

  bot.on('spawn', () => {
    console.log('✅ Bot joined successfully')

    setTimeout(() => {
      bot.chat('/login galaxy123')
    }, 5000)
  })

  bot.on('end', () => {
    console.log('❌ Bot disconnected')

    setTimeout(() => {
      createBot()
    }, 20000)
  })

  bot.on('kicked', reason => {
    console.log('⚠️ Kicked:', reason)
  })

  bot.on('error', err => {
    console.log('⚠️ Error:', err.message)
  })

}

createBot()
