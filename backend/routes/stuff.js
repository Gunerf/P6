const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const stuffCtrl = require('../controllers/stuff')


router.post('/', auth, multer, stuffCtrl.createSauce)
router.get('/:id', auth, stuffCtrl.getOneSauce);  
router.get('/api/sauces', auth, stuffCtrl.getAllSauce);

  module.exports = router