import { Icon } from '@iconify/react'

export const HomeHero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 md:px-12 overflow-hidden text-center">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <div className="reveal-on-scroll opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E5E5E5] shadow-sm mb-6 hover:border-black/40 transition-colors cursor-default">
            <Icon
              icon="solar:stars-minimalistic-linear"
              className="text-amber-500"
            />
            <span className="text-[11px] font-medium text-[#737373] tracking-tight">
              AI-Powered Analytics 2.0 is live
            </span>
          </div>
        </div>
        <h1
          className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-[#0A0A0A] leading-[0.95] reveal-on-scroll opacity-0"
          style={{ animationDelay: '100ms' }}
        >
          Your digital pulse, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#737373] to-[#0A0A0A] pb-2">
            summarized.
          </span>
        </h1>
        <p
          className="max-w-xl mx-auto text-base md:text-lg text-[#737373] leading-relaxed reveal-on-scroll opacity-0"
          style={{ animationDelay: '200ms' }}
        >
          Connect your GitHub and Google accounts. Let our neural engine analyze
          your commit history and calendar events to provide actionable
          productivity insights.
        </p>
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 reveal-on-scroll opacity-0"
          style={{ animationDelay: '300ms' }}
        >
          <button className="w-full sm:w-auto px-8 py-3.5 bg-[#0A0A0A] text-white rounded-lg text-sm font-medium shadow-lg shadow-black/20 hover:bg-[#333333] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
            <Icon icon="solar:github-circle-linear" width="18" />
            Connect GitHub
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#0A0A0A] border border-[#E5E5E5] rounded-lg text-sm font-medium shadow-sm hover:border-black/30 hover:shadow-md transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
            <Icon icon="solar:calendar-linear" width="18" />
            Connect Calendar
          </button>
        </div>
      </div>
      <div
        className="mt-20 w-full max-w-5xl relative reveal-on-scroll opacity-0"
        style={{ animationDelay: '300ms' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent z-20 h-full w-full" />
        <div className="rounded-xl p-2 md:p-4 bg-white/50 backdrop-blur-sm border border-[#E5E5E5] shadow-[0_2px_4px_rgba(0,0,0,0.02),0_8px_16px_-4px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">
          <div className="bg-[#FAFAFA] border border-[#E5E5E5]/50 rounded-lg p-6 md:p-10 relative overflow-hidden h-[300px] md:h-[400px] flex items-center justify-center">
            <svg
              className="absolute inset-0 w-full h-full opacity-30"
              preserveAspectRatio="none"
            >
              <path
                d="M0,350 Q400,300 600,200 T1200,100"
                fill="none"
                stroke="#000"
                strokeWidth="1"
                className="path-flow"
              />
              <path
                d="M0,50 Q300,150 600,200 T1200,300"
                fill="none"
                stroke="#000"
                strokeWidth="1"
                className="path-flow"
                style={{ animationDelay: '-5s' }}
              />
            </svg>
            <div className="relative z-10 flex items-center gap-8 md:gap-16">
              <div className="flex flex-col gap-6">
                <div className="w-14 h-14 bg-white border border-[#E5E5E5] rounded-xl shadow-sm flex items-center justify-center animate-bounce duration-[3000ms]">
                  <Icon
                    icon="solar:github-circle-bold"
                    width="32"
                    className="text-[#0A0A0A]"
                  />
                </div>
                <div className="w-14 h-14 bg-white border border-[#E5E5E5] rounded-xl shadow-sm flex items-center justify-center animate-bounce duration-[3000ms] delay-700">
                  <Icon
                    icon="solar:calendar-bold"
                    width="32"
                    className="text-blue-600"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="w-24 h-24 rounded-full border border-dashed border-black/20 flex items-center justify-center animate-[spin_12s_linear_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#0A0A0A] text-white rounded-full flex items-center justify-center shadow-2xl shadow-black/30">
                    <Icon icon="solar:magic-stick-3-linear" width="28" />
                  </div>
                </div>
              </div>
              <div className="w-48 h-32 bg-white border border-[#E5E5E5] rounded-xl shadow-lg p-4 flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded bg-green-50 text-green-600 flex items-center justify-center">
                    <Icon icon="solar:chart-2-linear" width="16" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#0A0A0A] uppercase">
                      Productivity
                    </span>
                    <span className="text-[10px] text-[#737373]">
                      +24% vs last week
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0A0A0A] w-3/4 rounded-full" />
                </div>
                <div className="text-[9px] text-[#737373] leading-tight mt-1">
                  "High commit volume correlated with 4h deep work blocks."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
