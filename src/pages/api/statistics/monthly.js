import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const response = await axios.get(`${process.env.API_URL}/stats/monthly`, {
      headers: { key: process.env.ACCESS_KEY },
    });

    const data = transformApiResponse(response.data).slice(-5);
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
  const monthMap = {
    jan: "Jan",
    feb: "Feb",
    mar: "Mar",
    apr: "Apr",
    may: "May",
    jun: "Jun",
    jul: "Jul",
    aug: "Aug",
    sep: "Sep",
    oct: "Oct",
    nov: "Nov",
    dec: "Dec",
  };

  return Object.keys(data).map((month) => ({
    name: monthMap[month.toLowerCase()] || month, // Preserve original order
    requests: data[month].usage || 0, // Extract usage
  }));
}
