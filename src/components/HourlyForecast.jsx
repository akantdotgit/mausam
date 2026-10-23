import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { getWeatherInfo } from '../utils/weatherCodeMap';
import { formatTemperature } from "../utils/unitConversion";

function HourRow ({ time, weatherCode, temp, units }) {
    const { iconUrl, description } = getWeatherInfo(weatherCode);
    const timeLabel = new Date(time).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: 'true',
    });

    return (
        <div className="flex items-center justify-between bg-neutral-700 border border-neutral-600 rounded-md pl-2 pr-2.5 py-2">
            <div className="flex justify-center items-center gap-1.5">
                <img src={iconUrl} alt={description} className="w-6 h-6" />
                <span className="text-neutral-0 text-[16px]">{timeLabel}</span>
            </div>    
            <span className="text-neutral-0 text-[13px] font-normal">{formatTemperature(temp, units)}</span>
        </div>
    )
}

function DaySelector({ dailyDates, selectedDate, onSelect}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    const selectedLabel = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-1.5 bg-neutral-600 text-neutral-0 text-[13px] px-3 py-1 rounded-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-neutral-0 transition"><span>{selectedLabel}</span>
                <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-neutral-800 rounded-md shadow-lg overflow-hidden z-10 border border-neutral-600 p-1.5">
                    {dailyDates.map((date) => (
                        <button key={date} onClick={() => { onSelect(date); setIsOpen(false) }} className="w-full flex items-center justify-between px-1.5 py-2 text-[13px] text-neutral-0 rounded-md cursor-pointer hover:bg-neutral-700 focus:outline-none focus:bg-neutral-700 transition">
                            {new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}
                            {date === selectedDate && <Check size={16} />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

function HourlyForecast({ hourly, dailyDates, units }) {
    const [selectedDate, setSelectedDate] = useState(dailyDates?.[0] ?? null);

    if (!hourly || !selectedDate) return null;

    const hours = hourly.time.map((time, index) => ({
        time,
        weatherCode: hourly.weather_code[index],
        temp: hourly.temperature_2m[index],
    }));

    const hoursForSelectedDay = hours.filter((hour) => hour.time.startsWith(selectedDate));

    return (
        <div className="bg-neutral-800 min-w-75 h-full rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-neutral-0 font-medium">Hourly forecast</h3>
                <DaySelector dailyDates={dailyDates} selectedDate={selectedDate} onSelect={setSelectedDate} />
            </div>
            <div className="flex flex-col gap-3 max-h-100 overflow-y-auto focus:outline-none scrollbar-none">
                {hoursForSelectedDay.map((hour) => (
                    <HourRow key={hour.time} {...hour} units={units} />
                ))}
            </div>
        </div>
    )
}

export default HourlyForecast;