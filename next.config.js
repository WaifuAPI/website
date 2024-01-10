// next.config.js
const dotenv = require("dotenv");

dotenv.config({ path: require("find-config")(".env") });
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URL: process.env.REDIRECT_URL,
    HMAC_KEY: process.env.HMAC_KEY,
    API_URL: process.env.API_URL,
    BOT_TOKEN: process.env.BOT_TOKEN,
    GUILD_ID: process.env.GUILD_ID,
  },
  images: {
    domains: ["cdn.discordapp.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/avatars/**", // Adjust the pathname to match your use case
      },
    ],
  },
};

module.exports = nextConfig;
