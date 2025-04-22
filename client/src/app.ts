export const createTrip = async (trip: { destination: string; date: string }) => {
    const response = await fetch("http://localhost:5000/api/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trip),
    });
    return response.json();
  };