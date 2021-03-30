const Gun = require('./models/gun')

exports.getAllGuns = async (req, res) => {
  const guns = await Gun.find().exec()
  res.render('guns-index', { guns: guns })
}
