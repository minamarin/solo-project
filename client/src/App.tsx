import React, { useState } from "react";
import TripForm from "./components/TripForm";
import TripList from "./components/TripList";
import { createTrip } from "./api";  // Helper function to send data to backend

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleTripSubmit = async (trip: { destination: string; date: string }) => {
    setLoading(true); // Set loading state
    try {
      const newTrip = await createTrip(trip); // Send data to the backend
      console.log("New Trip:", newTrip); // Log the response
      setLoading(false); // Set loading to false after receiving the response
    } catch (error) {
      console.error("Error creating trip:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Trip Planner</h1>
      <TripForm onSubmit={handleTripSubmit} />
      {loading ? <p>Loading...</p> : <TripList />}
    </div>
  );
};

export default App;