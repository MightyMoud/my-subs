import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import DataConnection from '#models/data_connection'
import User from '#models/user'

@inject()
export default class AuthController {
  constructor() {}

  async login({ auth, response, request }: HttpContext) {
    const { email, password } = request.body()
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)
    const next = request.qs().next

    if (next) {
      return response.redirect(next)
    }

    response.redirect().toRoute('home')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect('/')
  }

  async register({ auth, response, request }: HttpContext) {
    const { discountSignup, next, ...rest } = request.body()
    const user = await User.create(rest)

    await auth.use('web').login(user)

    if (next) {
      return response.redirect(next)
    }

    response.redirect().toRoute('home')
  }

  public async google({ ally, request, session }: HttpContext) {
    const next = request.qs().next
    if (next) {
      session.put('next', next)
    } else {
      session.forget('next')
    }

    return ally.use('google').redirect()
  }

  public async googleCallback({ ally, auth, session, response }: HttpContext) {
    const google = ally.use('google')

    if (google.accessDenied()) {
      return 'Access was denied'
    }

    if (google.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    if (google.hasError()) {
      return google.getError()
    }

    const googleUser = await google.user()
    const user = await User.firstOrCreate(
      {
        email: googleUser.email ?? '',
      },
      {
        email: googleUser.email ?? '',
        userName: googleUser.nickName,
        firstName: googleUser.original.given_name || '',
        lastName: googleUser.original.family_name || '',
        emailVerified: googleUser.emailVerificationState === 'verified',
        oauthToken: googleUser.token.token,
        avatarUrl: googleUser.avatarUrl ?? '',
      },
    )

    await auth.use('web').login(user)

    // Handle Connection Flow
    if (session.get('is_connecting') === 'google') {
      session.forget('is_connecting')
      await DataConnection.updateOrCreate(
        { userId: user.id, provider: 'google' },
        {
          accessToken: googleUser.token.token,
          refreshToken: googleUser.token.refreshToken,
          tokenExpiresAt: googleUser.token.expiresAt
            ? DateTime.fromJSDate(googleUser.token.expiresAt)
            : null,
        },
      )

      session.put('sessionData', { justConnected: 'google' })
      return response.redirect().toPath(session.get('next') || '/dashboard')
    }

    if (session.get('next')) {
      return response.redirect().toPath(session.get('next') as string)
    }

    return response.redirect().toPath('/dashboard')
  }

  public async github({ ally, request, session }: HttpContext) {
    const next = request.qs().next
    if (next) {
      session.put('next', next)
    } else {
      session.forget('next')
    }

    return ally.use('github').redirect()
  }

  public async githubCallback({ ally, auth, session, response }: HttpContext) {
    const github = ally.use('github')

    if (github.accessDenied()) {
      return 'Access was denied'
    }

    if (github.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    if (github.hasError()) {
      return github.getError()
    }

    const githubUser = await github.user()
    const user = await User.firstOrCreate(
      {
        email: githubUser.email ?? '',
      },
      {
        email: githubUser.email ?? '',
        userName: githubUser.original?.login,
        firstName: githubUser.original.name.split(' ')[0] || '',
        lastName: githubUser.original.name.split(' ')[1] || '',
        emailVerified: githubUser.emailVerificationState === 'verified',
        oauthToken: githubUser.token.token,
        avatarUrl: githubUser.avatarUrl ?? '',
      },
    )

    await auth.use('web').login(user)

    // Handle Connection Flow
    if (session.get('is_connecting') === 'github') {
      session.forget('is_connecting')
      await DataConnection.updateOrCreate(
        { userId: user.id, provider: 'github' },
        {
          accessToken: githubUser.token.token,
          // @ts-ignore
          refreshToken: githubUser.token.refreshToken,
          // @ts-ignore
          tokenExpiresAt: githubUser.token.expiresAt
            ? // @ts-ignore
              DateTime.fromJSDate(githubUser.token.expiresAt)
            : null,
        },
      )
      session.flash('justConnected', 'github')
      return response.redirect().toPath(session.get('next') || '/dashboard')
    }

    if (session.get('next')) {
      return response.redirect().toPath(session.get('next') as string)
    }

    return response.redirect().toPath('/dashboard')
  }
}
