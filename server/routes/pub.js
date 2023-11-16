const express = require('express')
const CustomerController = require('../controllers/customerController')
const pubAuthentication = require('../middlewares/pubAuthentication')
const router = express.Router()

router.post('/register', CustomerController.register)
router.post('/login', CustomerController.login)
router.post('/login-google', CustomerController.loginGoogle)

router.get('/products', CustomerController.products)
router.get('/products/:id', CustomerController.detail)
router.post('/products/:id', CustomerController.qrCode)

router.use(pubAuthentication)

router.post('/wishlist', CustomerController.addWishlist)
router.get('/wishlist', CustomerController.wishlist)

module.exports = router