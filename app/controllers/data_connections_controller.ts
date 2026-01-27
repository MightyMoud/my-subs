import type { HttpContext } from '@adonisjs/core/http'

export default class DataConnectionsController {
  public async connectGoogle({ ally, session }: HttpContext) {
    const google = ally.use('google')
    session.put('is_connecting', 'google')
    console.log('Redirecting to Google for connection...')

    return google.redirect((request) => {
      request.scopes(['calendar.events.readonly'])
    })
  }

  public async connectGithub({ ally, session }: HttpContext) {
    const github = ally.use('github')
    session.put('is_connecting', 'github')

    return github.redirect((request) => {
      request.scopes(['read:user', 'repo'])
    })
  }
}
