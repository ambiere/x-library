import crypto from 'node:crypto'
import loggerOpts from './logger.js'

export const options = {
  disableRequestLogging: true,
  logger: loggerOpts,
  requestIdLogLabel: 'requestId',
  requestIdHeader: 'x-request-id',
  genReqId(req) {
    return req.headers['x-amz-request-id'] || crypto.randomUUID()
  },
  ajv: {
    customOptions: {
      coerceTypes: 'array',
      removeAdditional: 'all'
    }
  }
}
