const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(createProxyMiddleware(
        '/published', {
            target: 'http://p01-calendars.icloud.com',
            changeOrigin: true
        }
    ))
}