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
    <div className="mt-2">
      <h4 className="font-semibold">Date Spot Recommendations</h4>
      <ul className="list-disc list-inside">
        {spots.map((s, i) => (
          <li key={i} className="mt-1">
            <a
              href={s.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {s.name}
            </a>
            <p className="text-sm">{s.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DateSpots;