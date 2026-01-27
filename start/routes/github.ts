import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router
      .get('/repos', '#controllers/data_connections_controller.getGithubRepos')
      .as('getGithubRepos')
    router
      .get(
        '/commits',
        '#controllers/data_connections_controller.getGithubCommitHistory',
      )
      .as('getGithubCommitHistory')
  })
  .prefix('github')
  .prefix('api')
  .as('github')
  .middleware(middleware.auth())
