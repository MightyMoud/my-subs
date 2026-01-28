import { Icon } from '@iconify/react'

type GithubRepoSummary = {
  id: number
  name: string
  fullName: string
  owner: string
  htmlUrl: string
  private: boolean
  updatedAt: string
  pushedAt: string
  langs?: Record<string, number>
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Dockerfile: '#384d54',
  Edge: '#0fa5e9',
}

const calculateLanguagePercentages = (langs?: Record<string, number>) => {
  if (!langs || Object.keys(langs).length === 0) return []

  const total = Object.values(langs).reduce((sum, bytes) => sum + bytes, 0)

  return Object.entries(langs)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: (bytes / total) * 100,
    }))
    .sort((a, b) => b.bytes - a.bytes)
}

export const RepoList = ({ repos }: { repos: GithubRepoSummary[] }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-[#0A0A0A]">Active Repositories</h2>
        <button className="text-xs text-[#737373] hover:text-[#0A0A0A] flex items-center gap-1">
          View all <Icon icon="solar:alt-arrow-right-linear" />
        </button>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]/50 text-xs text-[#737373]">
              <th className="font-medium py-3 px-6">Repository</th>
              <th className="font-medium py-3 px-6">Latest Activity</th>
              <th className="font-medium py-3 px-6 w-48">Languages</th>
              <th className="font-medium py-3 px-6 text-right">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E5]/60">
            {repos.length === 0 && (
              <tr>
                <td
                  className="py-8 px-6 text-center text-sm text-[#737373]"
                  colSpan={5}
                >
                  No repositories yet.
                </td>
              </tr>
            )}
            {repos.map((repo) => {
              const langBreakdown = calculateLanguagePercentages(repo.langs)

              return (
                <tr
                  key={repo.id}
                  className="group hover:bg-[#FAFAFA] transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Icon
                        icon="mdi:github"
                        className="text-[#0A0A0A] text-lg"
                      />
                      <div>
                        <div className="font-medium text-[#0A0A0A]">
                          {repo.name}
                        </div>
                        <div className="text-xs text-[#737373]">
                          {repo.private ? 'private' : 'public'} • {repo.owner}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-xs text-[#0A0A0A]">Last push</div>
                    <div className="text-[10px] text-[#737373]">
                      {new Date(repo.pushedAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-6 w-48">
                    {langBreakdown.length > 0 ? (
                      <div className="space-y-1 max-w-[180px]">
                        <div className="flex h-2 rounded-full overflow-hidden bg-[#E5E5E5]">
                          {langBreakdown.map((lang) => (
                            <div
                              key={lang.name}
                              style={{
                                width: `${lang.percentage}%`,
                                backgroundColor:
                                  languageColors[lang.name] || '#94a3b8',
                              }}
                              title={`${lang.name}: ${lang.percentage.toFixed(1)}%`}
                            />
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {langBreakdown.slice(0, 2).map((lang) => (
                            <span
                              key={lang.name}
                              className="text-[10px] text-[#737373] flex items-center gap-1"
                            >
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    languageColors[lang.name] || '#94a3b8',
                                }}
                              />
                              {lang.name} {lang.percentage.toFixed(0)}%
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-[#737373]">No data</span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 hover:bg-[#E5E5E5] rounded-md text-[#737373] hover:text-[#0A0A0A] transition-colors inline-flex"
                    >
                      <Icon icon="solar:square-top-down-linear" />
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
