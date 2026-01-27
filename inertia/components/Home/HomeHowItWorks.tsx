import { Icon } from '@iconify/react'
import { useEffect, useRef } from 'react'

export const HomeHowItWorks = () => {
  const scrollSectionRef = useRef<HTMLDivElement | null>(null)
  const lineRef = useRef<HTMLDivElement | null>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = scrollSectionRef.current
    const line = lineRef.current

    const handleScroll = () => {
      if (!section || !line) return

      const rect = section.getBoundingClientRect()
      const viewHeight = window.innerHeight
      const travel = rect.height - viewHeight
      const scrolled = -rect.top
      const progress =
        travel > 0 ? Math.max(0, Math.min(1, scrolled / travel)) : 0

      line.style.height = `${progress * 100}%`

      stepsRef.current.forEach((step) => {
        if (!step) return
        const threshold = parseFloat(step.dataset.threshold ?? '0')
        if (progress >= threshold) {
          if (progress < threshold + 0.2) {
            step.classList.add('active')
            step.classList.remove('opacity-30', 'opacity-40')
            step.classList.add('opacity-100')
            step.style.transform = 'translateY(0)'
          } else {
            step.classList.add('active')
            step.classList.remove('opacity-30', 'opacity-100')
            step.classList.add('opacity-40')
          }
        } else {
          step.classList.remove('active', 'opacity-100', 'opacity-40')
          step.classList.add('opacity-30')
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section
      id="how-it-works"
      ref={scrollSectionRef}
      className="relative w-full bg-[#FAFAFA] border-b border-[#E5E5E5]/60"
      style={{ height: '350vh' }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full px-6 md:px-12 relative z-10 flex flex-col items-center h-full py-20">
          <div className="text-center mb-12 shrink-0 transition-opacity duration-700">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#0A0A0A] tracking-tight mb-3">
              From Data to Insight
            </h2>
            <p className="text-[#737373] text-sm md:text-base max-w-md mx-auto">
              MySubscriptions automates the analysis of your fragmented digital
              work life.
            </p>
          </div>
          <div className="relative w-full max-w-xl flex-1 flex flex-col justify-center my-auto">
            <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-[#E5E5E5]/60 md:-translate-x-1/2"></div>
            <div
              ref={lineRef}
              className="absolute left-8 md:left-1/2 top-4 w-px bg-[#0A0A0A] md:-translate-x-1/2 transition-all duration-100 ease-linear h-0 max-h-[calc(100%-2rem)]"
            ></div>
            <div className="space-y-24 py-8 relative pl-20 md:pl-0">
              {/* Step 1 */}
              <div
                ref={(el) => {
                  stepsRef.current[0] = el
                }}
                className="lifecycle-step group flex flex-col md:flex-row items-center justify-between w-full opacity-30 transition-all duration-500"
                data-threshold="0.1"
              >
                <div className="md:w-[42%] md:text-right md:pr-12 text-left w-full mb-2 md:mb-0">
                  <span className="font-mono text-[10px] text-[#737373] uppercase tracking-wider block mb-1">
                    01 Connect
                  </span>
                  <h3 className="text-lg font-semibold text-[#0A0A0A]">
                    Link Accounts
                  </h3>
                  <p className="text-xs text-[#737373] mt-1">
                    OAuth securely into your tools.
                  </p>
                </div>
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center z-20 group-[.active]:border-[#0A0A0A] group-[.active]:scale-110 transition-all shadow-sm">
                  <Icon
                    icon="solar:link-circle-linear"
                    className="text-[#737373] group-[.active]:text-[#0A0A0A]"
                  />
                </div>
                <div className="md:w-[42%] md:pl-12 w-full">
                  <div className="bg-white border border-[#E5E5E5] p-4 rounded-lg shadow-sm w-fit">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center">
                        <Icon icon="mdi:github" width="16" />
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center">
                        <Icon icon="mdi:google" width="16" />
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-green-50 flex items-center justify-center text-[10px] font-bold">
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div
                ref={(el) => {
                  stepsRef.current[1] = el
                }}
                className="lifecycle-step group flex flex-col md:flex-row items-center justify-between w-full opacity-30 transition-all duration-500"
                data-threshold="0.35"
              >
                <div className="md:w-[42%] md:text-right md:pr-12 w-full order-last md:order-first">
                  <div className="bg-white border border-[#E5E5E5] p-3 rounded-lg shadow-sm inline-block text-left font-mono text-[10px] text-[#737373]">
                    <div>&gt; Fetching commits...</div>
                    <div>&gt; Parsing calendar events...</div>
                    <div className="text-green-600">&gt; Data normalized.</div>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center z-20 group-[.active]:border-[#0A0A0A] group-[.active]:scale-110 transition-all shadow-sm">
                  <Icon
                    icon="solar:cloud-download-linear"
                    className="text-[#737373] group-[.active]:text-[#0A0A0A]"
                  />
                </div>
                <div className="md:w-[42%] md:pl-12 w-full text-left mb-2 md:mb-0">
                  <span className="font-mono text-[10px] text-[#737373] uppercase tracking-wider block mb-1">
                    02 Ingest
                  </span>
                  <h3 className="text-lg font-semibold text-[#0A0A0A]">
                    Data Stream
                  </h3>
                  <p className="text-xs text-[#737373] mt-1">
                    Real-time sync of activities.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div
                ref={(el) => {
                  stepsRef.current[2] = el
                }}
                className="lifecycle-step group flex flex-col md:flex-row items-center justify-between w-full opacity-30 transition-all duration-500"
                data-threshold="0.6"
              >
                <div className="md:w-[42%] md:text-right md:pr-12 w-full text-left mb-2 md:mb-0">
                  <span className="font-mono text-[10px] text-[#737373] uppercase tracking-wider block mb-1">
                    03 Analyze
                  </span>
                  <h3 className="text-lg font-semibold text-[#0A0A0A]">
                    AI Synthesis
                  </h3>
                  <p className="text-xs text-[#737373] mt-1">
                    Finding patterns in the noise.
                  </p>
                </div>
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center z-20 group-[.active]:border-[#0A0A0A] group-[.active]:scale-110 transition-all shadow-sm">
                  <Icon
                    icon="solar:stars-minimalistic-bold"
                    className="text-[#737373] group-[.active]:text-amber-500"
                  />
                </div>
                <div className="md:w-[42%] md:pl-12 w-full">
                  <div className="bg-[#0A0A0A] text-white p-3 rounded-lg shadow-lg w-fit text-xs max-w-[200px]">
                    "You spent 12h in meetings but pushed 400 lines of critical
                    code. High impact day."
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div
                ref={(el) => {
                  stepsRef.current[3] = el
                }}
                className="lifecycle-step group flex flex-col md:flex-row items-center justify-between w-full opacity-30 transition-all duration-500"
                data-threshold="0.85"
              >
                <div className="md:w-[42%] md:text-right md:pr-12 w-full order-last md:order-first">
                  <div className="bg-white border border-[#E5E5E5] rounded-lg shadow-sm p-1 inline-flex gap-1">
                    <div className="w-8 h-12 bg-slate-100 rounded-sm"></div>
                    <div className="w-8 h-12 bg-[#0A0A0A] rounded-sm"></div>
                    <div className="w-8 h-12 bg-slate-100 rounded-sm"></div>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center z-20 group-[.active]:border-[#0A0A0A] group-[.active]:scale-110 transition-all shadow-sm">
                  <Icon
                    icon="solar:presentation-graph-linear"
                    className="text-[#737373] group-[.active]:text-[#0A0A0A]"
                  />
                </div>
                <div className="md:w-[42%] md:pl-12 w-full text-left mb-2 md:mb-0">
                  <span className="font-mono text-[10px] text-[#737373] uppercase tracking-wider block mb-1">
                    04 Visualize
                  </span>
                  <h3 className="text-lg font-semibold text-[#0A0A0A]">
                    Actionable Trends
                  </h3>
                  <p className="text-xs text-[#737373] mt-1">
                    Understand your velocity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
