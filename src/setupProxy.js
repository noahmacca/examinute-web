const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    console.log('setupProxy');
    app.use('/published', createProxyMiddleware({
        target: 'http://p01-calendars.icloud.com',
        changeOrigin: true,
    }));
    app.use('/api', createProxyMiddleware({ target: 'http://127.0.0.1:5000/', changeOrigin: true }));
}