import generateToken from "../../../utils/generateToken";
import axios from "axios";

export default async function handler(req, res) {
  const apiKey = process.env.ACCESS_KEY;
  const { id, email, token, access_token } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Generate new token
    const newToken = generateToken(userId, process.env.HMAC_KEY);

    let api_response;

    if (email) {
      api_response = await axios.post(
        `${process.env.API_URL}/user`,
        {
          id,
          email,
          "access-token": access_token,
        },
        { headers: { key: apiKey } }
      );
    } else if (token) {
      api_response = await axios.post(
        `${process.env.API_URL}/user`,
        { id, token },
        { headers: { key: apiKey } }
      );
    }

    return res.status(200).json({ token: newToken });
  } catch (error) {
    console.error('Error regenerating token:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 