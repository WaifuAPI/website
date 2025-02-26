import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { page, role, check } = req.query;

  if (!page) {
    return res.status(400).json({ error: "Page ID is required" });
  }

  const headers = { Key: process.env.ACCESS_KEY };
  try {
    let response;
    switch (check) {
      case "status":
        response = await axios.get(`${process.env.API_URL}/pages/${page}/status`, {
          headers,
        });
        break;
      case "meta":
        response = await axios.get(`${process.env.API_URL}/pages/${page}/meta`, {
          headers,
        });
        break;
      case "access":
        if (!role) {
          return res
            .status(400)
            .json({ error: "Role is required for access check" });
        }
        response = await axios.get(
          `${process.env.API_URL}/pages/${page}/access?role=${role}`,
          { headers }
        );
        break;
      case "info":
        response = await axios.get(`${process.env.API_URL}/pages/${page}`, {
          headers,
        });
        break;
      default:
        response = await axios.get(`${process.env.API_URL}/pages/${page}`, {
          headers,
        });
        break;
    }

    return res
      .status(response.status)
      .json({ status: "ok", page: response.data });
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
    return res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || "Internal Server Error",
    });
  }
}
