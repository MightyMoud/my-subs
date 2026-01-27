import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import adonisjs from '@adonisjs/vite/client'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    plugins: [
      tailwindcss(),
      inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.tsx' } }),
      react(),
      adonisjs({
        entrypoints: ['inertia/app/app.tsx'],
        // assetsUrl: 'https://cdn.esimcandy.com/',
        reload: ['resources/views/**/*.edge'],
      }),
    ],
    publicDir: './resources/public',

    /**
     * Define aliases for importing modules from
     * your frontend code
     */
    resolve: {
      alias: {
        '~/': `${getDirname(import.meta.url)}/inertia/`,
      },
    },
  })
}
