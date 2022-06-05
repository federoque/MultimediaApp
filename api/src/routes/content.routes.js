const {Router} = require('express')
const router = Router()
const {getContent, createContent, contentDetail, updateContent, deleteContent} = require('../controllers/content.controller.js')
const {verifyToken, verifyAdminToken} = require('../midlewares/verifytoken')


router.get('/', getContent)
router.get('/:id', contentDetail)
router.post('/', createContent)
router.delete('/:id', deleteContent)
router.patch('/:id', updateContent)

module.exports = router