import { Icon } from '@iconify/react'
import { useState } from 'react'

interface ConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnected: () => void
}

export const ConnectModal = ({
  isOpen,
  onClose,
  onConnected,
}: ConnectModalProps) => {
  const [modalStep, setModalStep] = useState(1)
  const [selectedSource, setSelectedSource] = useState('github') // 'github' or 'google'
  const [isSyncing, setIsSyncing] = useState(false)

  if (!isOpen) return null

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source)
    setTimeout(() => setModalStep(2), 100)
  }

  const handleBack = () => {
    setModalStep(1)
  }

  const handleConnect = () => {
    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)
      onClose()
      onConnected()
      // Reset step for next time
      setModalStep(1)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0A0A0A]/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white border border-[#E5E5E5] shadow-2xl rounded-2xl p-0 overflow-hidden animate-slide-up">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex justify-between items-center bg-[#FAFAFA]/30">
          <h3 className="font-semibold text-[#0A0A0A]">Connect Source</h3>
          <button
            onClick={onClose}
            className="text-[#737373] hover:text-[#0A0A0A] transition-colors"
          >
            <Icon icon="solar:close-circle-linear" width="20" height="20" />
          </button>
        </div>

        {/* Step 1: Selection */}
        {modalStep === 1 && (
          <div className="p-6 animate-fade-in">
            <p className="text-sm text-[#737373] mb-4">
              Select a provider to import your data history.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSourceSelect('github')}
                className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#0A0A0A]/30 hover:bg-white transition-all duration-200 hover:shadow-md"
              >
                <Icon
                  icon="mdi:github"
                  width="32"
                  height="32"
                  className="text-[#0A0A0A] group-hover:scale-110 transition-transform"
                />
                <span className="text-sm font-medium text-[#0A0A0A]">
                  GitHub
                </span>
              </button>
              <button
                onClick={() => handleSourceSelect('google')}
                className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#0A0A0A]/30 hover:bg-white transition-all duration-200 hover:shadow-md"
              >
                <Icon
                  icon="mdi:google"
                  width="32"
                  height="32"
                  className="text-blue-500 group-hover:scale-110 transition-transform"
                />
                <span className="text-sm font-medium text-[#0A0A0A]">
                  Google
                </span>
              </button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-[#737373]">
              <Icon icon="solar:shield-check-linear" />
              <span>SOC2 Compliant & Encrypted</span>
            </div>
          </div>
        )}

        {/* Step 2: Permissions */}
        {modalStep === 2 && (
          <div className="p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleBack}
                className="text-[#737373] hover:text-[#0A0A0A]"
              >
                <Icon icon="solar:arrow-left-linear" width="20" height="20" />
              </button>
              <div className="flex items-center gap-2">
                <Icon
                  icon={
                    selectedSource === 'github' ? 'mdi:github' : 'mdi:google'
                  }
                  width="20"
                  height="20"
                  className={
                    selectedSource === 'github'
                      ? 'text-[#0A0A0A]'
                      : 'text-blue-500'
                  }
                />
                <span className="font-medium text-[#0A0A0A]">
                  Configure Access
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <label className="custom-checkbox flex items-start gap-3 p-3 rounded-lg border border-[#E5E5E5] cursor-pointer hover:bg-[#FAFAFA] transition-colors">
                <input type="checkbox" defaultChecked className="hidden" />
                <div className="w-5 h-5 rounded border border-[#E5E5E5] bg-white flex items-center justify-center mt-0.5 transition-colors">
                  <svg
                    className="w-3 h-3 text-white hidden"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#0A0A0A]">
                    Read Repositories
                  </div>
                  <div className="text-xs text-[#737373]">
                    Required for commit analysis.
                  </div>
                </div>
              </label>

              <label className="custom-checkbox flex items-start gap-3 p-3 rounded-lg border border-[#E5E5E5] cursor-pointer hover:bg-[#FAFAFA] transition-colors">
                <input type="checkbox" defaultChecked className="hidden" />
                <div className="w-5 h-5 rounded border border-[#E5E5E5] bg-white flex items-center justify-center mt-0.5 transition-colors">
                  <svg
                    className="w-3 h-3 text-white hidden"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#0A0A0A]">
                    Read User Profile
                  </div>
                  <div className="text-xs text-[#737373]">
                    To identify your contributions.
                  </div>
                </div>
              </label>

              <label className="custom-checkbox flex items-start gap-3 p-3 rounded-lg border border-[#E5E5E5] cursor-pointer hover:bg-[#FAFAFA] transition-colors">
                <input type="checkbox" className="hidden" />
                <div className="w-5 h-5 rounded border border-[#E5E5E5] bg-white flex items-center justify-center mt-0.5 transition-colors">
                  <svg
                    className="w-3 h-3 text-white hidden"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#0A0A0A]">
                    Write Access (Optional)
                  </div>
                  <div className="text-xs text-[#737373]">
                    Allow auto-tagging issues.
                  </div>
                </div>
              </label>
            </div>

            <button
              onClick={handleConnect}
              className="w-full py-2.5 rounded-lg bg-[#0A0A0A] text-white text-sm font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>{isSyncing ? 'Syncing...' : 'Authorize & Connect'}</span>
              <Icon
                icon={
                  isSyncing
                    ? 'svg-spinners:ring-resize'
                    : 'solar:link-circle-linear'
                }
                width="18"
                height="18"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
