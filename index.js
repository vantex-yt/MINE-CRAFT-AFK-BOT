const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'VANTEX_YT.aternos.me',
    port: 20052,
    username: '§cVANTEX_bot',
    version: '1.21.1'
  })

  bot.on('spawn', () => {
    console.log('Bot joined server!')

    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2
      bot.look(yaw, 0, true)

      const actions = ['forward', 'back', 'left', 'right']

      const action = actions[Math.floor(Math.random() * actions.length)]

      bot.setControlState(action, true)

      setTimeout(() => {
        bot.setControlState(action, false)
      }, 2000)

      const item = bot.nearestEntity(entity => entity.type === 'object')

      if (item) {
        bot.tossStack(bot.inventory.items()[0])
      }

    }, 5000)
  })

  bot.on('kicked', console.log)
  bot.on('error', console.log)

  bot.on('end', () => {
    console.log('Reconnecting...')
    setTimeout(createBot, 5000)
  })
}

createBot()
