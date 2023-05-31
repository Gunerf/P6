const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const stuffCtrl = require('../controllers/stuff')


router.post('/', auth, multer, stuffCtrl.createSauce)
router.get('/:id', auth, stuffCtrl.getOneSauce);  
router.get('/', auth, stuffCtrl.getAllSauce);
router.put('/:id', auth, stuffCtrl.modifySauce)
router.delete('/:id', auth, stuffCtrl.deleteSauce)

  module.exports = router