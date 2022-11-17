import {Router} from 'express'
import * as controllers from '../controllers'

const router = Router()

router.post('/signin', controllers.signin)
router.put('/signup', controllers.signup)
router.get('/messages', controllers.messageList)
router.put('/addMessage', controllers.addMessage)
router.put('/addReply', controllers.addReply)
router.patch('/reset', controllers.reset)

export default router