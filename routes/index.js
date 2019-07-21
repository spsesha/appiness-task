const router = require('express').Router(),
    user = require('./user.route'),
    expenses = require('./expense.route')

router.use('/user', user)
router.use('/expenses', expenses)

module.exports = router