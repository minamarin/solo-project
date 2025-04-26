// src/api.ts

export const createTrip = async (trip: { destination: string; date: string }) => {
    const res = await fetch("http://localhost:5000/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip),
    });
    if (!res.ok) throw new Error("Failed to create trip");
    return res.json();
  };
  
  export const fetchDateSpots = async (lat: number, lng: number) => {
    const res = await fetch(
      `http://localhost:5000/api/date-spots?lat=${lat}&lng=${lng}`
    );
    if (!res.ok) throw new Error("Failed to load date spots");
    return res.json() as Promise<
      { name: string; address: string; url?: string }[]
    >;
  };
  
  export const deleteTrip = async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/trips/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete trip");
  };