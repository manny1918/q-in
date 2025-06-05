const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getUser, getUsers, deleteUser } = require('../controllers/userController');

const { protect } = require('../middleware/authMidleware');
router.route('/').post(registerUser).get(protect, getUsers)
router.route('/:userId').get(protect, getUser).delete(protect, deleteUser)
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
