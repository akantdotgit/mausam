import bglarge from '../assets/images/bg-today-large.svg';
import { formatTemperature } from '../utils/unitConversion';

function CurrentWeatherCard({ data, units }) {
    const { name, country, current: { temperature, description, weather_icon } } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather_icon}@4x.png`

    const dateStr = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div style={{ backgroundImage: `url(${bglarge})` }} className="min-h-45 rounded-2xl bg-cover bg-center p-6 flex items-center justify-between">
            <div>
                <h2 className="text-xl font-bold text-neutral-0">
                    {name}{country? `, ${country}` : ''}
                </h2>
                <p className="text-sm text-neutral-0/70 mt-1">{dateStr}</p>
            </div>
            <div className="flex items-center gap-2">
                <img src={iconUrl} alt={description} className="w-18 h-18 sm:w-20 sm:h-20" />
                <span className="text-6xl font-bold text-white">
                    {formatTemperature(temperature, units)}
                </span>
            </div>
        </div>
    )
}

export default CurrentWeatherCard;