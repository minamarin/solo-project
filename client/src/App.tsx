// client/src/App.tsx
import React, { useState } from 'react';
import TripForm from './components/TripForm';
import TripList from './components/TripList';
import BackgroundMusic from './components/BackgroundMusic';
import { createTrip } from './api';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleTripSubmit = async (trip: { destination: string; date: string }) => {
    setLoading(true);
    try {
      await createTrip(trip);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 bg-opacity-80 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-rocker text-pink-700">
          Trip Planner
        </h1>
        <BackgroundMusic />
      </div>

      {/* REST OF APP */}
      <TripForm onSubmit={handleTripSubmit} />
      {loading ? (
        <p className="text-center mt-4">Loading…</p>
      ) : (
        <TripList />
      )}
    </div>
  );
};

export default App;