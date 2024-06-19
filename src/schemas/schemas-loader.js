import plugin from 'fastify-plugin'
import dotEnvConfSchema from './dotenv/dotenv.json' assert { type: "json" }

export default plugin(
  async function schemasLoader(app, _opts, next) {
    app.addSchema(dotEnvConfSchema)
    next()
  }
)
