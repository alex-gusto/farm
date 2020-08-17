const Router = require('koa-router')
const QuizController = require('@/controllers/Quiz.controller')

const ctrl = new QuizController()
const router = new Router()

router.get('/:gameId/:userId', ctrl.get)

router.post('/:gameId/:userId', ctrl.check)

module.exports = router
