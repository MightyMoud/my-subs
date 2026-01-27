import { Icon } from '@iconify/react'

export const HomeFeatures = () => {
  return (
    <section
      id="features"
      className="py-32 px-6 md:px-12 lg:px-20 bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 max-w-2xl reveal-on-scroll opacity-0">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#0A0A0A] tracking-tight mb-6">
            The Developer's <br />
            <span className="text-[#737373]">Control Center.</span>
          </h2>
          <p className="text-[#737373] text-lg leading-relaxed">
            Merge your coding activity with your meeting schedule. See the true
            cost of context switching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Commit Heatmap + Calendar */}
          <div
            className="md:col-span-8 group relative bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden hover:border-black/30 transition-all duration-500 reveal-on-scroll opacity-0"
            style={{ animationDelay: '100ms' }}
          >
            <div className="p-8 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg flex items-center justify-center text-[#0A0A0A]">
                  <Icon icon="solar:git-commit-linear" width="20" />
                </div>
                <h3 className="text-xl font-semibold text-[#0A0A0A]">
                  Unified Timeline
                </h3>
              </div>

              <div className="mt-auto border border-[#E5E5E5]/50 rounded-lg p-6 bg-[#FAFAFA]/30 relative overflow-hidden">
                <div className="flex items-end justify-between gap-1 h-32 w-full">
                  <div className="w-full bg-black/10 rounded-sm h-[40%] group-hover:h-[60%] transition-all duration-700"></div>
                  <div className="w-full bg-black/10 rounded-sm h-[70%] group-hover:h-[50%] transition-all duration-700 delay-75"></div>
                  <div className="w-full bg-black/80 rounded-sm h-[90%] transition-all duration-700 delay-100 relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      12 Commits
                    </div>
                  </div>
                  <div className="w-full bg-black/10 rounded-sm h-[30%] group-hover:h-[40%] transition-all duration-700 delay-150"></div>
                  <div className="w-full bg-blue-500/20 rounded-sm h-[80%] border border-blue-500/50 group-hover:h-[85%] transition-all duration-700 delay-200 relative">
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-blue-500/10"></div>
                  </div>
                  <div className="w-full bg-black/10 rounded-sm h-[50%] transition-all duration-700 delay-250"></div>
                  <div className="w-full bg-black/10 rounded-sm h-[20%] transition-all duration-700 delay-300"></div>
                </div>
                <div className="mt-4 flex justify-between text-[10px] text-[#737373] font-mono uppercase">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Focus Score */}
          <div
            className="md:col-span-4 group relative bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden hover:border-black/30 transition-all duration-500 reveal-on-scroll opacity-0"
            style={{ animationDelay: '200ms' }}
          >
            <div className="p-8 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg flex items-center justify-center text-[#0A0A0A]">
                  <Icon icon="solar:target-linear" width="20" />
                </div>
                <h3 className="text-xl font-semibold text-[#0A0A0A]">
                  Focus Score
                </h3>
              </div>

              <div className="flex-1 flex items-center justify-center relative">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#E5E5E5"
                    strokeWidth="8"
                    fill="transparent"
                  ></circle>
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#000"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="440"
                    strokeDashoffset="440"
                    className="group-hover:stroke-dashoffset-[110] transition-all duration-[1500ms] ease-out"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-[#0A0A0A]">75</span>
                  <span className="text-xs text-[#737373] font-medium uppercase tracking-wide">
                    Good
                  </span>
                </div>
              </div>
              <p className="text-center text-xs text-[#737373] mt-4">
                4.5 hrs of uninterrupted time today.
              </p>
            </div>
          </div>

          {/* Card 3: AI Summary */}
          <div
            className="md:col-span-12 group relative bg-[#0A0A0A] text-white border border-[#0A0A0A] rounded-2xl overflow-hidden reveal-on-scroll opacity-0"
            style={{ animationDelay: '300ms' }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-800 to-transparent opacity-50"></div>
            <div className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 max-w-lg space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-xs font-medium text-amber-300">
                  <Icon icon="solar:stars-minimalistic-bold" />
                  Daily Digest
                </div>
                <h3 className="text-3xl font-semibold">
                  "What did I achieve today?"
                </h3>
                <p className="text-white/60 leading-relaxed">
                  MySubscriptions generates a natural language summary of your
                  day. Perfect for stand-ups and personal reflection logs.
                </p>
              </div>

              <div className="flex-1 w-full max-w-lg">
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tr-sm px-5 py-3 text-sm text-white/90">
                      Summarize my Tuesday.
                    </div>
                  </div>
                  <div className="flex justify-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                      <Icon
                        icon="solar:magic-stick-3-linear"
                        className="text-white"
                      />
                    </div>
                    <div className="bg-white text-[#0A0A0A] rounded-2xl rounded-tl-sm px-6 py-5 text-sm shadow-xl w-full">
                      <p className="mb-2 font-semibold">
                        Here is your summary:
                      </p>
                      <ul className="space-y-2 text-[#737373]">
                        <li className="flex gap-2">
                          <Icon
                            icon="solar:check-circle-linear"
                            className="text-green-500 mt-0.5"
                          />
                          Merged PR #402 (Payment Gateway).
                        </li>
                        <li className="flex gap-2">
                          <Icon
                            icon="solar:check-circle-linear"
                            className="text-green-500 mt-0.5"
                          />
                          Attended "Q3 Roadmap" (1h 30m).
                        </li>
                        <li className="flex gap-2">
                          <Icon
                            icon="solar:clock-circle-linear"
                            className="text-orange-500 mt-0.5"
                          />
                          Total Deep Work: 3h 15m.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
