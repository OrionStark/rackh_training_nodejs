const UserController = require('../controllers/user_controller')
const router = require('express').Router()

router.get("/insertUser", UserController.insertUser)
router.get("/friends", UserController.getFriends)
module.exports = router