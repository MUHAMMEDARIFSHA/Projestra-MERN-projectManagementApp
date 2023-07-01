const express = require("express")
const router  =express.Router()
const verifyToken = require('../middlewares/Authorization')

const {registerUser,signInUser,verifySignUpOtp,forgotPassword,removeTokenAfterVerification,editPassword,getUserData} = require('../controllers/userController')
const signInUserGoogle = require('../controllers/googleAuthController')
const {getUserDataForEdit,editUserProfile,editUserNumber} = require('../controllers/userProfileController')
const createProject = require('../controllers/projectConrtroller')

router.get('/user/getdata',verifyToken,getUserData)
router.get('/user/profile/getdata',verifyToken,getUserDataForEdit)


router.post('/signup',registerUser)
router.post('/signin',signInUser)
router.post('/signup/verifyotp',verifySignUpOtp)
router.post('/signin/google',signInUserGoogle)
router.post('/signin/forgotpassword',forgotPassword)
router.post('/forgotpassword/verifedtoken',removeTokenAfterVerification)
router.post('/editpassword',editPassword)
router.post('/user/profile/edit',verifyToken,editUserProfile)
router.post('/user/profile/edit/number/otp',verifyToken,editUserNumber)

// project 
router.post('/user/createproject',verifyToken,createProject)



module.exports = router