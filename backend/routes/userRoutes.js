const express = require("express")
const router  =express.Router()

const {registerUser,signInUser,verifySignUpOtp,forgotPassword,emailVerified} = require('../controllers/userController')
const signInUserGoogle = require('../controllers/googleAuthController')



router.post('/signup',registerUser)
router.post('/signin',signInUser)
router.post('/signup/verifyotp',verifySignUpOtp)
router.post('/signin/google',signInUserGoogle)
router.post('/signin/forgotpassword',forgotPassword)

router.get('/user/:id/verify/:token',emailVerified)


module.exports = router