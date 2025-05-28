import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { uid } = req.headers;

    const response = await axios.get(`${process.env.API_URL}/notifications`, {
      headers: { "Content-Type": "application/json", uid },
    });

    res.status(200).json(response.data.notifications);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({
      message: "Error fetching notifications",
      error: error.response?.data || error.message,
    });
  }
}
