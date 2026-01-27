import { Icon } from '@iconify/react'

interface HeaderProps {
  onConnectClick: () => void
}

export const AppHeader = ({ onConnectClick }: HeaderProps) => {
  return (
    <header className="h-16 flex items-center justify-between px-6 md:px-10 border-b border-[#E5E5E5]/60 bg-[#FAFAFA]/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-2 text-[#737373]">
        <Icon icon="solar:home-smile-linear" />
        <span className="text-[#E5E5E5]">/</span>
        <span className="font-medium text-[#0A0A0A]">Overview</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#E5E5E5] bg-white text-xs font-medium text-[#737373] hover:text-[#0A0A0A] transition-colors">
          <Icon icon="solar:calendar-linear" />
          Last 7 Days
        </button>
        <button
          onClick={onConnectClick}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A0A0A] text-white text-xs font-semibold shadow-sm hover:bg-neutral-800 active:scale-95 transition-all"
        >
          <Icon icon="solar:add-circle-linear" width="16" height="16" />
          Connect Data Source
        </button>
      </div>
    </header>
  )
}
