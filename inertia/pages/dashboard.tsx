import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { AppHeader } from '~/components/Dashboard/AppHeader'
import { ConnectModal } from '~/components/Dashboard/ConnectModal'
import { RepoList } from '~/components/Dashboard/RepoList'
import { SidePanel } from '~/components/Dashboard/SidePanel'
import { Stats } from '~/components/Dashboard/Stats'
import { StatusToast } from '~/components/Dashboard/StatusToast'

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

type GithubCommitSummary = {
  name: string
  commitCount: number
  latestCommitSha?: string
  latestCommitAt?: string
}

const Dashboard = ({
  connectionState,
  githubData,
}: {
  connectionState: string | null
  githubData: {
    repos?: GithubRepoSummary[]
    mostCommittedRepo?: GithubCommitSummary
    commitHistory?: {
      totalCommits: number
      repos: GithubCommitSummary[]
    }
  }
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)

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
          <Stats
            totalCommits={githubData.commitHistory?.totalCommits || 0}
            mostCommittedRepo={githubData.mostCommittedRepo}
          />
          <RepoList repos={githubData.repos!} />
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
