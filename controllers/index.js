const Gun = require('../models/gun')

exports.getAllGuns = async (req, res) => {
  const guns = await Gun.find()
  res.render('guns-index', { guns: guns })
}
