const { getSocket } = require('@/ws')

module.exports = async (ctx, next) => {
  const { gameId, userId } = ctx.params || {}

  const socket = getSocket({ gameId, userId })
  if (socket) {
    await new Promise(resolve => socket.join(gameId, resolve))
  }

  await next()
}
