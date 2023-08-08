import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { code } = req.body;

    const response = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.REDIRECT_URL,
        scope: "identify%20email",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = response.data.access_token;

    // Step 2: Get user's guilds (servers) using the access token
    const guildsResponse = await axios.get(
      "https://discord.com/api/v10/users/@me/guilds",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Find the specific guild by its ID
    const targetGuildId = process.env.GUILD_ID; // Replace with the actual guild ID
    const userGuild = guildsResponse.data.find(
      (guild) => guild.id === targetGuildId
    );

    if (!userGuild) {
      await axios.put(
        `https://discord.com/api/v10/guilds/${targetGuildId}/members/@me`,
        {},
        {
          headers: {
            Authorization: `Bot ${process.env.BOT_TOKEN}`, // Replace with your bot token
          },
        }
      );
    }

    res.status(200).json({ access_token: accessToken });
  } catch (error) {
    console.error("Authentication error", error);
    res.status(500).json({ error: "An error occurred during authentication." });
  }
}
