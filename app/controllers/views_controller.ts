import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import GithubService from '#services/github_service'
import { GithubCommitSummary, GithubData } from '../types/data.js'

@inject()
export default class ViewsController {
  constructor(private githubService: GithubService) {}
  async renderHomePage({ inertia }: HttpContext) {
    return inertia.render('home', {})
  }

  async renderDashboardPage({ inertia, auth, session }: HttpContext) {
    const user = auth.user!
    let githubData: GithubData = {}
    const githubConnection = await user
      .related('dataConnections')
      .query()
      .where('provider', 'github')
      .first()

    // Didn't implement Google data fetching yet
    const googleConnection = await user
      .related('dataConnections')
      .query()
      .where('provider', 'google')
      .first()

    if (githubConnection?.accessToken) {
      githubData.repos = await this.githubService.fetchPopularRepos({
        accessToken: githubConnection.accessToken,
        perPage: 5,
      })
      githubData.commitHistory = await this.githubService.fetchCommitHistory({
        accessToken: githubConnection.accessToken,
        repos: githubData.repos,
      })
      githubData.mostCommittedRepo = githubData.commitHistory.repos.reduce(
        (max, repo) => (repo.commitCount > max.commitCount ? repo : max),
        { name: '', commitCount: 0 } as GithubCommitSummary,
      )

      // Count active repositories (those with commits this week)
      githubData.activeReposCount = githubData.commitHistory.repos.filter(
        (repo) => repo.commitCount > 0,
      ).length
    }
    // pass data to ai service. Could also be cache.
    // Doing this the quick way
    if (!session.has('githubData')) {
      session.put('githubData', githubData)
    }

    return inertia.render('dashboard', {
      githubData: {},
    })
  }
}
