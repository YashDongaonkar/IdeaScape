import express from 'express'
import verifyJWT from '../middleware/verifyJWT.js'

import {
  getIdeas,
  getIdea,
  createIdea,
  updateIdea,
  deleteIdea,
} from '../controllers/ideaController.js'

const router = express.Router()

router.use(verifyJWT)

router.get('/', getIdeas)
router.get('/:id', getIdea)

router.post('/', createIdea)
router.put('/:id', updateIdea)
router.delete('/:id', deleteIdea)

export default router
