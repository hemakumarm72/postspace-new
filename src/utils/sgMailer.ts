import sgMail, { MailDataRequired } from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

/**
 * @description Mail内容を元にメールを送信
 * @param message
 * @returns Promise<void>
 */
export const sendMessage = async (message: MailDataRequired) => {
  try {
    await sgMail.send(message)
    console.info('Email was sent.')
    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err)
  }
}
