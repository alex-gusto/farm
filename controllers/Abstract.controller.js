const { getSocket } = require('@/ws')

class AbstractController {
    getSocket(ctx) {
        const { headers: { 'socket-user': socketId } } = ctx.request
        return getSocket(socketId)
    }

    checkSocketRoom(ctx) {
        const { gameId } = ctx.params
        const socket = this.getSocket(ctx)
        console.log(socket)

        if (socket && gameId && !Object.values(socket.rooms).some(id => id === gameId)) {
            socket.join(gameId)
        }
    }
}

module.exports = AbstractController
