import { Router } from "express";
import { getDateSpots } from "../utils/getDateSpots.ts";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ error: "Missing coords" });
    const spots = await getDateSpots(Number(lat), Number(lng));
    res.json(spots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch date spots" });
  }
});

export default router;
