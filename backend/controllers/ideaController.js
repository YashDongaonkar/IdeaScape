import mongoose from 'mongoose'
import Idea from '../models/Idea.js'

const MAX_IDEAS = 20

// GET /api/ideas
// Fetch all ideas belonging to the logged-in user
const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ user: req.user.id })
    return res.status(200).json({ ideas })
  } catch (error) {
    console.error('Get ideas error:', error.message)
    return res.status(500).json({
      message: 'Something went wrong while fetching ideas',
    })
  }
}

// GET /api/ideas/:id
// Fetch one idea belonging to the logged-in user
const getIdea = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid idea ID' })
    }

    const idea = await Idea.findOne({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' })
    }

    return res.status(200).json({ idea })
  } catch (error) {
    console.error('Get idea error:', error.message)

    return res.status(500).json({
      message: 'Something went wrong while fetching the idea',
    })
  }
}

// POST /api/ideas
// Create an idea, with a maximum of 20 per user
const createIdea = async (req, res) => {
  try {
    const { title } = req.body

    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        message: 'A title is required',
      })
    }

    const ideaCount = await Idea.countDocuments({
      user: req.user.id,
    })

    if (ideaCount >= MAX_IDEAS) {
      return res.status(403).json({
        message: 'You can only create up to 20 ideas',
      })
    }

    const idea = await Idea.create({
      title: title.trim(),
      description: req.body.description,
      links: req.body.links,
      tasks: req.body.tasks,
      color: req.body.color,
      position: req.body.position,
      rotation: req.body.rotation,
      user: req.user.id,
    })

    return res.status(201).json({
      message: 'Idea created successfully',
      idea,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message })
    }

    console.error('Create idea error:', error.message)

    return res.status(500).json({
      message: 'Something went wrong while creating the idea',
    })
  }
}

// PUT /api/ideas/:id
// Update an idea belonging to the logged-in user
const updateIdea = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid idea ID' })
    }

    const idea = await Idea.findOne({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' })
    }

    const allowedFields = [
      'title',
      'description',
      'links',
      'tasks',
      'color',
      'position',
      'rotation',
    ]

    for (const field of allowedFields) {
      if (Object.hasOwn(req.body, field)) {
        idea[field] = req.body[field]
      }
    }

    if (typeof idea.title !== 'string' || !idea.title.trim()) {
      return res.status(400).json({
        message: 'A title is required',
      })
    }

    idea.title = idea.title.trim()

    await idea.save()

    return res.status(200).json({
      message: 'Idea updated successfully',
      idea,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message })
    }

    console.error('Update idea error:', error.message)

    return res.status(500).json({
      message: 'Something went wrong while updating the idea',
    })
  }
}

// DELETE /api/ideas/:id
// Delete an idea belonging to the logged-in user
const deleteIdea = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid idea ID' })
    }

    const idea = await Idea.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' })
    }

    return res.status(200).json({
      message: 'Idea deleted successfully',
    })
  } catch (error) {
    console.error('Delete idea error:', error.message)

    return res.status(500).json({
      message: 'Something went wrong while deleting the idea',
    })
  }
}

export {
  getIdeas,
  getIdea,
  createIdea,
  updateIdea,
  deleteIdea,
}
