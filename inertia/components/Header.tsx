import { Icon } from '@iconify/react'
import { Link } from '@inertiajs/react'

export const HomeHeader = () => {
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
      </div>
    </header>
  )
}
