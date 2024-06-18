import fastifyPlugin from 'fastify-plugin'
import authRegisterSchema from './auth/auth-register-body.json' assert { type: "json" }
import authTokenResponseSchema from './auth/auth-token-response.json' assert { type: "json" }
import authRefreshTokenHeaderSchema from './auth/auth-refresh-token-header.json' assert { type: "json" }
import dotEnvConfSchema from './dotenv/dotenv.json' assert { type: "json" }

export default fastifyPlugin(async function schemasLoader(fastify, opts, next) {
  fastify.addSchema(dotEnvConfSchema)
  fastify.addSchema(authRegisterSchema)
  fastify.addSchema(authTokenResponseSchema)
  fastify.addSchema(authRefreshTokenHeaderSchema)
  next()
})
