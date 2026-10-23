import { formatTemperature } from '../utils/unitConversion';
import { getWeatherInfo } from '../utils/weatherCodeMap';

function DayCard({ date, weatherCode, high, low, units }) {
  const { description, iconUrl } = getWeatherInfo(weatherCode);
  const dayLabel = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className='bg-neutral-800 rounded-lg border border-neutral-700 p-2 flex flex-col items-center gap-2 max-w-22.5'>
      <p className='text-sm text-neutral-0'>{dayLabel}</p>
      <img src={iconUrl} alt={description} className='w-12 h-12' />
      <div className='flex gap-6 text-sm'>
        <span className='text-neutral-200 text-[12px] font-medium'>{formatTemperature(high, units)}</span>
        <span className='text-neutral-200 text-[12px] font-medium'>{formatTemperature(low, units)}</span>
      </div>
    </div>
  );
}

function DailyForecast({ daily, units }) {
  if (!daily) return null;

  const days = daily.time.map((date, index) => ({
    date,
    weatherCode: daily.weather_code[index],
    high: daily.temperature_2m_max[index],
    low: daily.temperature_2m_min[index],
  }));
  
  return (
    <div className='mt-6'>
      <h3 className='text-white font-medium mb-3'>Daily forecast</h3>
      <div className='w-full flex gap-3 overflow-x-scroll pb-2 scrollbar-none'>
        {days.map((day) => (
          <DayCard key={day.date} {...day} units={units} />
        ))}
      </div>
    </div>
  )
}

export default DailyForecast;