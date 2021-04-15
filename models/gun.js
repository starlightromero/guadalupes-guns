const { Schema, model } = require('mongoose')

const gunSchema = new Schema(
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

gunSchema.index(
  { model: 'text', firingMode: 'text', caliber: 'text', description: 'text' },
  {
    name: 'Gun text index',
    weights: { model: 10, firingMode: 4, caliber: 2, description: 1 },
  }
)

module.exports = model('Gun', gunSchema)
