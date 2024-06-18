export default async function(app, opts) {
  app.get('/', {
    handler: async function(request, reply) {
      return { root: true }
    }
  })
}
