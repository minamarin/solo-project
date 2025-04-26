import React, { useEffect, useState } from "react";
import { fetchDateSpots } from "../api";

interface Spot {
  name: string;
  address: string;
  url?: string;
}

interface DateSpotsProps {
  lat: number;
  lng: number;
}

const DateSpots: React.FC<DateSpotsProps> = ({ lat, lng }) => {
  const [spots, setSpots] = useState<Spot[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDateSpots(lat, lng)
      .then(setSpots)
      .catch((err) => setError(err.message));
  }, [lat, lng]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!spots) return <p>Loading date spots…</p>;

  return (
    <div className="mt-2 space-y-4">
      <h4 className="font-semibold">Date Spot Recommendations</h4>
      {spots.map((s, i) => (
        <div key={i} className="p-3 border rounded">
          <a
            href={s.url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline"
          >
            {s.name}
          </a>
          <p className="text-sm text-gray-600">{s.address}</p>
        </div>
      ))}
    </div>
  );
};

export default DateSpots;