import { Router } from "express";
import { getDateSpots } from "../utils/getDateSpots.ts";

const router = Router();

router.get("/", async (req, res) => {
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);
  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing coords" });
  }
  try {
    const spots = await getDateSpots(lat, lng);
    res.json(spots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch date spots" });
  }
});

export default router;