import axios from "axios";
import * as cookie from "cookie";

export default async function handler(req, res) {
  const { authorization } = req.headers;
  // const cookies = cookie.parse(req.headers.cookie || "");
  // if (!cookies.access_token)
  //   return res.status(401).json({ error: "Unauthorized" });

  try {
    const response = await axios.get("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${authorization}` },
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
}
