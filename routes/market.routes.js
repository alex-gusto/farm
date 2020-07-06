const Router = require('koa-router')
const MarketController = require('@/controllers/Market.controller')

const ctrl = new MarketController()
const router = new Router()

router.get('/:gameId', ctrl.get)

router.post('/:gameId', ctrl.exchange)

// router.put('/:id/make-move', ctrl.makeMove)

module.exports = router
