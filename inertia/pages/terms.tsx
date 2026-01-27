import Layout from '~/components/Layout'

export default function Terms() {
  return (
    <Layout
      title="Terms of Service"
      description="MySubscriptions Terms of Service"
    >
      <div className="max-w-3xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="max-w-none">
          <p className="text-[#737373] mb-8">Last updated: January 27, 2026</p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#0A0A0A]">
              1. Acceptance of Terms
            </h2>
            <p className="text-[#737373] leading-relaxed mb-4">
              By accessing or using MySubscriptions, you agree to be bound by
              these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#0A0A0A]">
              2. Use License
            </h2>
            <p className="text-[#737373] leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on MySubscriptions' website
              for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#0A0A0A]">
              3. Disclaimer
            </h2>
            <p className="text-[#737373] leading-relaxed mb-4">
              The materials on MySubscriptions' website are provided on an 'as
              is' basis. MySubscriptions makes no warranties, expressed or
              implied, and hereby disclaims and negates all other warranties
              including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#0A0A0A]">
              4. Limitations
            </h2>
            <p className="text-[#737373] leading-relaxed mb-4">
              In no event shall MySubscriptions or its suppliers be liable for
              any damages (including, without limitation, damages for loss of
              data or profit, or due to business interruption) arising out of
              the use or inability to use the materials on MySubscriptions'
              website.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
