const koaLoader = require('@/loaders/koa.loader.js')
const socketLoader = require('@/loaders/socket.loader.js')
const path = require('path')
const http = require('http');
const router = require('@/routes')
const { getSocket } = require('@/ws');
// const template = fs.readFileSync(path.resolve(__dirname, './index.html'))

const port = process.env.PORT || 3000;

(async () => {
    // load Koa app
    const koa = koaLoader()

    // create server
    const server = http.createServer(koa.callback())

    // connect sockets
    const io = socketLoader(server)

    // TODO: replace this logic to middleware
    koa.use(async (ctx, next) => {
        ctx.io = io

        await next()
    })

    // router
    router(koa, io)

    server.listen(port)
})()


