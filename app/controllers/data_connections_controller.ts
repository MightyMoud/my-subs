import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DataConnectionsController {
  constructor() {}

  // unused for now. Switched to SSR instead.
  // Leaving here for future expansion.
  public async getUserConnections({ auth }: HttpContext) {
    const user = auth.user!
    const connections = await user.related('dataConnections').query()
    return connections.map((connection) => ({
      provider: connection.provider,
      connectedAt: connection.createdAt,
    }))
  }

  public async connectGoogle({ ally, session }: HttpContext) {
    const google = ally.use('google')
    session.put('is_connecting', 'google')

    return google.redirect((request) => {
      request
        .clearScopes()
        .scopes(['https://www.googleapis.com/auth/calendar.events.readonly'])
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
