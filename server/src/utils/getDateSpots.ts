import fetch from "node-fetch";

export interface Spot {
  name: string;
  address: string;
  url?: string;
}

export const getDateSpots = async (
  lat: number,
  lng: number
): Promise<Spot[]> => {
  const API_KEY = process.env.FOURSQUARE_API_KEY!;
  const searchUrl = new URL("https://api.foursquare.com/v3/places/search");
  searchUrl.searchParams.set("ll", `${lat},${lng}`);
  searchUrl.searchParams.set("query", "romantic");
  searchUrl.searchParams.set("limit", "10");

  const searchRes = await fetch(searchUrl.toString(), {
    headers: { Authorization: API_KEY },
  });
  if (!searchRes.ok) throw new Error("Failed to fetch date spots");

  const { results } = await searchRes.json();
  return results.map((place: any) => ({
    name: place.name,
    address: place.location.formatted_address,
    url: place.geocodes?.main
      ? `https://foursquare.com/v/${place.fsq_id}`
      : undefined,
  }));
};