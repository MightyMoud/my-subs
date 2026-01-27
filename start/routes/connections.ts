import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router
      .group(() => {
        router
          .get(
            '/google',
            '#controllers/data_connections_controller.connectGoogle',
          )
          .as('connectGoogle')
        router
          .get(
            '/github',
            '#controllers/data_connections_controller.connectGithub',
          )
          .as('connectGithub')
      })
      .prefix('/connect'),
      router
        .get('/', '#controllers/data_connections_controller.getUserConnections')
        .prefix('/connections')
        .as('getUserConnections')
  })
  .prefix('api')
  .middleware(middleware.auth())
  .as('connections')
