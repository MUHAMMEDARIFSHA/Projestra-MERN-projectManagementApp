const express = require("express");
const router = express.Router();

const {
  signInAdmin,
  getUserDetails,
  blockUser,
  unBlockUser
} = require("../controllers/adminController");

router.post("/signin", signInAdmin);
router.get("/userdetails", getUserDetails);

router.patch("/blockuser", blockUser);
router.patch('/unblockuser',unBlockUser)

module.exports = router;
