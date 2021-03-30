const Gun = require('../models/gun')

exports.getGunById = async (req, res) => {
  const gun = await Gun.findById(req.params.id)
  res.render('guns-show', { gun: gun })
}

exports.getNewGunForm = (req, res) => {
  res.render('guns-new')
}

exports.createGun = async (req, res) => {
  const gun = new Gun(req.body)
  await gun.save()
  res.redirect(`/guns/${gun._id}`)
}

exports.getUpdateGunForm = async (req, res) => {
  const gun = await Gun.findById(req.params.id)
  res.render('guns-edit', { gun: gun })
}

exports.updateGun = async (req, res) => {
  const gun = await Gun.findByIdAndUpdate(req.params.id, req.body)
  res.redirect(`/guns/${gun._id}`)
}

exports.deleteGun = async (req, res) => {
  await Gun.findByIdAndRemove(req.params.id)
  return res.redirect('/')
}
