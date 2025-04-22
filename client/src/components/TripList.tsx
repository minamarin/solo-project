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
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const res = await fetch("http://localhost:5000/api/trips");
    const data: Trip[] = await res.json();
    setTrips(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this trip?")) return;
    setLoading(true);
    try {
      await deleteTrip(id);
      await fetchTrips(); // refresh list
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Updating trips…</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Trips</h2>
      <ul>
        {trips.map((trip) => (
          <li
            key={trip._id}
            className="mb-6 p-4 border border-gray-200 rounded flex flex-col space-y-2"
          >
            <div>
              <h3 className="text-lg font-medium">{trip.destination}</h3>
              <p>Date: {new Date(trip.date).toLocaleDateString()}</p>
              <p>
                Weather: {trip.weather.summary} – {trip.weather.temp}°C
              </p>
            </div>

            {/* Delete button */}
            <button
              onClick={() => handleDelete(trip._id)}
              className="self-start bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Delete Trip
            </button>

            {/* Date spot recommendations */}
            <DateSpots lat={trip.coords.lat} lng={trip.coords.lng} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;