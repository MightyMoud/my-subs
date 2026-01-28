import { Icon } from '@iconify/react'

interface ConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConnected: () => void
}

export const ConnectModal = ({ isOpen, onClose }: ConnectModalProps) => {
  if (!isOpen) return null

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

        <div className="p-6 animate-fade-in">
          <p className="text-sm text-[#737373] mb-4">
            Select a provider to import your data history.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/api/connect/github"
              className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#0A0A0A]/30 hover:bg-white transition-all duration-200 hover:shadow-md"
            >
              <Icon
                icon="mdi:github"
                width="32"
                height="32"
                className="text-[#0A0A0A] group-hover:scale-110 transition-transform"
              />
              <span className="text-sm font-medium text-[#0A0A0A]">GitHub</span>
            </a>
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] opacity-60 cursor-not-allowed"
            >
              <Icon
                icon="mdi:google"
                width="32"
                height="32"
                className="text-blue-500"
              />
              <span className="text-sm font-medium text-[#0A0A0A]">Google</span>
            </button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-[#737373]">
            <Icon icon="solar:shield-check-linear" />
            <span>SOC2 Compliant & Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  )
}
