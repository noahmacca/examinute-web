const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    console.log('setupProxy');
    app.use('/published', createProxyMiddleware({
        target: 'http://p01-calendars.icloud.com',
        changeOrigin: true,
    }));
    app.use('/v1', createProxyMiddleware({ target: 'http://api.darksky.net/', changeOrigin: true }));
}