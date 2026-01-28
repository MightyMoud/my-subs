import { inject } from '@adonisjs/core'
import { GoogleGenAI } from '@google/genai'
import env from '#start/env'
import type { GithubData } from '../types/data.js'

@inject()
export default class AiService {
  private ai: GoogleGenAI

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: env.get('GEMINI_API_KEY') })
  }

  async generateAiCommentaryOnGithubSummary(
    githubData: GithubData,
  ): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are given fetched data from a user's GitHub account as follows:
      
      ${JSON.stringify(githubData, null, 2)}
      
      Provide a brief commentary summarizing the user's coding activity, popular repositories, and commit history in an engaging and friendly tone.
      Use markdown and make sure it's less than 200 words.`,
    })
    return response.text || ''
  }
}
