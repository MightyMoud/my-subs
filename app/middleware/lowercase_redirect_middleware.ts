import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class LowercaseRedirectMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    const originalUrl = request.url()

    if (/[A-Z]/.test(originalUrl)) {
      const lowercaseUrl = originalUrl.toLowerCase()
      return response.redirect('' + lowercaseUrl, true, 301) // 301 Redirect
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
