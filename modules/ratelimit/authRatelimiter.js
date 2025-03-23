const rateLimit = require("express-rate-limit");
const RedisStore = require('rate-limit-redis');


const redis = require('../database/redis');

const registerRateLimiter = rateLimit({
   
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 1000, // limit each IP to 3 requests per window Ms
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many accounts created, please try again in 10 minutes"
});

const loginRateLimiter = rateLimit({
    keyGenerator: (req) => {
        console.log("Request IP:", req.ip);  // พิมพ์ IP ที่ได้ออกมา
        return req.ip;
    },
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 1000, // limit each IP to 10 requests per window Ms
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many attempt to login, please try again in 10 minutes"
});

module.exports = {
    registerRateLimiter, loginRateLimiter
}