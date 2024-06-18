import plugin from 'fastify-plugin'
import cookie from '@fastify/cookie'

export default plugin(
  async function(app) {
    app.register(cookie, {
      secret: "secret-key",
      hook: "onRequest",
      parseOptions: {
        httpOnly: true,
        sameSite: "lax",
        path: "/"
      }
    })
  },
  {
    name: "cookie-plugin"
  }
)
