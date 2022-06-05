const {Router} = require('express')
const router = Router()
const content = require('./content.routes')
const auth = require('./auth.routes')
const qualification = require('./qualification.routes')

router.get('/', (req, res)=>{
    res.status(200).send('Welcome to Alkemy BackEnd Challenge')
})

router.use('/content', content)
router.use('/auth', auth)
router.use('/qualification', qualification)

module.exports= router