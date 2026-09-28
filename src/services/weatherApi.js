const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function fetchCurrentWeather(city) {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);

    if (!res.ok) {
        if (res.status === 404) throw new Error('City not found');
        throw new Error('Something went wrong. Please try again.');
    }
    const data = await res.json();
    
    return {
        name: data.name,
        country: data.sys.country,
        current: {
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
            precipitation: data.rain?.['1h'] ?? 0,
            weather_icon: data.weather[0].icon,
            description: data.weather[0].description,
        }
    }
}