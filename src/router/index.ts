import {Router} from 'express'
import {signin, signup} from '../controllers'

const router = Router()

router.post('/signin', signin)
router.put('/signup', signup)

export default router