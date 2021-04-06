const { validationResult } = require('express-validator')

const Gun = require('../models/gun')

const mailer = require('../utils/mailer')

exports.getGunById = async (req, res) => {
  try {
    const gun = await Gun.findById(req.params.id)
    res.status(200).render('guns-show', { gun: gun })
  } catch (err) {
    throw new Error(err)
  }
}

exports.getNewGunForm = (req, res) => {
  const error = req.query.error
  res.status(200).render('guns-new', { error: error })
}

exports.createGun = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = errors.array()[0].param.replace(/([A-Z])/g, ' $1')
    const formattedError = encodeURIComponent(
      error.charAt(0).toUpperCase() + error.slice(1)
    )
    res.status(422).redirect(`/guns/new?error=${formattedError}`)
  }
  try {
    const gun = new Gun(req.body)
    await gun.save()
    res.redirect(`/guns/${gun._id}`)
  } catch (err) {
    res.status(400).send(err.errors)
  }
}

exports.getUpdateGunForm = async (req, res) => {
  const error = req.query.error
  try {
    const gun = await Gun.findById(req.params.id)
    res.status(200).render('guns-edit', { gun: gun, error: error })
  } catch (err) {
    throw new Error(err)
  }
}

exports.updateGun = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = errors.array()[0].param.replace(/([A-Z])/g, ' $1')
    const formattedError = encodeURIComponent(
      error.charAt(0).toUpperCase() + error.slice(1)
    )
    res
      .status(422)
      .redirect(`/guns/${req.params.id}/edit?error=${formattedError}`)
  }
  try {
    const gun = await Gun.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`/guns/${gun._id}`)
  } catch (err) {
    throw new Error(err)
  }
}

exports.deleteGun = async (req, res) => {
  try {
    await Gun.findByIdAndRemove(req.params.id)
    return res.status(200).redirect('/')
  } catch (err) {
    throw new Error(err)
  }
}

exports.purchaseGun = async (req, res) => {
  console.log(req.body)
  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here: https://dashboard.stripe.com/account/apikeys
  const stripe = require('stripe')(process.env.PRIVATE_STRIPE_API_KEY)

  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:
  const token = req.body.stripeToken // Using Express

  // req.body.petId can become null through seeding,
  // this way we'll insure we use a non-null value
  const gunId = req.body.gunId || req.params.id

  try {
    const gun = await Gun.findById(gunId)
    const charge = stripe.charges.create({
      amount: gun.price * 100,
      currency: 'usd',
      description: `Purchased ${gun.model}, ${gun.caliber}, ${gun.firingMode}`,
      source: token,
    })
    // Convert the amount back to dollars for ease in displaying in the template
    const user = {
      email: req.body.stripeEmail,
      amount: charge.amount / 100,
      gunModel: gun.model,
    }
    // Call our mail handler to manage sending emails
    mailer.sendMail(user, req, res)
  } catch (err) {
    console.log('Error: ' + err)
    res.redirect(`/guns/${req.params.id}`)
  }
}
