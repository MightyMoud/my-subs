import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router
      .get('/google', '#controllers/data_connections_controller.connectGoogle')
      .as('connectGoogle')
    router
      .get('/github', '#controllers/data_connections_controller.connectGithub')
      .as('connectGithub')
  })
  .prefix('connect')
  .prefix('api')
  .middleware(middleware.auth())
  .as('connections')
