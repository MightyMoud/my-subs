import Layout from '~/components/Layout'

export default function Privacy() {
  return (
    <Layout title="Privacy Policy" description="MySubscriptions Privacy Policy">
      <div className="max-w-3xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="max-w-none">
          <p className="text-[#737373] mb-8">Last updated: January 27, 2026</p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#0A0A0A]">
              1. Information We Collect
            </h2>
            <p className="text-[#737373] leading-relaxed mb-4">
              We collect information you provide directly to us when you create
              an account, use our services, or communicate with us. This may
              include your name, email address, and subscription data from your
              connected accounts.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#0A0A0A]">
              2. How We Use Your Information
            </h2>
            <p className="text-[#737373] leading-relaxed mb-4">
              We use the information we collect to provide, maintain, and
              improve our services, to develop new ones, and to protect
              MySubscriptions and our users.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#0A0A0A]">
              3. Data Security
            </h2>
            <p className="text-[#737373] leading-relaxed mb-4">
              We use industry-standard security measures to protect your
              information and ensure that your data is handled securely.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#0A0A0A]">
              4. Contact Us
            </h2>
            <p className="text-[#737373] leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please
              contact us at privacy@mysubscriptions.com.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
