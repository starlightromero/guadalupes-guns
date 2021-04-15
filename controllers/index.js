const Gun = require('../models/gun')

exports.getAllGuns = async (req, res) => {
  const currentPage = req.query.page || 1
  const perPage = 2
  const count = await Gun.find().countDocuments()
  const guns = await Gun.find()
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
  if (req.header('Content-Type') === 'application/json') {
    return res.json({
      guns: guns,
      pagesCount: count / perPage,
      currentPage: currentPage,
    })
  } else {
    res.status(200).render('guns-index', {
      guns: guns,
      pagesCount: count / perPage,
      currentPage: currentPage,
    })
  }
}

exports.searchGuns = async (req, res) => {
  const currentPage = req.query.page || 1
  const perPage = 2
  const term = new RegExp(req.query.term, 'i')
  try {
    const count = await Gun.find().countDocuments()
    const guns = await Gun.find(
      { $text: { $search: term } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
    res.status(200).render('guns-index', {
      guns: guns,
      pagesCount: count / perPage,
      currentPage: currentPage,
    })
  } catch (err) {
    return res.status(400).send(err)
  }
}
