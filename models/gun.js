'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GunSchema = new Schema(
  {
    model: { type: String, required: true },
    firingMode: {
      type: String,
      enum: ['Single-shot', 'Semi-automatic', 'Automatic', 'Burst']
    },
    caliber: { type: String },
    picUrl: { type: String },
    picUrlSq: { type: String },
    description: { type: String }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Gun', GunSchema)
