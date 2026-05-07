const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'VANTEX_YT.aternos.me',
  port: 20052,
  username: 'VANTEX_bot',
  version: '1.21.1'
})

bot.on('spawn', () => {
  console.log('VANTEX_bot joined server 🔥')

  bot.chat('VANTEX_bot joined 😈')

  setInterval(() => {

    const yaw = Math.random() * Math.PI * 2
    const pitch = (Math.random() - 0.5) * 0.4

    bot.look(yaw, pitch, true)

    const actions = ['forward', 'back', 'left', 'right']

    const randomAction =
      actions[Math.floor(Math.random() * actions.length)]

    bot.setControlState(randomAction, true)

    if (Math.random() > 0.5) {
      bot.setJumpControl(true)
    }

    setTimeout(() => {
      bot.clearControlStates()
    }, 3000)

  }, 5000)

})

bot.on('playerCollect', (collector, item) => {

  if (collector !== bot.entity) return

  setTimeout(() => {

    if (bot.inventory.items().length > 0) {

      const randomItem =
        bot.inventory.items()[0]

      bot.tossStack(randomItem)

    }

  }, 1000)

})

bot.on('chat', (username, message) => {

  if (username === bot.username) return

  if (message === 'hi') {
    bot.chat('hello 😎')
  }

})

bot.on('kicked', console.log)
bot.on('error', console.log)
bot.on('end', () => {
  console.log('Bot disconnected!')
})
