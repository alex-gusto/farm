const Router = require('koa-router')
const PlayerController = require('@/controllers/Player.controller')

const ctrl = new PlayerController()
const router = new Router()

router.get('/:userId', ctrl.getPlayer)

router.get('/', ctrl.getPlayers)

module.exports = router
