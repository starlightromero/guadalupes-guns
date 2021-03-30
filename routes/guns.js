const express = require('express')

const router = express.Router()

const gunsController = require('../controllers/guns')

router.get('/guns/:id', gunsController.getGunById)

router.get('/guns/new', gunsController.getNewGunForm)

router.post('/guns', gunsController.createGun)

router.get('/guns/:id/edit', gunsController.getUpdateGunForm)

router.patch('/guns/:id', gunsController.updateGun)

router.delete('/guns/:id', gunsController.deleteGun)

module.exports = router
