const express = require('express')

const router = express.Router()

const indexController = require('../controllers/index')

router.get('/search', indexController.searchGuns)

router.get('/', indexController.getAllGuns)

module.exports = router
