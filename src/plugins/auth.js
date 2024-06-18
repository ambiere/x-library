import plugin from "fastify-plugin"

export default plugin(
  async function authenticate(app) {
    app.decorate("authenticate",
      async function auth(query, context) {
        query = query.toUpperCase()
        if (authNotRequired(query)) return
        const { data, error } = await context.auth.getUser()
        if (error) return context.throw(context.errorCode.A3, error.message)
        return app.user = data.user
      }
    )
  },
  {
    name: "auth-plugin",
    dependencies: ["mercurius-plugin"]
  }
)

function authNotRequired(query) {
  return (
    query === "SIGNINUSER" ||
    query === "SIGNUPUSER" ||
    query === "SIGNOUTUSER" ||
    query === "ALLBOOKS" ||
    query === "ALLAUTHORS" ||
    query === "INTROSPECTIONQUERY"
  )
}
