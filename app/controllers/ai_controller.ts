import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AiService from '#services/ai_service'

@inject()
export default class AisController {
  constructor(private aiService: AiService) {}
  async generateAiCommentary({ session, response, request }: HttpContext) {
    const regen = request.input('regen') === 'true'
    console.log(request.input('regen'))
    // console.log(session.clear())

    if (session.has('githubData')) {
      const githubData = session.get('githubData')
      // cheap way to cache ai summary per session
      if (!session.has('aiSummary') || regen) {
        const commentary =
          await this.aiService.generateAiCommentaryOnGithubSummary(githubData)
        session.put('aiSummary', commentary)
        return response.json({
          commentary: commentary,
        })
      } else {
        return response.json({
          commentary: session.get('aiSummary'),
        })
      }
    }
    return response.json({
      commentary: 'No GitHub data available for AI commentary.',
    })
  }
}
