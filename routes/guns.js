const express = require('express')

const { body } = require('express-validator')

const router = express.Router()

const gunsController = require('../controllers/guns')

router.get('/new', gunsController.getNewGunForm)

router.post('/:id/purchase', gunsController.purchaseGun)

router.get('/:id/edit', gunsController.getUpdateGunForm)

router.get('/:id', gunsController.getGunById)

router.post(
  '/',
  [
    body('model').trim().isLength({ min: 1, max: 25 }).not().isEmpty().escape(),
    body('firingMode')
      .trim()
      .isLength({ min: 1, max: 14 })
      .not()
      .isEmpty()
      .escape(),
    body('caliber')
      .trim()
      .isLength({ min: 1, max: 25 })
      .not()
      .isEmpty()
      .escape(),
    body('picUrl')
      .trim()
      .isLength({ min: 1, max: 100 })
      .not()
      .isEmpty()
      .isURL(),
    body('picUrlSq')
      .trim()
      .isLength({ min: 1, max: 100 })
      .not()
      .isEmpty()
      .isURL(),
    body('description')
      .trim()
      .isLength({ min: 1, max: 140 })
      .not()
      .isEmpty()
      .escape(),
    body('price')
      .trim()
      .isLength({ min: 1, max: 8 })
      .not()
      .isEmpty()
      .isDecimal(),
  ],
  gunsController.createGun
)

router.patch(
  '/:id',
  [
    body('model').trim().isLength({ min: 1, max: 25 }).not().isEmpty().escape(),
    body('firingMode')
      .trim()
      .isLength({ min: 1, max: 14 })
      .not()
      .isEmpty()
      .escape(),
    body('caliber')
      .trim()
      .isLength({ min: 1, max: 25 })
      .not()
      .isEmpty()
      .escape(),
    body('picUrl')
      .trim()
      .isLength({ min: 1, max: 100 })
      .not()
      .isEmpty()
      .isURL(),
    body('picUrlSq')
      .trim()
      .isLength({ min: 1, max: 100 })
      .not()
      .isEmpty()
      .isURL(),
    body('description')
      .trim()
      .isLength({ min: 1, max: 140 })
      .not()
      .isEmpty()
      .escape(),
    body('price')
      .trim()
      .isLength({ min: 1, max: 8 })
      .not()
      .isEmpty()
      .isDecimal(),
  ],
  gunsController.updateGun
)

router.delete('/:id', gunsController.deleteGun)

module.exports = router
