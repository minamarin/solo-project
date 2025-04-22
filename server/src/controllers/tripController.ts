import { Request, Response } from 'express';
import Trip from '../models/Trip.ts';
import { getCoordinates } from '../utils/getCoordinates.ts';
import { getWeather } from '../utils/getWeather.ts';

// server/src/controllers/tripController.ts
export const createTrip = async (req: Request, res: Response) => {
  try {
    const { destination, date } = req.body;

    // Log the incoming data to verify it's being received correctly
    console.log("Received trip data:", { destination, date });

    const coords = await getCoordinates(destination);
    const weather = await getWeather(coords.lat, coords.lng);

    const newTrip = await Trip.create({
      destination,
      date,
      coords,
      weather,
    });

    res.status(201).json(newTrip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create trip" });
  }
};

export const getTrips = async (_req: Request, res: Response) => {
  try {
    const trips = await Trip.find().sort({ date: 1 });
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};

export const deleteTrip = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Trip.findByIdAndDelete(id);
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete trip' });
  }
};
