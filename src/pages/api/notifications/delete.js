import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
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

    const response = await axios.delete(
      `${process.env.API_URL}/notifications/delete`,
      {
        headers: { "Content-Type": "application/json", uid },
        data: { id: nid }, // `axios.delete` requires `data` for the request body
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: "Error deleting notification",
      error: error.response?.data || error.message,
    });
  }
}
