const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getUsers, deleteUser } = require('../controllers/userController');

const { protect } = require('../middleware/authMidleware');
router.route('/').post(registerUser).get(protect, getUsers)
router.delete('/:userId', protect, deleteUser)
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
