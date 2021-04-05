const { validationResult } = require('express-validator')

const Gun = require('../models/gun')

exports.getGunById = async (req, res) => {
  try {
    const gun = await Gun.findById(req.params.id)
    res.render('guns-show', { gun: gun })
  } catch (err) {
    throw new Error(err)
  }
}

exports.getNewGunForm = (req, res) => {
  const error = req.query.error
  res.render('guns-new', { error: error })
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
  try {
    const gun = await Gun.findById(req.params.id)
    res.render('guns-edit', { gun: gun })
  } catch (err) {
    throw new Error(err)
  }
}

exports.updateGun = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    error.data = errors.array()
    throw error
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
    return res.redirect('/')
  } catch (err) {
    throw new Error(err)
  }
}
