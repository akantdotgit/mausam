const WMO_TO_OWM_ICON = {
  0: {base: '01', description: 'clear sky'},
  1: { base: '02', description: 'mainly clear' },
  2: { base: '03', description: 'partly cloudy' },
  3: { base: '04', description: 'overcast' },
  45: { base: '50', description: 'fog' },
  48: { base: '50', description: 'depositing rime fog' },
  51: { base: '09', description: 'light drizzle' },
  53: { base: '09', description: 'moderate drizzle' },
  55: { base: '09', description: 'dense drizzle' },
  61: { base: '10', description: 'slight rain' },
  63: { base: '10', description: 'moderate rain' },
  65: { base: '10', description: 'heavy rain' },
  71: { base: '13', description: 'slight snow' },
  73: { base: '13', description: 'moderate snow' },
  75: { base: '13', description: 'heavy snow' },
  80: { base: '09', description: 'rain showers' },
  81: { base: '09', description: 'moderate rain showers' },
  82: { base: '09', description: 'violent rain showers' },
  95: { base: '11', description: 'thunderstorm' },
  96: { base: '11', description: 'thunderstorm with hail' },
  99: { base: '11', description: 'severe thunderstorm with hail' },
}

export function getWeatherInfo(wmoCode, isDay = true) {
  const match = WMO_TO_OWM_ICON[wmoCode] ?? { base: '01', description: 'unknown' };
  const suffix = isDay ? 'd' : 'n';

  return {
    description: match.description,
    iconUrl: `https://openweathermap.org/img/wn/${match.base}${suffix}@2x.png`,
  };
};