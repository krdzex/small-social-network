require("dotenv").config()
const config = {
    port: process.env.PORT || 4400,
    jwtSecret: process.env.JWT_SECRET ||  "YOUR_secret_key",
    mongoUri: process.env.MONGO || "mongodb://localhost:27017/db-name"
}
export default config;