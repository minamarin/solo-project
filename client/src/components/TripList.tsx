import React, { useEffect, useState } from "react";

interface Trip {
  destination: string;
  date: string;
  weather: {
    temp: number;
    summary: string;
  };
}

const TripList: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const response = await fetch("http://localhost:5000/api/trips");
    const data = await response.json();
    setTrips(data);  // Set the trips in state
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Trips</h2>
      <ul>
        {trips.map((trip, idx) => (
          <li key={idx} className="mb-4 p-4 border border-gray-200 rounded">
            <h3 className="text-lg font-medium">{trip.destination}</h3>
            <p>Date: {new Date(trip.date).toLocaleDateString()}</p>
            <p>Weather: {trip.weather.summary} - {trip.weather.temp}°C</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;