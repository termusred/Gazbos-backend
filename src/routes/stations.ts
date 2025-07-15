import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "lat and lng are required" });
  }

  try {
    const response = await axios.get("https://discover.search.hereapi.com/v1/discover", {
      params: {
        q: "gas station",
        at: `${lat},${lng}`,
        apiKey: process.env.HERE_API_KEY,
      },
    });

    res.json(response.data.items);
  } catch (err) {
    console.error("HERE API error:", err);
    res.status(500).json({ error: "Failed to fetch from HERE API" });
  }
});

export default router;
