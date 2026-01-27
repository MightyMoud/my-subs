import { ReactNode, useEffect } from 'react'
import { AppHead } from '~/components/AppHead'
import { BackgroundCanvas } from '~/components/BackgroundCanvas'
import { HomeFooter } from '~/components/Footer'
import { HomeHeader } from '~/components/Header'

interface LayoutProps {
  children: ReactNode
  title: string
  description?: string
  locale?: string
}

export default function Layout({
  children,
  title,
  description = '',
  locale = 'en',
}: LayoutProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll('.reveal-on-scroll').forEach((element) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [children])

  return (
    <>
      <AppHead title={title} description={description} locale={locale} />
      <div className="w-full relative bg-[#FAFAFA] selection:bg-[#0A0A0A] selection:text-white text-[#0A0A0A] font-sans min-h-screen">
        <div className="fixed inset-0 z-0 tech-grid-bg pointer-events-none" />
        <BackgroundCanvas />
        <HomeHeader />

        <div className="relative z-10 flex flex-col w-full min-h-screen">
          {children}
          <HomeFooter />
        </div>
      </div>
    </>
  )
}
