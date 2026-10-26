export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing city query parameter" });
  }

  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}