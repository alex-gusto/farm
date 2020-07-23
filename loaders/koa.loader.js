const Koa = require('koa')
const body = require('koa-body')
const cors = require('koa-cors')
const serve = require('koa-static')
const errorHandler = require('@/middleware/error-handler.middleware')
const { resolve } = require('path')

module.exports = () => {
    const app = new Koa()

    app
        .use(serve(resolve(__dirname, '../public')))
        .use(errorHandler)
        .use(cors())
        .use(body())

    app.on('error', (err, ctx) => {
        console.log(err)
    })

    return app
}
