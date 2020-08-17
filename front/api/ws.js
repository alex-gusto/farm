import io from 'socket.io-client'

let socket = null

export const disconnect = () => {
  socket.disconnect()
  socket = null
}

export default (query) => {
  if (socket) return socket

  socket = io(process.env.SOCKET_URL || 'http://localhost:3000', {
    query
  })

  socket.on('_error', (v) => {
    console.error('socket error', v)
  })

  return socket
}
