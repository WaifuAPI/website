import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { uid } = req.headers;
    const { nid } = req.body;

    if (!nid) {
      return res.status(400).json({ message: "Missing notificationId" });
    }

    const isGlobal = nid.includes("G");
    if (isGlobal && !uid) {
      return res.status(401).json({ message: "You have to provide a User ID" });
    }

    const response = await axios.patch(
      `${process.env.API_URL}/notifications/read`,
      { id: nid },
      { headers: { "Content-Type": "application/json", uid } }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: "Error marking notification as read",
      error: error.response?.data || error.message,
    });
  }
}
