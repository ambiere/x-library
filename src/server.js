import path from 'path'
import AutoLoad from '@fastify/autoload'
import { options } from './config/server.js'
import __dirname from './util/__dirname.js'

const metaURL = import.meta.url

export { options }

export default async function(app, opts) {
  app.register(AutoLoad, {
    dir: path.join(__dirname(metaURL), 'schemas'),
    ignorePattern: /.*(\.js|\.cjs)/i,
    indexPattern: /.*schemas-loader(\.js|\.cjs)$/i
  })

  app.register(AutoLoad, {
    dir: path.join(__dirname(metaURL), 'plugins'),
    options: Object.assign({}, opts)
  })

  app.register(AutoLoad, {
    dir: path.join(__dirname(metaURL), 'routes'),
    ignorePattern: /.*(\.js|\.cjs)/i,
    indexPattern: /.*(root|route-loader)(\.js|\.cjs)$/i
  })
}

