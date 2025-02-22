const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/AccountController')
const { validateRegisterAccount, checkChangePassword } = require('../validation/UserValidation');
const { checkIsEmpty, checkMinLength } = require('../validation');
const { adminMiddleware, auth } = require('../middlewares/AdminMiddleware');

router.post('/register', validateRegisterAccount, AccountController.registerAccount);
router.post('/login', AccountController.loginAccount);
router.post('/logout', AccountController.logout);
router.get('/getAll', adminMiddleware, AccountController.getAllAccount)
router.get('/getDetail', auth, AccountController.getDetailAccount);
router.put('/deActive/:id', adminMiddleware, AccountController.deActiveAccount)
router.put('/inActive/:id', adminMiddleware, AccountController.inActiveAccount)
router.put('/changePassword', auth, checkChangePassword, AccountController.changePassword)
router.put('/addCart', auth, AccountController.addCart)
router.post('/refresh-token', AccountController.refreshToken)
module.exports = router
