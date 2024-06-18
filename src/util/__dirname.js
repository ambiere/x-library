import path from 'path'
import { fileURLToPath } from 'url'

export default function dirname(metaURL) {
  return path.dirname(fileURLToPath(metaURL))
}

