/** @format */

import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requaired: true,
    },
    text: {
      type: String,
      requaired: true,
      unique: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      requaired: true,
      unique: true,
    },

    imageUrl: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Post', PostSchema)
