import axios from "axios";

export default async function handler(req, res) {
  const { method, body } = req;
  const { id, email, username, token, access_token } = body;
  const apiKey = process.env.ACCESS_KEY;

  if (method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  if (!id && !token) {
    return res.status(400).json({ message: "User ID and Token are required" });
  }

  try {
    let api_response;

    if (email) {
      // Call GET endpoint
      api_response = await axios.post(
        `${process.env.API_URL}/user`,
        {
          id,
          email,
          username,
          "access-token": access_token,
        },
        { headers: { key: apiKey } }
      );
    } else if (token) {
      // Call POST endpoint
      api_response = await axios.post(
        `${process.env.API_URL}/user`,
        { id, token },
        { headers: { key: apiKey } }
      );
    }

    return res.json(api_response.data);
  } catch (error) {
    console.error("API request error:", error.message);
    return res
      .status(error.response?.status || 500)
      .json({ error: error.response?.data || "Internal Server Error" });
  }
}
