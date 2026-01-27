import { Icon } from '@iconify/react'
import { Link } from '@inertiajs/react'

export const HomeFooter = () => {
  return (
    <footer className="bg-white py-12 px-6 border-t border-[#E5E5E5] relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-6 h-6 bg-[#0A0A0A] rounded-md flex items-center justify-center text-white text-[10px]">
            <Icon icon="solar:graph-new-up-linear" />
          </div>
          <span className="font-bold text-sm text-[#0A0A0A]">
            MySubscriptions
          </span>
        </Link>
        <div className="text-xs text-[#737373] flex gap-4">
          <span>© 2024 MySubscriptions Inc. All rights reserved.</span>
          <Link
            href="/privacy-policy"
            className="hover:text-[#0A0A0A] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-conditions"
            className="hover:text-[#0A0A0A] transition-colors"
          >
            Terms of Service
          </Link>
        </div>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-[#737373] hover:text-[#0A0A0A] transition-colors"
          >
            <Icon icon="mdi:twitter" width="20" />
          </a>
          <a
            href="#"
            className="text-[#737373] hover:text-[#0A0A0A] transition-colors"
          >
            <Icon icon="mdi:github" width="20" />
          </a>
        </div>
      </div>
    </footer>
  )
}
