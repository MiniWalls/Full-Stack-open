require('dotenv').config()

const PORT = process.env.PORT || 3003
const URL = process.env.DB_URL

module.exports = {
    URL,
    PORT
}