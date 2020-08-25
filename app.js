const koaLoader = require('@/loaders/koa.loader.js')
const socketLoader = require('@/loaders/socket.loader.js')
const http = require('http')
const router = require('@/routes')
const send = require('koa-send')
const sockets = require('@/middleware/sockets.middleware')

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

  koa.use(sockets)

  // FIXME: hot fix for handling all request to index.html
  koa.use(async (ctx) => {
    await send(ctx, './public/index.html')
  })

  server.listen(port)
})()


