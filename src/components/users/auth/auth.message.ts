import {
  emailTemplateEN,
  emailTemplateJA,
} from '../../../template/email.template'

export const MESSAGE_USER_EMAIL_VERIFICATION = (
  email: string,
  otp: number,
  locale: 'en' | 'ja',
) => ({
  to: email,
  from: {
    email: process.env.SENDGRID_FROM_EMAIL as string,
    name: process.env.SENDGRID_FROM_NAME,
  },
  subject: `【${process.env.APP_TITLE}】 ${
    locale === 'en'
      ? '(OTP) for Account Verification'
      : 'メールアドレス確認のお知らせ'
  }`,
  html:
    locale === 'en'
      ? emailTemplateEN(
          `<p>If you do not recognize this email, please ignore it. </p>
           <p>One-time password for POSTSPACE account has been issued</p> </br>
           <p>Please enter the number below to complete the authentication procedure. </p> </br>
           <span></span>
           <p>OTP: ${otp}</p>
           <span></span>`,
        )
      : emailTemplateJA(
          `<p>このメールに心当たりがない場合は、無視してください。 </p>
           <p>登録用のメールアドレスを確認しています。 </p>
           <p>以下の番号を入力して認証手続きを行なってください。</p> </br>
           <span></span>
           <p>OTP: ${otp}</p>
           <span></span>`,
        ),
})

export const MESSAGE_USER_FORGOT_TEMPLATE = (
  email: string,
  otp: number,
  locale: 'en' | 'ja',
) => ({
  to: email,
  from: {
    email: process.env.SENDGRID_FROM_EMAIL as string,
    name: process.env.SENDGRID_FROM_NAME,
  },
  subject: `【${process.env.APP_TITLE}】 ${
    locale === 'en'
      ? 'Password Reset OTP Confirmation'
      : 'ワンタイムパスワードを発行しました'
  }`,
  html:
    locale === 'en'
      ? emailTemplateEN(
          `<p>If you do not recognize this email, please ignore it. </p>
           <p>One-time password for POSTSPACE account has been issued</p> </br>
           <p>Please enter the number below to complete the authentication procedure. </p> </br>
           <span></span>
           <p>OTP: ${otp}</p>
           <span></span>`,
        )
      : emailTemplateJA(
          `<p>このメールに心当たりがない場合は、無視してください。 </p>
           <p>登録用のメールアドレスを確認しています。 </p>
           <p>以下の番号を入力して認証手続きを行なってください。</p> </br>
           <span></span>
           <p>OTP: ${otp}</p>
           <span></span>`,
        ),
})
