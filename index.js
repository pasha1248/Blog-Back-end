/** @format */

import express from 'express'
import multer from 'multer'
import cors from 'cors'

import mongoose from 'mongoose'
import {
  registerValidation,
  loginValidation,
  postCreateVaslidation,
} from './Validations/validation.js'

import { checkAuth, handelValidationErrors } from './Utils/index.js'
import { UserController, PostController } from './controllers/index.js'
import User from './models/User.js'

mongoose
  .connect(
    'mongodb+srv://Anmin:538967@cluster0.5sutp.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB OK')
  })
  .catch(error => console.log('DB error', error))

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/upload', express.static('uploads'))

app.post(
  '/auth/login',
  loginValidation,
  handelValidationErrors,
  UserController.login
)
app.post(
  '/auth/register',
  registerValidation,
  handelValidationErrors,
  UserController.register
)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/upload/${req.file.originalname}`,
  })
})

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post(
  '/posts',
  checkAuth,
  postCreateVaslidation,
  handelValidationErrors,
  PostController.create
)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateVaslidation,
  handelValidationErrors,
  PostController.update
)

app.listen(4444, err => {
  if (err) {
    return console.log(err, 'error')
  }

  console.log('Server OK')
})
