import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { pinoHttp } from 'pino-http'
import { v4 as uuid } from 'uuid'
import env from '#start/env'

const logger = pinoHttp({
  level: 'info',
  genReqId: function (req, res) {
    const existingID = req.id ?? req.headers['x-request-id']
    if (existingID) return existingID
    const id = uuid()
    res.setHeader('X-Request-Id', id)
    return id
  },
})

export default class PinoHttpMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    env.get('NODE_ENV') === 'production' &&
      logger(request.request, response.response)

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
