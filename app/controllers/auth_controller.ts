import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
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

    const contactExists = await this.emailService.checkContactExists(user.email)
    if (!contactExists) {
      await this.emailService.createContact({
        email: user.email,
        firstName: user.firstName,
        customerId: user.id,
      })
    }

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

    if (session.get('next')) {
      return response.redirect().toPath(session.get('next') as string)
    }

    return response.redirect().toPath('/')
  }
}
