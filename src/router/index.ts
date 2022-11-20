import { Router } from 'express'
import * as controllers from '../controllers'

const router = Router()

router.post('/signin', controllers.signin)
router.put('/signup', controllers.signup)
router.get('/messages/:category', controllers.messageList)
router.put('/addMessage', controllers.addMessage)
router.put('/addReply', controllers.addReply)
router.patch('/reset', controllers.reset)
router.delete('/deleteMessage', controllers.deleteMessage)
router.delete('/deleteReply', controllers.deleteReply)

export default router