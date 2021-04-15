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
    picUrl: { type: String },
    picUrlSq: { type: String },
    avatarUrl: { type: String, required: true },
    description: { type: String, required: true, maxLength: 140 },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Gun', GunSchema)
