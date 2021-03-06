const Router = require('koa-router')

const router = new Router({
    prefix: '/api'
})

const routes = {
    '/games': require('./game.routes'),
    '/market': require('./market.routes'),
    '/quiz': require('./quiz.routes')
}

Object.entries(routes).forEach(([prefix, route]) => router.use(prefix, route.routes(), route.allowedMethods()))

module.exports = (app) => {
    app.use(router.routes()).use(router.allowedMethods())
}
