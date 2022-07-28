require('dotenv').config();

module.exports = {
    PORT : process.env.PORT,
    MONGO_URL : process.env.MONGODB_URL,
    PRIVATE_KEY  : process.env.PRIVATE_KEY
}