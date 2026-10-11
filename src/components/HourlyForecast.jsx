import { useState } from "react";
import { getWeatherInfo } from '../utils/weatherCodeMap';

function HourRow ({ time, weatherCode, temp }) {
    const { iconUrl, description } = getWeatherInfo(weatherCode);
    const timeLabel = new Date(time).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: 'true',
    });

    return (
        <div className="flex items-center justify-between bg-slate-800 rounded-lg border border-slate-700 p-2">
            <div className="flex justify-center items-center gap-1.5">
                <img src={iconUrl} alt={description} className="w-6 h-6" />
                <span className="text-slate-300">{timeLabel}</span>
            </div>    
            <span className="text-white font-semibold">{Math.round(temp)}°</span>
        </div>
    )
}

function HourlyForecast({ hourly, dailyDates }) {
    const [selectedDate, setSelectedDate] = useState(dailyDates?.[0] ?? null);

    if (!hourly || !selectedDate) return null;

    const hours = hourly.time.map((time, index) => ({
        time,
        weatherCode: hourly.weather_code[index],
        temp: hourly.temperature_2m[index],
    }));

    const hoursForSelectedDay = hours.filter((hour) => hour.time.startsWith(selectedDate));

    return (
        <div className="bg-slate-900 min-w-75 h-full rounded-xl border border-slate-700 p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">Hourly forecast</h3>
                <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="bg-slate-800 text-white text-sm rounded-md border border-slate-700 px-1.5 py-1">
                    {dailyDates.map((date) => (
                        <option key={date} value={date}>
                            {new Date(date).toLocaleDateString('en-US', { weekday: 'long'})}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2.25 max-h-100 overflow-y-auto scrollbar-none">
                {hoursForSelectedDay.map((hour) => (
                    <HourRow key={hour.time} {...hour} />
                ))}
            </div>
        </div>
    )
}

export default HourlyForecast;