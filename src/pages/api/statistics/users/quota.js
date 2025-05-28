import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const response = await axios.get(
      `${process.env.API_URL}/stats/users?type=quota&top=5`,
      {
        headers: { key: process.env.ACCESS_KEY },
      }
    );
    const data = await transformResponseData(response.data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({
      message: "Error fetching statistics",
      error: error.response?.data || error.message,
    });
  }
}

function transformResponseData(data) {
  return data
    .map((item) => ({
      name: item.username,
      balance: item.req_quota.toLocaleString(), // Format with commas
    }))
    .sort((a, b) => b.balance.replace(/,/g, "") - a.balance.replace(/,/g, "")) // Sort by balance (descending)
    .map((item, index) => ({ ...item, rank: index + 1 })); // Assign rank
}
