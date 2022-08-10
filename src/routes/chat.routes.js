import express from 'express'
import { chatPage, obtainEmail } from '../controllers/chat.controllers.js'

const router = express.Router()

router.get('/',chatPage)

router.get('/:email',obtainEmail)

export default router