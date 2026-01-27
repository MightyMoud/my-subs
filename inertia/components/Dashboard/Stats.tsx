import { Icon } from '@iconify/react'

export const Stats = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Welcome Card */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[#0A0A0A] tracking-tight">
            Good morning, Alex.
          </h1>
          <p className="text-[#737373] mt-1">
            Here's what's happening across your repositories today.
          </p>
        </div>

        {/* AI Insight Box */}
        <div className="relative overflow-hidden rounded-xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 shadow-sm p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-200">
              <Icon icon="solar:magic-stick-3-bold" width="20" height="20" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[#0A0A0A]">
                  Daily Synthesis
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wide">
                  AI Generated
                </span>
              </div>
              <p className="text-[#737373] leading-relaxed">
                You've maintained a high velocity this week. High commit volume
                detected in{' '}
                <span className="font-mono text-xs bg-white border border-[#E5E5E5] px-1 rounded">
                  frontend-v2
                </span>{' '}
                correlated with your "Deep Work" calendar block on Tuesday.
                Warning: Context switching increased by 15% yesterday due to 4
                overlapping meetings.
              </p>
              <div className="flex gap-3 pt-2">
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
                  View detailed breakdown{' '}
                  <Icon icon="solar:arrow-right-linear" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-5 rounded-xl shadow-sm hover:border-[#0A0A0A]/20 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center text-[#737373]">
              <Icon icon="solar:git-commit-linear" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +12%
            </span>
          </div>
          <div className="text-2xl font-bold text-[#0A0A0A] tracking-tight">
            48
          </div>
          <div className="text-xs text-[#737373] mt-1">Commits this week</div>
        </div>
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-5 rounded-xl shadow-sm hover:border-[#0A0A0A]/20 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center text-[#737373]">
              <Icon icon="solar:clock-circle-linear" />
            </div>
            <span className="text-xs font-medium text-[#737373] bg-[#FAFAFA] px-2 py-1 rounded-full">
              Avg
            </span>
          </div>
          <div className="text-2xl font-bold text-[#0A0A0A] tracking-tight">
            4h 12m
          </div>
          <div className="text-xs text-[#737373] mt-1">Focus time / day</div>
        </div>
      </div>
    </section>
  )
}
