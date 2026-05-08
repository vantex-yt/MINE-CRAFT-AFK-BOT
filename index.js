const mineflayer = require('mineflayer')

function startBot() {

  const bot = mineflayer.createBot({
    host: '_GALAXY_.aternos.me',
    port: 20052,
    username: 'GALAGXY',
    version: '1.21.1'
  })

  bot.on('spawn', () => {

    console.log('Bot joined successfully')

    setInterval(() => {

      bot.setControlState('forward', true)

      setTimeout(() => {
        bot.setControlState('jump', true)

        setTimeout(() => {
          bot.setControlState('jump', false)
        }, 500)

      }, 1000)

      setTimeout(() => {
        bot.setControlState('forward', false)
      }, 3000)

    }, 5000)

  })

  bot.on('end', () => {
    console.log('Disconnected... reconnecting')

    setTimeout(() => {
      startBot()
    }, 10000)
  })

  bot.on('kicked', reason => {
    console.log('Kicked:', reason)
  })

  bot.on('error', err => {
    console.log('Error:', err)
  })

}

startBot()
