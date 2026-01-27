/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

import './routes/auth.js'

router.group(() => {
  // public with logged in state
  router
    .group(() => {
      router.get('/', '#controllers/views_controller.renderHomePage')
    })
    .use(middleware.silentAuth())

  // private pages only
  router
    .group(() => {
      router.get(
        '/dashboard',
        '#controllers/views_controller.renderDashboardPage',
      )
    })
    // should use private auth
    .use(middleware.auth())

  // public views
  router.group(() => {
    router
      .group(() => {
        router.on('/login').renderInertia('login')
        router.get('test', '#controllers/views_controller.test')
      })
      .middleware(middleware.guest())
    router.on('/terms-conditions').renderInertia('terms')
    router.on('/privacy-policy').renderInertia('privacy')
  })
})
