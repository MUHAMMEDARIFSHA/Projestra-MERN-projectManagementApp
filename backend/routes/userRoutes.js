const express = require("express")
const router  =express.Router()
const verifyToken = require('../middlewares/Authorization')
const multer = require('../middlewares/multer')
const {registerUser,signInUser,verifySignUpOtp,forgotPassword,removeTokenAfterVerification,editPassword,getUserData} = require('../controllers/userController')
const signInUserGoogle = require('../controllers/googleAuthController')
const {getUserDataForEdit,editUserProfile,editUserNumber} = require('../controllers/userProfileController')
const {createProject,getProjects,getProjectData,addTask,changeStatus,getGroupProjectData,addMember,removeMember,
    addMemberToGroup,editGroupTask,GroupTaskChangeStatus,removeMemberGroupTask,changeStatusOfMember,deleteProject,changeStatusOfProject
,deleteTask} = require('../controllers/projectConrtroller')



router.get('/user/getdata',verifyToken,getUserData)
router.get('/user/profile/getdata',verifyToken,getUserDataForEdit)
router.get('/user/projectlist',verifyToken,getProjects)

router.post('/signup',registerUser)
router.post('/signin',signInUser)
router.post('/signup/verifyotp',verifySignUpOtp)
router.post('/signin/google',signInUserGoogle)
router.post('/signin/forgotpassword',forgotPassword)
router.post('/forgotpassword/verifedtoken',removeTokenAfterVerification)
router.post('/editpassword',editPassword)
router.post('/user/profile/edit',verifyToken,multer.upload.single('image'), editUserProfile)
router.post('/user/profile/edit/number/otp',verifyToken,editUserNumber)



// project 
router.post('/user/createproject',verifyToken,createProject)
router.post('/user/project/indivitual',verifyToken,getProjectData)
router.post("/user/project/group",verifyToken,getGroupProjectData)
router.post('/user/project/addmember',verifyToken,addMember)
router.post('/group/member/remove',verifyToken,removeMember)
router.post("/user/project/group/addtask",verifyToken,addMemberToGroup)
router.post('/group/task/edit',verifyToken,editGroupTask)
router.post('/group/task/member/remove',verifyToken,removeMemberGroupTask)
router.post('/user/group/member/status/change',verifyToken,changeStatusOfMember)
router.post('/user/group/project/delete',verifyToken,deleteProject)
router.post('/user/group/project/changestatus',verifyToken,changeStatusOfProject)
router.post('/user/group/project/task/delete',verifyToken,deleteTask)


router.patch('/user/project/indivitual/addtask',verifyToken,addTask)
router.patch('/user/project/indivitual/task/statuschange',verifyToken,changeStatus)
router.patch('/group/task/changestatus',verifyToken,GroupTaskChangeStatus)



module.exports = router