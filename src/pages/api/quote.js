// api/quote.js
import axios from 'axios'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { Authorization } = req.headers

    if (!Authorization) {
      return res
        .status(401)
         .json({ status: 401, message: 'Invalid API key. Go to https://docs.waifu.it for more info.' })
    }

    try {
      const response = await axios.get(`${process.env.API_URL}/quote`, {
        headers: {
          Authorization: Authorization,
        },
      })
      res.json(response.data)
    } catch (error) {
      console.error('Error performing the request')
      res.status(500).json({ error: 'Error performing the request' })
    }
  } else {
    return res.status(405).end() // Method Not Allowed for other request types
  }
}
