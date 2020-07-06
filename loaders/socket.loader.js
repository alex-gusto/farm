const Socket = require('socket.io')
const { onConnection } = require('@/ws')

module.exports = (server) => {
    const io = new Socket(server)

    io.on('connection', onConnection)

    return io
}
