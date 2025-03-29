import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const response = await axios.get(`${process.env.API_URL}/stats/popular`, {
      headers: { key: process.env.ACCESS_KEY },
    });

    const data = transformApiResponse(response.data).slice(0, 6); // Always return top 6

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({
      message: "Error fetching statistics",
      error: error.response?.data || error.message,
    });
  }
}

function transformApiResponse(data) {
  return Object.entries(data)
    .sort((a, b) => b[1] - a[1]) // Sort by value in descending order
    .map(([endpoint, requests], index) => ({
      rank: index + 1,
      endpoint: capitalize(endpoint),
      requests,
    }));
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
