import { GithubCommitSummary } from '@/types/data'
import { Icon } from '@iconify/react'
import { useCallback, useEffect, useState } from 'react'
import Markdown from 'react-markdown'

export const Stats = ({
  totalCommits,
  mostCommittedRepo,
  activeReposCount,
  userName,
}: {
  totalCommits: number
  mostCommittedRepo?: GithubCommitSummary
  activeReposCount: number
  userName: string
}) => {
  const [aiSummary, setAiSummary] = useState<string>('Loading AI insights...')
  const [isLoading, setIsLoading] = useState(true)

  const fetchAiSummary = async (regen: boolean = false) => {
    setIsLoading(true)
    try {
      const url = regen ? '/api/ai/summary?regen=true' : '/api/ai/summary'
      const response = await fetch(url, {
        credentials: 'include',
      })
      const data = await response.json()
      setAiSummary(data.commentary)
    } catch (error) {
      console.error('Failed to fetch AI summary', error)
      setAiSummary('Unable to generate AI insights at this time.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAiSummary()
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <section className="space-y-6">
      {/* Welcome Card */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-[#0A0A0A] tracking-tight">
          {getGreeting()}, {userName}.
        </h1>
        <p className="text-[#737373] mt-1">
          Here's what's happening across your repositories today.
        </p>
      </div>

      {/* AI Insight Box */}
      <div className="relative overflow-hidden rounded-xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-200">
            <Icon icon="solar:magic-stick-3-bold" width="20" height="20" />
          </div>
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[#0A0A0A]">
                  Weekly Synthesis
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wide">
                  AI Generated
                </span>
              </div>
              <button
                onClick={() => fetchAiSummary(true)}
                disabled={isLoading}
                className="text-indigo-600 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Regenerate summary"
              >
                <Icon icon="solar:refresh-bold" width="18" height="18" />
              </button>
            </div>
            {isLoading ? (
              <div className="flex items-center gap-2 text-[#737373]">
                <Icon icon="svg-spinners:ring-resize" width="16" height="16" />
                <span className="text-sm">Generating insights...</span>
              </div>
            ) : (
              <div className="text-[#737373] leading-relaxed prose prose-sm max-w-none prose-p:my-2 prose-code:text-xs prose-code:bg-white prose-code:border prose-code:border-[#E5E5E5] prose-code:px-1 prose-code:rounded prose-code:font-mono">
                <Markdown>{aiSummary}</Markdown>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-5 rounded-xl shadow-sm hover:border-[#0A0A0A]/20 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center text-[#737373]">
              <Icon icon="solar:code-bold-duotone" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0A0A0A] tracking-tight">
            {totalCommits}
          </div>
          <div className="text-xs text-[#737373] mt-1">Commits this week</div>
        </div>
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-5 rounded-xl shadow-sm hover:border-[#0A0A0A]/20 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center text-[#737373]">
              <Icon icon="solar:fire-bold-duotone" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0A0A0A] tracking-tight truncate">
            {mostCommittedRepo ? mostCommittedRepo.name : 'N/A'}
          </div>
          <div className="text-xs text-[#737373] mt-1">
            Most active repo
            {mostCommittedRepo
              ? ` (${mostCommittedRepo.commitCount} commits)`
              : ''}
          </div>
        </div>
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-5 rounded-xl shadow-sm hover:border-[#0A0A0A]/20 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center text-[#737373]">
              <Icon icon="solar:folder-with-files-bold-duotone" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#0A0A0A] tracking-tight">
            {activeReposCount}
          </div>
          <div className="text-xs text-[#737373] mt-1">Active repositories</div>
        </div>
      </div>
    </section>
  )
}
