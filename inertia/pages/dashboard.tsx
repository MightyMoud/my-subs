import type { GithubCommitSummary, GithubRepoSummary } from '@/types/data.js'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { AppHeader } from '~/components/Dashboard/AppHeader'
import { ConnectModal } from '~/components/Dashboard/ConnectModal'
import { RepoList } from '~/components/Dashboard/RepoList'
import { SidePanel } from '~/components/Dashboard/SidePanel'
import { Stats } from '~/components/Dashboard/Stats'
import { StatusToast } from '~/components/Dashboard/StatusToast'

const Dashboard = ({
  connectionState,
  githubData,
  user,
}: {
  connectionState: string | null
  user: { firstName: string; lastName: string }
  githubData: {
    repos?: GithubRepoSummary[]
    mostCommittedRepo?: GithubCommitSummary
    activeReposCount?: number
    commitHistory?: {
      totalCommits: number
      repos: GithubCommitSummary[]
    }
  }
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const hasGithubData = Boolean(
    (githubData.repos && githubData.repos.length > 0) ||
      githubData.commitHistory?.totalCommits,
  )

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleConnected = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  useEffect(() => {
    if (connectionState === 'github' || connectionState === 'google') {
      handleConnected()
    }
  }, [connectionState])

  return (
    <div className="flex h-screen overflow-hidden text-sm antialiased font-sans bg-[#FAFAFA] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-white">
      <Head title="Dashboard | MySubscriptions" />

      <SidePanel />

      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        <AppHeader onConnectClick={handleOpenModal} />

        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8 animate-slide-up">
          {hasGithubData ? (
            <>
              <Stats
                totalCommits={githubData.commitHistory?.totalCommits || 0}
                mostCommittedRepo={githubData.mostCommittedRepo}
                activeReposCount={githubData.activeReposCount || 0}
                userName={`${user.firstName} ${user.lastName}`}
              />
              <RepoList repos={githubData.repos!} />
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#E5E5E5] bg-white p-10 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <span className="text-xl">🔗</span>
              </div>
              <h2 className="text-lg font-semibold text-[#0A0A0A]">
                Connect a data source to get started
              </h2>
              <p className="mt-2 text-sm text-[#737373]">
                You haven’t connected GitHub yet. Connect now to see your repo
                activity, commit insights, and AI summaries.
              </p>
              <button
                onClick={handleOpenModal}
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
              >
                Connect A Datasource
              </button>
            </div>
          )}
        </div>
      </main>

      <ConnectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConnected={handleConnected}
      />

      <StatusToast show={showToast} />
    </div>
  )
}

export default Dashboard
