const Router = require('koa-router')
const GameController = require('@/controllers/Game.controller')

const ctrl = new GameController()
const router = new Router()

router.get('/:gameId', ctrl.getPlayers)

router.get('/:gameId/:userId', ctrl.getPlayer)

router.post('/create', ctrl.create)

router.put('/:gameId', ctrl.join)

router.put('/:gameId/make-move', ctrl.makeMove)


module.exports = router
