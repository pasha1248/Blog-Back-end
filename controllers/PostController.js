/** @format */

import PostSchema from '../models/Post.js'

export const getAll = async (req, res) => {
  try {
    const posts = await PostSchema.find().populate('user').exec()

    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Not done get you state',
    })
  }
}

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostSchema.find().limit(5).exec()

    const tags = posts
      .map(obj => obj.tags)
      .flat()
      .slice(0, 5)

    res.json(tags)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Not Found',
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id

    PostSchema.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(500).json({
            message: 'Could not find the articleo',
          })
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Article is not found',
          })
        }

        res.json(doc)
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Not done get you state',
    })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id

    PostSchema.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(500).json({
            message: 'Could not Delete the articleo',
          })
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Article is not found',
          })
        }

        res.json({
          success: true,
        })
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Not done get you state',
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostSchema({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(','),
      user: req.userId,
    })

    const post = await doc.save()

    res.json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Not Found create',
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id

    await PostSchema.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags.split(','),
      }
    )
    res.json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not update the article',
    })
  }
}
