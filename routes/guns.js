const express = require('express')

const { body } = require('express-validator')

const router = express.Router()

const gunsController = require('../controllers/guns')

router.get('/new', gunsController.getNewGunForm)

router.get('/:id/edit', gunsController.getUpdateGunForm)

router.get('/:id', gunsController.getGunById)

router.post(
  '/',
  [
    body('model').isLength({ min: 1, max: 25 }).not().isEmpty().trim().escape(),
    body('firingMode')
      .isLength({ min: 1, max: 14 })
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('caliber')
      .isLength({ min: 1, max: 25 })
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('picUrl')
      .isLength({ min: 1, max: 100 })
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('picUrlSq')
      .isLength({ min: 1, max: 100 })
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('description')
      .isLength({ min: 1, max: 140 })
      .not()
      .isEmpty()
      .trim()
      .escape(),
  ],
  gunsController.createGun
)

router.patch(
  '/:id',
  [
    body('model').isLength({ min: 1, max: 25 }).not().isEmpty().trim().escape(),
    body('firingMode')
      .isLength({ min: 1, max: 14 })
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('caliber')
      .isLength({ min: 1, max: 25 })
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('picUrl')
      .isLength({ min: 1, max: 100 })
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('picUrlSq')
      .isLength({ min: 1, max: 100 })
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('description')
      .isLength({ min: 1, max: 140 })
      .not()
      .isEmpty()
      .trim()
      .escape(),
  ],
  gunsController.updateGun
)

router.delete('/:id', gunsController.deleteGun)

module.exports = router
