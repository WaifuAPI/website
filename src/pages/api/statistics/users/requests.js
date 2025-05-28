import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const response = await axios.get(
      `${process.env.API_URL}/stats/users?type=requests&top=5`,
      {
        headers: { key: process.env.ACCESS_KEY },
      }
    );

    const data = transformToTopUsers(response.data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({
      message: "Error fetching statistics",
      error: error.response?.data || error.message,
    });
  }
}

function transformToTopUsers(responseData) {
  return responseData
    .map((item) => ({
      name: item.username,
      requests: item.count, // Keeping it as a number for consistency
    }))
    .sort((a, b) => b.requests - a.requests) // Sort by requests in descending order
    .map((item, index) => ({ ...item, rank: index + 1 })); // Assign rank
}
