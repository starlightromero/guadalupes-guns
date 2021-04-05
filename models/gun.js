'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GunSchema = new Schema(
  {
    model: { type: String, required: true, maxLength: 25 },
    firingMode: {
      type: String,
      enum: ['Single-shot', 'Semi-automatic', 'Automatic', 'Burst'],
      required: true,
      maxLength: 14,
    },
    caliber: { type: String, required: true, maxLength: 25 },
    picUrl: { type: String, required: true, maxLength: 100 },
    picUrlSq: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true, maxLength: 140 },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Gun', GunSchema)
