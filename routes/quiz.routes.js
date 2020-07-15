const Router = require('koa-router')
const QuizController = require('@/controllers/Quiz.controller')

const ctrl = new QuizController()
const router = new Router()

router.get('/:gameId', ctrl.get)

router.post('/:gameId', ctrl.check)

module.exports = router
