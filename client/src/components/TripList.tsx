// client/src/components/TripList.tsx
import React, { useEffect, useState } from "react";
import DateSpots from "./DateSpots";
import { deleteTrip } from "../api";

interface Trip {
  _id: string;
  destination: string;
  date: string;
  coords: { lat: number; lng: number };
  weather: { temp: number; summary: string; icon?: string };
}

const TripList: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/trips");
        const data: Trip[] = await res.json();
        setTrips(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this trip?")) return;
    setLoading(true);
    try {
      await deleteTrip(id);
      setTrips((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Updating trips…</p>;

  return (
    <div className="mt-6 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Your Trips</h2>
      {trips.length === 0 ? (
        <p className="text-gray-500">No trips yet.</p>
      ) : (
        <ul className="space-y-6">
          {trips.map((trip) => (
            <li
              key={trip._id}
              className="p-4 bg-gray-50 rounded-lg shadow-inner"
            >
              <h3 className="text-lg font-medium">
                {trip.destination}
              </h3>
              <p>
                Date: {new Date(trip.date).toLocaleDateString()}
              </p>
              <p>
                Weather: {trip.weather.summary} – {trip.weather.temp}°C
              </p>
              <div className="mt-3 flex items-center space-x-3">
                <button
                  onClick={() => handleDelete(trip._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete Trip
                </button>
                <DateSpots
                  lat={trip.coords.lat}
                  lng={trip.coords.lng}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TripList;