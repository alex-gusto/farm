const gameRouter = require('./game.routes')
const playerRouter = require('./player.routes')
const marketRouter = require('./market.routes')
const Router = require('koa-router')

const router = new Router()

router.use('/games', gameRouter.routes(), gameRouter.allowedMethods())
router.use('/:gameId/players', playerRouter.routes(), playerRouter.allowedMethods())
router.use('/market', marketRouter.routes(), marketRouter.allowedMethods())

module.exports = (app) => {
    app.use(router.routes()).use(router.allowedMethods())
}
