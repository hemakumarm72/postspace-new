export const emailTemplateEN = (content: string) => {
  return `
	<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Postspace</title>
  </head>
  <body>
    ${content}
    <span></span>
    <p>このメールの差出人に身に覚えのない場合は無視してください。</p>
    <span>──────────────────────────────────────</span>
    <p>${process.env.APP_TITLE}</p>
    <p>Mail：postspace@jp.com</p>
    <p>URL：https://postspace.jp/</p>
    <span>──────────────────────────────────────</span>
  </body>
</html>`
}

export const emailTemplateJA = (content: string) => {
  return `
	<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Postspace</title>
  </head>
  <body>
    ${content}
    <span></span>
    <p>このメールの差出人に身に覚えのない場合は無視してください。</p>
    <span>──────────────────────────────────────</span>
    <p>${process.env.APP_TITLE}</p>
    <p>Mail：postspace@jp.com</p>
    <p>URL：https://postspace.jp/</p>
    <span>──────────────────────────────────────</span>
  </body>
</html>`
}

export const PLAN_EXPIRED_NOTIFICATION_TEMPLATE = (
  email: string,
  date: Date,
  locale: 'en' | 'ja',
) => ({
  to: email,
  from: {
    email: process.env.SENDGRID_FROM_EMAIL as string,
    name: process.env.SENDGRID_FROM_NAME,
  },
  subject: `【${process.env.APP_TITLE}】${
    locale === 'en' ? 'Plan Expired' : ''
  }`,
  html:
    locale === 'en'
      ? emailTemplateEN(
          `<p>File deletion deadline approaching</p> </br>
   <span></span> 
   <span></span>
   <p>${date.toDateString()} The file will be deleted in </p> </br> 
   <span></span>
   <span></span> 
  <p>Please consider changing to a paid plan as you can extend the file deletion period</p>  </br>
  <a href="https://gump.co.jp">https://gump.co.jp</a>`,
        )
      : emailTemplateJA(
          `<p>ファイルの削除期限が近づいています</p> </br>
   <span></span> 
   <span></span>
   <p>${date.toDateString()}にファイルの削除が行われます。</p> </br> 
   <span></span>
   <span></span> 
  <p>有料プランに変更することでファイルの削除期間を伸ばすことができますのでご検討ください。</p>  </br>
  <a href="https://gump.co.jp">https://gump.co.jp</a>`,
        ),
})
