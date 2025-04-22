import { Router } from "express";
import { createTrip, getTrips, deleteTrip } from "../controllers/tripController.js";

const router = Router();

router.post("/", createTrip);
router.get("/", getTrips);
router.delete("/:id", deleteTrip);

export default router;