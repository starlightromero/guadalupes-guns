const Gun = require('../models/gun')

exports.getAllGuns = async (req, res) => {
  const currentPage = req.query.page || 1
  const perPage = 2
  const count = await Gun.find().countDocuments()
  const guns = await Gun.find()
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
  res.render('guns-index', {
    guns: guns,
    pagesCount: count / perPage,
    currentPage: currentPage
  })
}

exports.searchGuns = async (req, res) => {
  const currentPage = req.query.page || 1
  const perPage = 2
  const term = new RegExp(req.query.term, 'i')
  const count = await Gun.find().countDocuments()
  const guns = await Gun.find({
    $or: [{ model: term }, { firingMode: term }, { caliber: term }]
  })
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
  res.render('guns-index', {
    guns: guns,
    pagesCount: count / perPage,
    currentPage: currentPage
  })
}
