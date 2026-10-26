import { formatTemperature } from '../utils/unitConversion';
import { getWeatherInfo } from '../utils/weatherCodeMap';

function DayCard({ date, weatherCode, high, low, units }) {
  const { description, iconUrl } = getWeatherInfo(weatherCode);
  const dayLabel = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className='bg-neutral-800 rounded-lg border border-neutral-700 p-2 flex flex-col items-center gap-2 w-20 shrink-0'>
      <p className='text-[16px] md:text-sm text-neutral-0'>{dayLabel}</p>
      <img src={iconUrl} alt={description} className='w-15 h-15' />
      <div className='flex gap-6 text-sm'>
        <span className='text-neutral-200 text-[15px] md:text-[12px] font-medium'>{formatTemperature(high, units)}</span>
        <span className='text-neutral-200 text-[15px] md:text-[12px] font-medium'>{formatTemperature(low, units)}</span>
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
    <div className='w-full max-w-[632px] flex flex-col mx-auto mt-6 mb-2'>
      <h3 className='text-neutral-0 text-[19px] md:text-sm font-medium mb-4'>Daily forecast</h3>
      <div className='w-[calc(100vw-35px)] sm:w-full flex overflow-x-scroll scrollbar-none scroll-smooth gap-3'>
        {days.map((day) => (
          <DayCard key={day.date} {...day} units={units} />
        ))}
      </div>
    </div>
  )
}

export default DailyForecast;