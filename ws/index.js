const sockets = new Map()

module.exports.getSocket = (id) => sockets.get(id)

module.exports.onConnection = function onConnection(socket) {
    const io = this
    console.log('connected: ', socket.id)
    sockets.set(socket.id, socket)

    console.log(socket.rooms)

    socket.on('error', (v) => {
        console.log(v)
    })

    socket.on('disconnect', () => {
        sockets.delete(socket.id)
        console.log('disconnected: ', socket.id)
    })

    // test
    // socket.join('1')
}
