const User = require('../db/schemas/users.db'),
    ObjectId = require('mongoose').Types.ObjectId

module.exports.getExpenses = (req, res, next) => {
    User.findOne({_id: req.user}, { budget: 1, categories: 1, _id: 0 })
        .exec((err, data) => {
            if(err) return next(err)
            res.json(data)
        })
}

module.exports.addCategory = (req, res, next) => {
    User.findOneAndUpdate({_id: req.user}, {$addToSet: {categories: req.body.category}})
        .exec((err, data) => {
            if(err) return next(err)
            res.json()
        })
}

module.exports.removeCategory = (req, res, next) => {
    User.findOneAndUpdate({_id: req.user}, {$pull: {categories: req.body.category}})
        .exec((err, data) => {
            if(err) return next(err)
            res.json()
        })
}

module.exports.updateBudget = (req, res, next) => {
    User.findOneAndUpdate({_id: req.user}, {$set: {budget: req.body.budget}})
        .exec((err, data) => {
            if(err) return next(err)
            res.json()
        })
}

module.exports.expenseSummary = (req, res, next) => {
    let page = parseInt(req.query.page) || 1
    let limit = 10
    User.aggregate([
        {'$match': { '_id': ObjectId(req.user)}},
        {'$project': {'expenses': 1, _id: 0}},
        {'$addFields': { 'total_expense': {'$size': '$expenses'} } },
        {'$unwind': '$expenses'},
        {'$sort': { 'expenses.createdAt': -1 }},
        {'$skip': (page-1)*10},
        {'$limit': limit },
        {'$group': {_id: '$_id', 'total_expense': {'$first': '$total_expense'}, 'expenses': {$push: '$expenses'}}},
        {'$project': {'expenses': 1, 'total_expense': 1, _id: 0 }}
    ]).exec((err, data) => {
        if(err) return next(err)
        res.json(data[0])
    })
}

module.exports.addExpense = (req, res, next) => {
    User.findOneAndUpdate({_id: req.user}, {$push: {expenses: req.body}})
        .exec((err, data) => {
            if(err) return next(err)
            res.json()
        })
}

module.exports.budgetSummary = (req, res, next) => {
    User.aggregate([
        {'$match': { '_id': ObjectId(req.user)}},
        {'$addFields': {'expenseTotal': {
            '$reduce': {
                'input': '$expenses',
                'initialValue': 0,
                'in': { '$add': ['$$value', '$$this.amount']}
            }
        }}},
        {'$project': { 'budget': 1, 'expenseTotal': 1, _id: 0}}
    ]).exec((err, data) => {
        if(err) return next(err)
        res.json(data[0])
    })
}

module.exports.categorySummary = (req, res, next) => {
    User.aggregate([
        {'$match': {'_id': ObjectId(req.user)}},
        {'$project': {'expenses': 1, _id: 0}},
        {'$unwind': '$expenses'},
        {'$group': {_id: '$expenses.category', 'amount': {'$sum': '$expenses.amount'}}}
    ]).exec((err, data) => {
        if(err) return next(err)
        res.json(data)
    })
}

module.exports.updateExpense = (req, res, next) => {
    User.findOneAndUpdate({
        '$and': [
            {'_id': req.user},
            {'expenses._id': req.body.id}
        ]
    }, {
        '$set': {'expenses.$': req.body}
    }).exec((err, data) => {
        if(err) return next(err);
        res.json()
    })
}