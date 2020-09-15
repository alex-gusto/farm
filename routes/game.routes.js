const Router = require('koa-router')
const GameController = require('@/controllers/Game.controller')

const ctrl = new GameController()
const router = new Router()

router.get('/:gameId', ctrl.getPlayers)

router.get('/quiz/:gameId/:userId', ctrl.getQuiz)

router.post('/quiz/:gameId/:userId', ctrl.checkQuiz)

router.delete('/:gameId/:userId', ctrl.leave)

router.get('/:gameId/:userId', ctrl.getPlayer)

router.post('/', ctrl.create)

router.post('/:gameId/:userId/send-animals', ctrl.sendAnimals)

router.put('/:gameId/:userId?', ctrl.join)

router.put('/:gameId/:userId/make-move', ctrl.makeMove)

module.exports = router
