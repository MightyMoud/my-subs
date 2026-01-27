import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.post('/login', '#controllers/auth_controller.login').as('login')
    router
      .post('/register', '#controllers/auth_controller.register')
      .as('register')
    router.get('/google', '#controllers/auth_controller.google').as('google')
    router
      .get('/google/callback', '#controllers/auth_controller.googleCallback')
      .as('googleCallback')
    router.get('/github', '#controllers/auth_controller.github').as('github')
    router
      .get('/github/callback', '#controllers/auth_controller.githubCallback')
      .as('githubCallback')
    router
      .get('/logout', '#controllers/auth_controller.logout')
      .as('logout')
      .middleware(middleware.auth())
  })
  .prefix('auth')
  .prefix('api')
  .as('auth')
