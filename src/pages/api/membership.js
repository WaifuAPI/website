export default async function handler(req, res) {
  try {
    // Construct the external API URL with query parameters
    const queryParams = req.url.includes("?") ? req.url.split("?")[1] : "";
    const apiUrl = `${process.env.API_URL}/membership${
      queryParams ? `?${queryParams}` : ""
    }`;

    // Call the external API with the required headers
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        key: process.env.ACCESS_KEY,
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
    res.status(200).json(data);
  } catch (error) {
    console.error("Internal Server Error:", error); // Log full error details
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
