import { formatPercipitation, formatTemperature, formatWindSpeed } from "../utils/unitConversion";

function MetricTile({ label, value }) {
  return (
    <div className="bg-neutral-800 flex flex-col gap-2.5 rounded-[10px] border border-neutral-700 px-3.5 py-3">
      <p className="text-lg md:text-[15px] text-neutral-200">{label}</p>
      <p className="text-[33px] md:text-2xl font-light text-neutral-0 mt-1">{value}</p>
    </div>
  )
}

function MetricsGrid({ data, units }) {
  const { current: { feels_like, humidity, wind_speed, precipitation } } = data;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4.5 mt-6 mb-3">
      <MetricTile label="Feels Like" value={formatTemperature(feels_like, units)} />
      <MetricTile label="Humidity" value={`${humidity}%`} />
      <MetricTile label="Wind" value={formatWindSpeed(wind_speed, units)} />
      <MetricTile label="Precipitation" value={formatPercipitation(precipitation, units)} />
    </div>
  )
}

export default MetricsGrid;