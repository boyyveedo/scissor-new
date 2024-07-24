// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/shorten', {
            target: 'http://localhost:4003',
            changeOrigin: true,
        })
    );
};
