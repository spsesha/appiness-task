const router = require('express').Router(),
    UserControl = require('../controllers/user.ctrl')

router.post('/signup', UserControl.signup)
router.post('/login', UserControl.login)

module.exports = router