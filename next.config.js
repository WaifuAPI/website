// next.config.js
const dotenv = require("dotenv");

dotenv.config({ path: require("find-config")(".env") });
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URL: process.env.REDIRECT_URL,
    HMAC_KEY: process.env.HMAC_KEY,
    API_URL: process.env.API_URL,
    BOT_TOKEN: process.env.BOT_TOKEN,
    GUILD_ID: process.env.GUILD_ID,
    BETA_ROLE_ID: process.env.BETA_ROLE_ID
  },
};

module.exports = nextConfig;
