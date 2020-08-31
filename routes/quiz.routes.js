const Router = require('koa-router')
const QuizController = require('@/controllers/Quiz.controller')

const ctrl = new QuizController()
const router = new Router()

router.get('/', ctrl.get)

router.post('/', ctrl.check)

module.exports = router
