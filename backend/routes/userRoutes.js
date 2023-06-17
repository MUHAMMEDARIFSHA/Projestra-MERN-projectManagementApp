const express = require("express")
const router  =express.Router()

const {registerUser,signInUser,verifySignUpOtp} = require('../controllers/userController')



router.post('/signup',registerUser)
router.post('/signin',signInUser)
router.post('/signup/verifyotp',verifySignUpOtp)


module.exports = router