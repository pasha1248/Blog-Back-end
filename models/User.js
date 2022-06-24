/** @format */

import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      requaired: true,
    },
    email: {
      type: String,
      requaired: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', UserSchema)
