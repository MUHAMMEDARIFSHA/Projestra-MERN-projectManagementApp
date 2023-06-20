const express = require("express")
const router  =express.Router()

const {registerUser,signInUser,verifySignUpOtp,signInUserGoogle} = require('../controllers/userController')



router.post('/signup',registerUser)
router.post('/signin',signInUser)
router.post('/signup/verifyotp',verifySignUpOtp)
router.post('/signin/google',signInUserGoogle)


module.exports = router