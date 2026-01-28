import { inject } from '@adonisjs/core'

export type GithubRepoRef = {
  owner: string
  name: string
}

export type GithubRepoRaw = {
  id: number
  name: string
  full_name: string
  owner: { login: string }
  html_url: string
  private: boolean
  updated_at: string
  pushed_at: string
  languages_url: string
}

export type GithubRepoSummary = {
  id: number
  name: string
  fullName: string
  owner: string
  htmlUrl: string
  private: boolean
  updatedAt: string
  pushedAt: string
  langs?: unknown
}

export type GithubCommitAuthor = {
  date?: string
}

export type GithubCommitData = {
  author?: GithubCommitAuthor
}

export type GithubCommitRaw = {
  sha: string
  commit: GithubCommitData
}

export type GithubCommitSummary = {
  name: string
  commitCount: number
  latestCommitSha?: string
  latestCommitAt?: string
}

@inject()
export default class GithubService {
  private apiBase = 'https://api.github.com'

  private async request<T>(
    path: string,
    accessToken: string,
    params?: Record<string, string>,
  ): Promise<T> {
    const url = new URL(`${this.apiBase}${path}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.set(key, value),
      )
    }

    const response = await fetch(url.toString(), {
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

    return (await response.json()) as T
  }

  public async fetchPopularRepos(options: {
    accessToken: string
    perPage?: number
  }): Promise<GithubRepoSummary[]> {
    const perPage = options.perPage ?? 5

    const path = '/user/repos'

    const repos = await this.request<GithubRepoRaw[]>(
      path,
      options.accessToken,
      {
        sort: 'pushed',
        direction: 'desc',
        per_page: `${perPage}`,
        affiliation: 'owner',
      },
    )

    return Promise.all(
      repos.map(async (repo) => {
        const repoLangs = await fetch(repo.languages_url, {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${options.accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
          .then((res) => res.json())
          .catch((err) => {
            console.error('Failed to fetch repo languages', err)
            return {}
          })
        return {
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          owner: repo.owner.login,
          htmlUrl: repo.html_url,
          private: repo.private,
          updatedAt: repo.updated_at,
          pushedAt: repo.pushed_at,
          langs: repoLangs,
        }
      }),
    )
  }

  public async fetchCommitHistory(options: {
    accessToken: string
    repos: GithubRepoSummary[]
    perRepoLimit?: number
  }): Promise<{ totalCommits: number; repos: GithubCommitSummary[] }> {
    const perRepoLimit = options.perRepoLimit ?? 100
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const results = await Promise.all(
      options.repos.map(async (repo) => {
        const commits = await this.request<GithubCommitRaw[]>(
          `/repos/${repo.owner}/${repo.name}/commits`,
          options.accessToken,
          {
            per_page: `${perRepoLimit}`,
            since: sevenDaysAgo.toISOString(),
          },
        )

        return {
          name: repo.name,
          commitCount: commits.length,
          latestCommitSha: commits[0]?.sha,
          latestCommitAt: commits[0]?.commit?.author?.date,
        } satisfies GithubCommitSummary
      }),
    )

    return {
      totalCommits: results.reduce((sum, repo) => sum + repo.commitCount, 0),
      repos: results,
    }
  }
}
