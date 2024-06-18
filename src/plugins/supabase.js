import plugin from 'fastify-plugin'
import { createServerClient } from '@supabase/ssr'
import { setCookie, clearCookie } from '../util/setCookie.js'

export default plugin(
  async function(app) {
    app.decorate("supabase",
      function supabaseClient(context) {
        return createServerClient(
          app.env.SUPABASE_URL,
          app.env.ANON_KEY,
          {
            cookies: {
              get: (key) => {
                const cookies = context.request.cookies
                const cookie = cookies[key] ?? ""
                return cookie
              },
              set: (key, value, options) => {
                setCookie({
                  context,
                  key,
                  value,
                  options: {
                    ...options,
                    sameSite: "lax",
                    httpOnly: true,
                    maxAge: "31536000"
                  }
                })
              },
              remove: (key, options) => {
                clearCookie({
                  context,
                  key,
                  options: {
                    ...options,
                    httpOnly: true,
                  }
                })
              }
            }
          }
        )
      }
    )
  },
  {
    name: "supabase-client",
    dependencies: ['application-config']
  }
)
