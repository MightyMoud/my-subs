import type { HttpContext } from '@adonisjs/core/http'

export default class ViewsController {
  async renderHomePage({ inertia }: HttpContext) {
    return inertia.render('home', {})
  }
}
