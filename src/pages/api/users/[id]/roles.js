import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const response = await axios.get(
      `${process.env.API_URL}/user/profile/${id}`,
      {
        headers: {
          key: process.env.ACCESS_KEY,
        },
      }
    );

    return res.status(200).json({ roles: response.data.roles });
  } catch (error) {
    console.log(
      `${error.response?.data?.message || "Internal Server Error"} (${
        error.config?.url || "Unknown URL"
      })`
    );
    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || "Internal Server Error",
    });
  }
}
