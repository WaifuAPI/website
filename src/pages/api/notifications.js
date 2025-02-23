export default async function handler(req, res) {
  try {
    const { uid } = req.headers;
    // Construct the external API URL with query parameters
    const apiUrl = `http://localhost:4000/api/v4/notifications`;

    // Call the external API with the required headers
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        uid: uid,
      },
    });

    // Handle errors from the external API
    if (!response.ok) {
      const errorData = await response.text(); // Capture the error response
      console.error("API Error Response:", errorData);
      return res
        .status(response.status)
        .json({ message: "Error fetching membership data", error: errorData });
    }

    // Parse and return the response
    const data = await response.json();
    res.status(200).json(data.notifications);
  } catch (error) {
    console.error("Internal Server Error:", error); // Log full error details
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
