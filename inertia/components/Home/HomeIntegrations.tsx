import { Icon } from '@iconify/react'

export const HomeIntegrations = () => {
  const integrations = [
    { icon: 'mdi:github', label: 'GitHub' },
    { icon: 'mdi:google', label: 'Google Calendar' },
    { icon: 'mdi:gitlab', label: 'GitLab' },
    { icon: 'mdi:microsoft-outlook', label: 'Outlook' },
    { icon: 'simple-icons:notion', label: 'Notion' },
  ]

  return (
    <section className="py-10 border-y border-[#E5E5E5]/60 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 reveal-on-scroll">
        {integrations.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <Icon icon={item.icon} width="24" />
            <span className="font-semibold text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
