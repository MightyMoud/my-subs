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
              <th className="font-medium py-3 px-6">Status</th>
              <th className="font-medium py-3 px-6">Latest Activity</th>
              <th className="font-medium py-3 px-6">AI Insight</th>
              <th className="font-medium py-3 px-6 text-right">Action</th>
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
            {repos.map((repo) => (
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
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-200 bg-green-50 text-xs font-medium text-green-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></div>
                    Active
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="text-xs text-[#0A0A0A]">Last push</div>
                  <div className="text-[10px] text-[#737373]">
                    {new Date(repo.pushedAt).toLocaleString()}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-xs text-[#737373]">
                    <Icon
                      icon="solar:stars-minimalistic-linear"
                      className="text-amber-500"
                    />
                    Activity trending up.
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 hover:bg-[#E5E5E5] rounded-md text-[#737373] hover:text-[#0A0A0A] transition-colors inline-flex"
                  >
                    <Icon icon="solar:menu-dots-bold" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
