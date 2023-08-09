import axios from "axios";

async function checkGuildMembershipAndRole(accessToken) {
  const guildsResponse = await axios.get(
    "https://discord.com/api/v10/users/@me/guilds",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const targetGuildId = process.env.GUILD_ID; // Replace with the actual guild ID
  const userGuild = guildsResponse.data.find(
    (guild) => guild.id === targetGuildId
  );

  if (!userGuild) {
    // User is not in the guild, add them
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

  // Fetch the user's roles in the guild
  const guildMemberResponse = await axios.get(
    `https://discord.com/api/v10/guilds/${targetGuildId}/members/@me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Check if the user has the required role in the guild
  const requiredRole = process.env.BETA_ROLE_ID; // Replace with the actual role name
  const userRoles = guildMemberResponse.data.roles;
  const hasRequiredRole = userRoles.includes(requiredRole);

  return hasRequiredRole;
}

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

    const hasRequiredRole = await checkGuildMembershipAndRole(accessToken);

    if (!hasRequiredRole) {
      // Redirect the user to a page indicating they are not a beta tester
      return res.redirect("/not-beta-tester");
    }

    res.status(200).json({ access_token: accessToken });
  } catch (error) {
    console.error("Authentication error", error);
    res.status(500).json({ error: "An error occurred during authentication." });
  }
}
