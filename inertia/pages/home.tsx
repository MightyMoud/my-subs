import { HomeFeatures } from '~/components/Home/HomeFeatures'
import { HomeHero } from '~/components/Home/HomeHero'
import { HomeHowItWorks } from '~/components/Home/HomeHowItWorks'
import { HomeIntegrations } from '~/components/Home/HomeIntegrations'
import { HomePricing } from '~/components/Home/HomePricing'
import Layout from '~/components/Layout'

export default function Home() {
  return (
    <Layout
      title="MySubscriptions"
      description="Experience a cinematic overview of your digital workday"
    >
      <HomeHero />
      <HomeIntegrations />
      <HomeHowItWorks />
      <HomeFeatures />
      <HomePricing />
    </Layout>
  )
}
