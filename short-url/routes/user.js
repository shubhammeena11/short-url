const express =require("express")
const {createUser, logoinUser} = require("../controllers/user")
const router = express.Router();

router.post('/signup',createUser)
router.post('/signin',logoinUser)

module.exports = router;