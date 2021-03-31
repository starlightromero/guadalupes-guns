const express = require('express')

const router = express.Router()

const gunsController = require('../controllers/guns')

router.get('/new', gunsController.getNewGunForm)

router.get('/:id/edit', gunsController.getUpdateGunForm)

router.get('/:id', gunsController.getGunById)

router.post('/', gunsController.createGun)

router.patch('/:id', gunsController.updateGun)

router.delete('/:id', gunsController.deleteGun)

module.exports = router
