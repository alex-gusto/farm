const sockets = new Map()

const addSocket = ({ gameId, userId }, socket) => {
  if (!gameId) return

  // save connection
  const game = sockets.get(gameId) || {}
  game[ userId ] = socket

  sockets.set(gameId, game)

  // connect socket to room
  socket.join(gameId, () => console.log('joined: ', { gameId, userId }))
}

const deleteSocket = ({ gameId, userId }) => {
  const game = sockets.get(gameId)
  if (!game) return
  delete game[ userId ]

  if (!Object.keys(game).length) {
    sockets.delete(gameId)
  }

  console.log('disconnected: ', { gameId, userId })
}

const getSocket = ({ gameId, userId }) => {
  console.log(sockets.keys())
  const game = sockets.get(gameId) || {}
  return game[ userId ]
}

const onConnection = function onConnection (socket) {
  const { query } = socket.handshake

  addSocket(query, socket)

  socket.on('error', (v) => console.log(v))

  socket.on('disconnect', () => deleteSocket(query))
}

module.exports = {
  getSocket,
  onConnection
}
