import env from '@fastify/env'
import plugin from 'fastify-plugin'

export default plugin(
  async function(app) {
    await app.register(env, {
      confKey: 'env',
      dotenv: true,
      schema: app.getSchema('schema:dotenv')
    })
  },
  {
    name: 'application-config'
  }
)
