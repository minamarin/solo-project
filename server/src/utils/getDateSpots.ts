/**
 * Fetches top 5 romantic date‑spots near given coords.
 */
export const getDateSpots = async (
    lat: number,
    lng: number
  ): Promise<{ name: string; address: string; url?: string }[]> => {
    const API_KEY = process.env.FOURSQUARE_API_KEY!;
    const url = new URL("https://api.foursquare.com/v3/places/search");
    url.searchParams.set("ll", `${lat},${lng}`);
    url.searchParams.set("query", "romantic");
    url.searchParams.set("limit", "5");
  
    const res = await fetch(url.toString(), {
      headers: { Authorization: API_KEY },
    });
    if (!res.ok) throw new Error("Failed to fetch date spots");
    const data = await res.json();
    return data.results.map((place: any) => ({
      name: place.name,
      address: place.location.formatted_address,
      url: place.geocodes?.main
        ? `https://foursquare.com/v/${place.fsq_id}`
        : undefined,
    }));
  };