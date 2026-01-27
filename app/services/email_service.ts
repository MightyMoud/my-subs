import User from '#models/user'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import brevo from '@getbrevo/brevo'

let apiInstance = new brevo.TransactionalEmailsApi()
let contactsApi = new brevo.ContactsApi()

apiInstance.setApiKey(0, env.get('BREVO_API_KEY'))
contactsApi.setApiKey(0, env.get('BREVO_API_KEY'))

let sendSmtpEmail = new brevo.SendSmtpEmail()

sendSmtpEmail.subject = 'My {{params.subject}}'
sendSmtpEmail.templateId = 2
sendSmtpEmail.sender = { name: 'John', email: 'support@esimcandy.com' }
sendSmtpEmail.to = [{ email: 'm.mousa@hey.com', name: 'Mahmoud Mousa' }]
sendSmtpEmail.headers = { 'Some-Custom-Name': 'unique-id-1234' }
sendSmtpEmail.params = { var1: 'My param value', subject: 'This was scheduled' }
sendSmtpEmail.scheduledAt = new Date(Date.now() + 1 * 60 * 1000)

@inject()
export default class EmailService {
  constructor() {}

  async sendEmail(emailObj: brevo.SendSmtpEmail) {
    try {
      const res = await apiInstance.sendTransacEmail(emailObj)
      return res
    } catch (error) {
      console.error(error)
    }
  }

  async createContact({
    email,
    firstName,
    customerId,
  }: Record<string, string>) {
    try {
      const res = await contactsApi.createContact({
        email: email,
        attributes: {
          FIRSTNAME: firstName,
          CUSTOMER_ID: customerId,
        },
      })
      return res
    } catch (error) {
      console.error(error)
    }
  }

  async checkContactExists(email: string) {
    try {
      const res = await contactsApi.getContactInfo(email)
      return res.body
    } catch (error) {
      // console.error(error)
      if (error.response.statusCode === 404) {
        return false
      }
    }
  }

  async sendEsimEmail(
    user: User,
    location: string,
    qrCodeUrl: string,
    lpaLink: string,
    orderURL: string,
  ) {
    let emailObj = new brevo.SendSmtpEmail()

    emailObj.templateId = 3
    emailObj.to = [{ email: user.email, name: user.userName }]
    emailObj.params = { location, qrCodeUrl, lpaLink, orderURL }

    await this.sendEmail(emailObj)
  }

  async sendEsimEmailToUserId(
    userId: string,
    location: string,
    qrCodeUrl: string,
    lpaLink: string,
    orderURL: string,
  ) {
    let emailObj = new brevo.SendSmtpEmail()

    const user = await User.find(userId)
    if (!user) {
      throw new Error('User not found')
    }

    emailObj.templateId = 3
    emailObj.to = [{ email: user.email, name: user.userName }]
    emailObj.params = { location, qrCodeUrl, lpaLink, orderURL }

    await this.sendEmail(emailObj)
  }
}
