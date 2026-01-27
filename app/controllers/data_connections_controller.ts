import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import GithubService from '#services/github_service'

@inject()
export default class DataConnectionsController {
  constructor(private githubService: GithubService) {}

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

  public async getGithubRepos({ auth, response }: HttpContext) {
    const user = auth.user!
    const githubConnection = await user
      .related('dataConnections')
      .query()
      .where('provider', 'github')
      .first()

    if (!githubConnection?.accessToken) {
      return response.notFound({ message: 'GitHub connection not found' })
    }

    const repos = await this.githubService.fetchPopularRepos({
      accessToken: githubConnection.accessToken,
      perPage: 5,
    })

    return repos
  }

  public async getGithubCommitHistory({ auth, response }: HttpContext) {
    const user = auth.user!
    const githubConnection = await user
      .related('dataConnections')
      .query()
      .where('provider', 'github')
      .first()

    if (!githubConnection?.accessToken) {
      return response.notFound({ message: 'GitHub connection not found' })
    }

    const username = await this.fetchGithubUsername(
      githubConnection.accessToken,
    )

    const repos = await this.githubService.fetchPopularRepos({
      accessToken: githubConnection.accessToken,
      perPage: 5,
    })

    const commitHistory = await this.githubService.fetchCommitHistory({
      accessToken: githubConnection.accessToken,
      username,
      repos: repos.map((repo) => ({ owner: repo.owner, name: repo.name })),
      perRepoLimit: 100,
    })

    return commitHistory
  }

  private async fetchGithubUsername(accessToken: string): Promise<string> {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${accessToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })

    if (!response.ok) {
      const body = await response.text()
      throw new Error(`GitHub API error (${response.status}): ${body}`)
    }

    const data = (await response.json()) as { login?: string }
    if (!data.login) {
      throw new Error('GitHub username not found')
    }

    return data.login
  }
}
