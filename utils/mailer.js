const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const sendMail = async (user, req, res) => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    })
  )

  const mailOptions = {
    from: 'sender.gmail',
    to: user.email,
    subject: 'Gun Purchased!',
    template: {
      name: 'email.pug',
      engine: 'pug',
      context: user,
    },
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Response: ' + info)
    res.redirect(`/guns/${req.params.id}`)
  } catch (err) {
    console.log('Error: ' + err)
    res.redirect(`/guns/${req.params.id}`)
  }
}

module.exports = sendMail
