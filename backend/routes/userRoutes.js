const express = require("express")
const router  =express.Router()

const {registerUser,signInUser} = require('../controllers/userController')



router.post('/signup',registerUser)
router.post('/signin',signInUser)

module.exports = router