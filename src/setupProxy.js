const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/admin',
    createProxyMiddleware({
      target: 'http://localhost:3006',
      changeOrigin: true,
    })
  )
}
