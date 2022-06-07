const {Router} = require('express')
const router = Router()
const {getContent, createContent, contentDetail, updateContent, deleteContent} = require('../controllers/content.controller.js')
const {verifyToken, verifyAdminToken} = require('../midlewares/verifytoken')


router.get('/', verifyToken, getContent)
router.get('/:id', verifyToken, contentDetail)
router.post('/', verifyAdminToken, createContent)
router.delete('/:id', verifyAdminToken, deleteContent)
router.patch('/:id', verifyAdminToken, updateContent)

module.exports = router