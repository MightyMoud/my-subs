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

const Dashboard = ({ session }: { session: Record<string, string> }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [connections, setConnections] = useState<
    Array<{ provider: string; connectedAt: string }>
  >([])
  const [repos, setRepos] = useState<GithubRepoSummary[]>([])

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleConnected = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  useEffect(() => {
    if (
      session?.justConnected === 'github' ||
      session?.justConnected === 'google'
    ) {
      handleConnected()
    }
  }, [session])

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch('/api/connections')
        const data = await response.json()
        setConnections(data)
      } catch (error) {
        console.error('Failed to fetch connections', error)
      }
    }

    fetchConnections()
  }, [])

  useEffect(() => {
    const hasGithub = connections.some(
      (connection) => connection.provider === 'github',
    )

    if (!hasGithub) return

    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/github/repos')
        const data = await response.json()
        setRepos(data)
      } catch (error) {
        console.error('Failed to fetch GitHub repos', error)
      }
    }

    fetchRepos()
  }, [connections])

  return (
    <div className="flex h-screen overflow-hidden text-sm antialiased font-sans bg-[#FAFAFA] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-white">
      <Head title="Dashboard | MySubscriptions" />

      <SidePanel />

      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        <AppHeader onConnectClick={handleOpenModal} />

        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8 animate-slide-up">
          <Stats />
          <RepoList repos={repos} />
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
