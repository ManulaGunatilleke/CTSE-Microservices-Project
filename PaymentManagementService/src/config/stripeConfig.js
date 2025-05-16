// config/stripeConfig.js
require('dotenv').config();

const stripeSecretKey = process.env.SECRET_KEY;
module.exports = stripeSecretKey;
