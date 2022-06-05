const {Router} = require('express')
const router = Router()
const {qualificate} = require('../controllers/qualification.controller')
const {verifyToken} = require('../midlewares/verifytoken')

router.post('/', qualificate)
module.exports = router