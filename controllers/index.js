const Gun = require('../models/gun')

exports.getAllGuns = async (req, res) => {
  const guns = await Gun.find()
  res.render('guns-index', { guns: guns })
}

exports.searchGuns = async (req, res) => {
  const term = new RegExp(req.query.term, 'i')
  const guns = await Gun.find({
    $or: [{ model: term }, { firingMode: term }, { caliber: term }]
  })
  res.render('guns-index', { guns: guns })
}
