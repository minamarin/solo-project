export const getWeather = async (
    lat: number,
    lon: number
  ): Promise<{ temp: number; summary: string; icon: string }> => {
    const API_KEY = process.env.OPENWEATHER_API_KEY!;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch weather");
  
    const data = await res.json();
  
    return {
      temp: data.main.temp,
      summary: data.weather[0].description,
      icon: data.weather[0].icon,
    };
  };