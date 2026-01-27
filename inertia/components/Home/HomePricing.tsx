import { Icon } from '@iconify/react'
import { useState } from 'react'

export const HomePricing = () => {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section
      id="pricing"
      className="py-32 px-6 border-t border-[#E5E5E5] bg-white"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal-on-scroll opacity-0">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0A0A0A] tracking-tight mb-4">
            Simple Pricing
          </h2>
          <p className="text-[#737373] text-base">
            Start for free. Upgrade for history and AI depth.
          </p>

          <div className="mt-8 inline-flex items-center p-1 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg relative">
            <div
              className={`absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-white shadow-sm border border-[#E5E5E5] rounded-md transition-all duration-300 ${isYearly ? 'translate-x-[100%]' : 'translate-x-0'}`}
            ></div>
            <button
              className="relative z-10 px-6 py-2 text-xs font-semibold text-[#0A0A0A] w-24"
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </button>
            <button
              className="relative z-10 px-6 py-2 text-xs font-semibold text-[#737373] w-24"
              onClick={() => setIsYearly(true)}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Hobby */}
          <div
            className="group p-8 rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] hover:border-black/30 hover:shadow-xl transition-all duration-300 reveal-on-scroll opacity-0"
            style={{ animationDelay: '100ms' }}
          >
            <div className="mb-6">
              <span className="font-semibold text-[#0A0A0A] text-lg">
                Hobby
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#0A0A0A]">$0</span>
                <span className="text-sm text-[#737373]">/mo</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3 text-sm text-[#737373]">
                <Icon
                  icon="solar:check-read-linear"
                  className="text-[#0A0A0A]"
                />{' '}
                Connect 1 GitHub Account
              </li>
              <li className="flex gap-3 text-sm text-[#737373]">
                <Icon
                  icon="solar:check-read-linear"
                  className="text-[#0A0A0A]"
                />{' '}
                Connect 1 Google Calendar
              </li>
              <li className="flex gap-3 text-sm text-[#737373]">
                <Icon
                  icon="solar:check-read-linear"
                  className="text-[#0A0A0A]"
                />{' '}
                7-day History
              </li>
            </ul>
            <button className="w-full py-3 rounded-lg border border-[#E5E5E5] bg-white text-sm font-semibold hover:border-[#0A0A0A] transition-colors">
              Get Started
            </button>
          </div>

          {/* Pro */}
          <div
            className="group p-8 rounded-2xl border border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-2xl transition-all duration-300 transform hover:-translate-y-2 reveal-on-scroll opacity-0"
            style={{ animationDelay: '200ms' }}
          >
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white text-lg">Pro</span>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded text-white">
                  RECOMMENDED
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white transition-all duration-300">
                  ${isYearly ? '10' : '12'}
                </span>
                <span className="text-sm text-white/60">/mo</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3 text-sm text-white/80">
                <Icon icon="solar:check-read-linear" className="text-white" />{' '}
                Unlimited Accounts
              </li>
              <li className="flex gap-3 text-sm text-white/80">
                <Icon icon="solar:check-read-linear" className="text-white" />{' '}
                Unlimited History
              </li>
              <li className="flex gap-3 text-sm text-white/80">
                <Icon
                  icon="solar:stars-minimalistic-bold"
                  className="text-amber-400"
                />{' '}
                Advanced AI Summaries
              </li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-white text-[#0A0A0A] text-sm font-semibold hover:bg-gray-100 transition-colors">
              Start Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
