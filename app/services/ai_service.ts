import { inject } from '@adonisjs/core'
import { GoogleGenAI } from '@google/genai'
import env from '#start/env'

@inject()
export default class AiService {
  private ai: GoogleGenAI

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: env.get('GEMINI_API_KEY') })
  }

  async summarizeText(text: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate an excerpt for this post in less than 30 words. Make sure it's concise and informative. Don't start by stating this article is. Just a human readable excerpt. Here is the post:\n\n${text}`,
    })
    return response.text || ''
  }
}
