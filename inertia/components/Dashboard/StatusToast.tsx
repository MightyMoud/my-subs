import { Icon } from '@iconify/react'

interface StatusToastProps {
  show: boolean
}

export const StatusToast = ({ show }: StatusToastProps) => {
  return (
    <div
      className={`fixed bottom-6 right-6 bg-[#0A0A0A] text-white px-4 py-3 rounded-lg shadow-xl transition-all duration-500 flex items-center gap-3 z-50 ${show ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}
    >
      <Icon
        icon="solar:check-circle-bold"
        className="text-green-400"
        width="20"
        height="20"
      />
      <div>
        <div className="text-sm font-medium">Source Connected</div>
        <div className="text-xs text-white/60">
          Data is syncing in background.
        </div>
      </div>
    </div>
  )
}
