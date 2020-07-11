const Koa = require('koa')
const body = require('koa-body')
const cors = require('koa-cors')
const serve = require("koa-static")
const { resolve } = require('path');

module.exports = () => {
    const app = new Koa()

    app
        .use(serve(resolve(__dirname, "../public")))
        .use(async (ctx, next) => {
            try {
                await next()
            } catch (err) {
                ctx.status = err.status || err.statusCode || 500;
                ctx.body = err.message;
                ctx.app.emit('error', err, ctx);
            }
        })
        .use(cors())
        .use(body())

    app.on('error', (err, ctx) => {
        console.log(err)
    });

    return app
}
