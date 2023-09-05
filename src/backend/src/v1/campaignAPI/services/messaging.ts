import { Resend } from 'resend'
import ENV from 'dotenv'

ENV.config()
const resendKey = process.env.RESEND_API_KEY
const resendDomain = process.env.RESEND_DOMAIN

export const resend = new Resend(resendKey)

export class MessagingService {
  smsClient: any
  emailClient: Resend
  constructor() {
    this.emailClient = new Resend(resendKey)
  }
  private async sendEmail(to: string, subject: string, body: string) {
    return await this.emailClient.emails.send({
      to,
      from: `Clamp <no-reply@${resendDomain}>`,
      subject,
      html: body,
    })
  }

  private async sendSMS(to: string, body: string) {
    return await this.smsClient.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    })
  }

  async sendMsg({
    channel = 'email',
    to,
    body,
    subject,
  }: {
    channel?: string
    to: string
    body: string
    subject?: string
  }) {
    switch (channel) {
      case 'email':
        return await this.sendEmail(to, subject || '', body)
      case 'sms':
        return await this.sendSMS(to, body)
      default:
        throw new Error('Invalid channel')
    }
  }
}
