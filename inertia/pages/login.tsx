import { Icon } from '@iconify/react'
import { Link, useForm } from '@inertiajs/react'
import { useEffect } from 'react'
import Layout from '~/components/Layout'

export default function Login() {
  const { setData, post, data, errors, processing } = useForm({
    email: '',
    password: '',
    next: '',
  })

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const next = queryParams.get('next')
    if (next) {
      setData('next', next)
    }
  }, [setData])

  return (
    <Layout
      title="Login | MySubscriptions"
      description="Login to your MySubscriptions account"
    >
      <main className="flex-grow flex items-center justify-center pt-32 pb-12 px-4">
        <div className="max-w-md w-full glass-panel p-8 md:p-10 rounded-2xl shadow-xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0A0A0A] text-white rounded-xl mb-4 shadow-lg">
              <Icon icon="solar:lock-password-linear" width="24" height="24" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">
              Welcome back
            </h1>
            <p className="text-sm text-[#737373] mt-2">
              Please enter your details to sign in
            </p>
          </div>

          <a
            href={`/api/auth/google?next=${data.next}`}
            className="flex items-center justify-center w-full px-4 py-3 gap-3 text-sm font-semibold transition-all duration-200 bg-white border border-[#E5E5E5] rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
          >
            <Icon icon="logos:google-icon" width="20" />
            Sign in with Google
          </a>

          <a
            href={`/api/auth/github?next=${data.next}`}
            className="flex items-center justify-center w-full px-4 py-3 mt-3 gap-3 text-sm font-semibold transition-all duration-200 bg-white border border-[#E5E5E5] rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
          >
            <Icon icon="logos:github-icon" width="20" />
            Sign in with GitHub
          </a>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E5E5]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-[#737373] bg-[#FAFAFA]/50 backdrop-blur-sm">
                Or continue with email
              </span>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              post(`/api/auth/login?next=${data.next}`)
            }}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-[#0A0A0A] mb-1.5 uppercase tracking-wider"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-white/50 border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A0A0A]/5 focus:border-[#0A0A0A] transition-all"
                placeholder="name@example.com"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider"
                >
                  Password
                </label>
                <Link
                  href="/reset-password"
                  className="text-xs font-medium text-[#737373] hover:text-[#0A0A0A] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-white/50 border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A0A0A]/5 focus:border-[#0A0A0A] transition-all"
                placeholder="••••••••"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="group relative w-full overflow-hidden bg-[#0A0A0A] text-white text-sm font-semibold py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.01] hover:shadow-lg active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {processing ? 'Signing in...' : 'Sign in to account'}
                <Icon icon="solar:login-2-linear" width="18" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </form>
        </div>
      </main>
    </Layout>
  )
}
