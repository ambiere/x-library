import plugin from 'fastify-plugin'
import dotEnvConfSchema from './dotenv/dotenv.json' assert { type: "json" }
import authRegisterSchema from './auth/auth-register-body.json' assert { type: "json" }
import authTokenResponseSchema from './auth/auth-token-response.json' assert { type: "json" }
import authRefreshTokenHeaderSchema from './auth/auth-refresh-token-header.json' assert { type: "json" }

export default plugin(
  async function schemasLoader(app, _opts, next) {
    app.addSchema(dotEnvConfSchema)
    app.addSchema(authRegisterSchema)
    app.addSchema(authTokenResponseSchema)
    app.addSchema(authRefreshTokenHeaderSchema)
    next()
  }
)
