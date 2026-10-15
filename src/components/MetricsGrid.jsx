import { formatPercipitation, formatTemperature, formatWindSpeed } from "../utils/unitConversion";

function MetricTile({ label, value }) {
  return (
    <div className="bg-slate-800 flex flex-col gap-2 rounded-lg border border-slate-700 p-3">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-2xl font-semibold text-white mt-1">{value}</p>
    </div>
  )
}

function MetricsGrid({ data, units }) {
  const { current: { feels_like, humidity, wind_speed, precipitation } } = data;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
      <MetricTile label="Feels Like" value={formatTemperature(feels_like, units)} />
      <MetricTile label="Humidity" value={`${humidity}%`} />
      <MetricTile label="Wind" value={formatWindSpeed(wind_speed, units)} />
      <MetricTile label="Precipitation" value={formatPercipitation(precipitation, units)} />
    </div>
  )
}

export default MetricsGrid