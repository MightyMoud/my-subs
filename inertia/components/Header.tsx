import { Icon } from '@iconify/react'
import { Link, usePage } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'

export const HomeHeader = () => {
  const { user } = usePage<{ user: any }>().props
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 md:px-12 flex justify-between items-center glass-panel transition-all duration-300 reveal-on-scroll">
      <Link
        href="/"
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-[#0A0A0A] text-white flex items-center justify-center rounded-lg shadow-lg shadow-black/20">
          <Icon icon="solar:graph-new-up-linear" width="18" height="18" />
        </div>
        <span className="text-sm font-bold tracking-tight text-[#0A0A0A]">
          MySubscriptions
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        <a
          href="/#features"
          className="text-xs font-medium text-[#737373] hover:text-[#0A0A0A] transition-colors"
        >
          Integrations
        </a>
        <a
          href="/#how-it-works"
          className="text-xs font-medium text-[#737373] hover:text-[#0A0A0A] transition-colors"
        >
          How it Works
        </a>
        <a
          href="/#pricing"
          className="text-xs font-medium text-[#737373] hover:text-[#0A0A0A] transition-colors"
        >
          Pricing
        </a>
      </nav>
      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
            >
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-[10px] font-bold text-[#0A0A0A]">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-[9px] text-[#737373]">{user.email}</span>
              </div>
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-8 h-8 rounded-full border border-[#E5E5E5] object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-[10px] font-bold border border-[#E5E5E5]">
                  {user.firstName?.[0] || user.email?.[0]?.toUpperCase()}
                  {user.lastName?.[0] || ''}
                </div>
              )}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E5E5] rounded-xl shadow-xl py-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#737373] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Icon icon="solar:widget-linear" width="16" />
                  Dashboard
                </Link>
                <div className="h-[1px] bg-[#E5E5E5] my-1 mx-2" />
                <Link
                  href="/api/auth/logout"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Icon icon="solar:logout-linear" width="16" />
                  Log out
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="hidden md:block text-xs font-medium text-[#737373] hover:text-[#0A0A0A] transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/login"
              className="group relative overflow-hidden bg-[#0A0A0A] text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-md transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Connect Account
                <Icon icon="solar:arrow-right-linear" width="14" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
