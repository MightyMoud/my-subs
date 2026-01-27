import { Icon } from '@iconify/react'
import { Link, usePage } from '@inertiajs/react'

export const SidePanel = () => {
  const { user } = usePage<{ user: any }>().props

  return (
    <aside className="w-64 bg-[#FFFFFF] border-r border-[#E5E5E5] flex flex-col justify-between z-20 hidden md:flex">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-[#E5E5E5]/50">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6 bg-[#0A0A0A] text-white flex items-center justify-center rounded-md shadow-sm">
              <Icon icon="solar:graph-new-up-linear" width="14" height="14" />
            </div>
            <span className="font-display font-bold text-[#0A0A0A] tracking-tight">
              MySubscriptions
            </span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#FAFAFA] text-[#0A0A0A] font-medium border border-[#E5E5E5]/50"
          >
            <Icon icon="solar:widget-2-linear" width="18" height="18" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#737373] hover:text-[#0A0A0A] hover:bg-[#FAFAFA] transition-colors"
          >
            <Icon icon="solar:chart-square-linear" width="18" height="18" />
            Analytics
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#737373] hover:text-[#0A0A0A] hover:bg-[#FAFAFA] transition-colors"
          >
            <Icon icon="solar:history-linear" width="18" height="18" />
            History
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#737373] hover:text-[#0A0A0A] hover:bg-[#FAFAFA] transition-colors"
          >
            <Icon
              icon="solar:users-group-rounded-linear"
              width="18"
              height="18"
            />
            Team
          </a>
        </nav>

        <div className="px-6 py-4">
          <div className="text-[10px] uppercase font-semibold text-[#737373]/80 tracking-wider mb-3">
            Connected Sources
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-[#737373] group-hover:text-[#0A0A0A] transition-colors">
                  GitHub
                </span>
              </div>
              <Icon
                icon="solar:settings-linear"
                className="text-[#737373]/50 hover:text-[#0A0A0A] opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <span className="text-[#737373] group-hover:text-[#0A0A0A] transition-colors">
                  Google Calendar
                </span>
              </div>
              <Icon
                icon="solar:settings-linear"
                className="text-[#737373]/50 hover:text-[#0A0A0A] opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[#E5E5E5]/50 flex flex-col gap-2">
        <div className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-[#737373]">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-8 h-8 rounded-full border border-[#E5E5E5] object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-[10px] font-bold border border-[#E5E5E5]">
              {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase()}
              {user?.lastName?.[0] || ''}
            </div>
          )}
          <div className="flex flex-col items-start overflow-hidden">
            <span className="text-xs font-medium text-[#0A0A0A] truncate w-full">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-[10px] text-[#737373] truncate w-full">
              {user?.email}
            </span>
          </div>
        </div>

        <Link
          href="/api/auth/logout"
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Icon icon="solar:logout-linear" width="16" />
          Log out
        </Link>
      </div>
    </aside>
  )
}
