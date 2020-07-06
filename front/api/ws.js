import io from 'socket.io-client'

const socket = io('http://localhost:3000');

socket.on('_error', (v) => {
    console.error(v)
})

export default (() => socket)()
