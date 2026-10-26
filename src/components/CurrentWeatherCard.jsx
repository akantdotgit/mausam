import bglarge from '../assets/images/bg-today-large.svg';
import bgsmall from '../assets/images/bg-today-small.svg';
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
        <div style={{ '--bg-mobile': `url(${bgsmall})`, '--bg-desktop': `url(${bglarge})` }} className="min-h-45 rounded-2xl bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)] bg-cover bg-center bg-no-repeat py-8 md:p-6 flex flex-col md:flex-row items-center justify-between">
            <div>
                <h2 className="text-center md:text-left text-[28px] md:text-xl font-bold text-neutral-0">
                    {name}{country? `, ${country}` : ''}
                </h2>
                <p className="text-[16px] md:text-sm text-neutral-0/70 text-center md:text-left mt-1.25 mb-6 font-medium">{dateStr}</p>
            </div>
            <div className="flex items-center gap-8">
                <img src={iconUrl} alt={description} className="w-28 h-28 md:w-20 md:h-20" />
                <span className="text-8xl md:text-6xl font-bold text-white">
                    {formatTemperature(temperature, units)}
                </span>
            </div>
        </div>
    )
}

export default CurrentWeatherCard;