const express = require('express')
const ProductController = require('../controllers/productController')
const CategoryController = require('../controllers/categoryController')
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const router = express.Router()
const routerPub = require('./pub')

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/login-google', UserController.loginGoogle)

router.use('/pub', routerPub)

router.use(authentication)

router.get('/products', ProductController.products)
router.post('/products', ProductController.create)
router.get('/products/:id', ProductController.productId)
router.delete('/products/:id', authorization, ProductController.delete)
router.put('/products/:id', authorization, ProductController.editProduct)
router.patch('/products/:id', authorization, ProductController.changeStatus)

router.get('/histories', ProductController.history)
router.get('/categories', CategoryController.categories)


module.exports = router