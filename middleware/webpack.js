const webpack = require('webpack')
const webpackConfig = require('@/webpack.config')
const devMiddleware = require('webpack-dev-middleware');

const compiler = webpack(webpackConfig)
const expressMiddleware = devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
});

async function middleware(ctx, next) {
    await expressMiddleware(
        ctx.req, {
            end: (content) => {
                ctx.body = content;
            },
            setHeader: (name, value) => {
                ctx.set(name, value);
            }
        },
        next
    );
}

middleware.getFilenameFromUrl = expressMiddleware.getFilenameFromUrl;
middleware.waitUntilValid = expressMiddleware.waitUntilValid;
middleware.invalidate = expressMiddleware.invalidate;
middleware.close = expressMiddleware.close;
middleware.fileSystem = expressMiddleware.fileSystem;

module.exports = middleware;
