const {Router} = require('express')
const router = Router()
const {signIn, signUp} = require('../controllers/auth.contoller.js')

router.post('/signin', signIn)
router.post('/signup', signUp)


module.exports = router