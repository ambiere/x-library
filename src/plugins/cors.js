import cors from '@fastify/cors'
import plugin from 'fastify-plugin'

export default plugin(
  async function(app) {
    app.register(cors, {
      origin: true,
      credentials: true
    })
  }
)
