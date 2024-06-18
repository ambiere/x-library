import plugin from 'fastify-plugin'

export default plugin(
  async function(app) {
    app.addHook('onRequest',
      async (request) => {
        request.log.info({
          req: request
        }, 'incoming request')
      }
    )

    app.addHook('onResponse',
      async (request, response) => {
        request.log.info({
          req: request,
          res: response
        }, 'request completed')
      }
    )

    app.graphql.addHook("preExecution",
      async function runAuth(
        schema,
        document,
        context,
        variables
      ) {
        let queryNames
        try {
          const query = document.definitions
          queryNames = query[0].name.value
        } catch (error) {
          context.throw(context.errorCode.ON1, context.errorMessage.ON1)
        }
        await app.authenticate(queryNames, context)
        return {
          schema,
          document,
          context,
          variables
        }
      }
    )
  },
  {
    name: "custom-hooks",
    dependencies: ["mercurius-plugin", "auth-plugin"]
  }
)
