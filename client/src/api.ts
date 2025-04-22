// src/api.ts
export const createTrip = async (trip: { destination: string; date: string }) => {
    const res = await fetch("http://localhost:5000/api/trips", {  // ← note port 5000
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip),
    });
    if (!res.ok) throw new Error("Failed to create trip");
    return res.json();
  };