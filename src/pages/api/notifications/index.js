export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { uid } = req.headers;

    const response = fetch(`${process.env.API_URL}/notifications`, {
      method: "GET",
      headers: { "Content-Type": "application/json", uid },
    });

    if (!response.ok) {
      const errorData = await response.text();
      return res
        .status(response.status)
        .json({ message: "Error fetching notifications", error: errorData });
    }

    const data = await response.json();
    res.status(200).json(data.notifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
