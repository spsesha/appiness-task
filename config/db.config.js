module.exports = {
    host: process.env.MONGO_URL || 'localhost',
    port: process.env.MONGO_PORT || '27017',
    db: 'mean-app'
}