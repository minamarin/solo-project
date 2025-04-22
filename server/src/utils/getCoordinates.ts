export const getCoordinates = async (
    placeName: string
  ): Promise<{ lat: number; lng: number }> => {
    const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY!;
    const encoded = encodeURIComponent(placeName);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json?access_token=${MAPBOX_API_KEY}&limit=1`;
  
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch coordinates");
  
    const data = await res.json();
    if (!data.features || !data.features.length) {
      throw new Error("No coordinates found");
    }
  
    const [lng, lat] = data.features[0].center;
    return { lat, lng };
  };