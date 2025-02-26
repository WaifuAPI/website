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
      return res
        .status(401)
        .json({ message: "You have to provide an User ID" });
    }

    const response = await fetch(
      `${process.env.API_URL}/notifications/delete`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json", uid: uid },
        body: JSON.stringify({ id: nid }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return res
        .status(response.status)
        .json({ message: "Error deleting notification", error: errorData });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
