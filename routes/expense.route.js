const router = require('express').Router(),
    ExpensesCtrl = require('../controllers/expense.ctrl'),
    passport = require('../config/passport')

router.get('/', passport.authenticate('jwt', { session: false }), ExpensesCtrl.getExpenses)
router.post('/add-category', passport.authenticate('jwt', { session: false }), ExpensesCtrl.addCategory)
router.post('/update-budget', passport.authenticate('jwt', { session: false }), ExpensesCtrl.updateBudget)
router.post('/remove-category', passport.authenticate('jwt', { session: false }), ExpensesCtrl.removeCategory)
router.get('/get-expenses', passport.authenticate('jwt', { session: false}), ExpensesCtrl.expenseSummary)
router.post('/add-expense', passport.authenticate('jwt', { session: false }), ExpensesCtrl.addExpense)
router.get('/budget-summary', passport.authenticate('jwt', { session: false }), ExpensesCtrl.budgetSummary)
router.get('/category-summary', passport.authenticate('jwt', { session: false }), ExpensesCtrl.categorySummary)
router.post('/update-expense', passport.authenticate('jwt', { session: false }), ExpensesCtrl.updateExpense)

module.exports = router