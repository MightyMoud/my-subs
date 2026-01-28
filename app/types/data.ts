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

export type GithubData = {
  repos?: GithubRepoSummary[]
  mostCommittedRepo?: GithubCommitSummary
  activeReposCount?: number
  commitHistory?: {
    totalCommits: number
    repos: GithubCommitSummary[]
  }
}
