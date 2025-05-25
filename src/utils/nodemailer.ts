import nodemailer, { Transporter } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
/**
 * @description Mail内容を元にメールを送信
 * @param message
 * @returns Promise<void>
 */
export const sendMail = async (mailOptions: Mail.Options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USERNAME as string,
        pass: process.env.GMAIL_PASSWORD as string,
      },
    })

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.log(`🔴 ${error} requires elevated privileges`)
      } else {
        // db store data
        console.log(`🟢 Email sent: ${info.response}`)
      }
    })
    return Promise.resolve()
  } catch (error: any) {
    console.log(`Error from mail ->  ${error.message}`)
    return Promise.reject(error)
  }
}
