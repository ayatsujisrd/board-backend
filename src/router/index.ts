import { Router } from 'express'
import * as controllers from '../controllers'
import auth from '../middleware/auth'

const router = Router()

router.post('/signin', controllers.signinAuth)
router.put('/signup', controllers.signupAuth)
router.get('/messages/:category', auth, controllers.messageList)
router.put('/addMessage', auth, controllers.addMessage)
router.put('/addReply', auth, controllers.addReply)
router.patch('/reset', controllers.resetAuth)
router.delete('/deleteMessage', auth, controllers.deleteMessage)
router.delete('/deleteReply', auth, controllers.deleteReply)
router.post('/forget', controllers.forget)

export default router