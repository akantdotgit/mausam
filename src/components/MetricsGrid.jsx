function MetricTile({ label, value }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-2xl font-semibold text-white mt-1">{value}</p>
    </div>
  )
}

function MetricsGrid({ data }) {
  const { current: { feels_like, humidity, wind_speed, precipitation } } = data;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
      <MetricTile label="Feels Like" value={`${Math.round(feels_like)}°`} />
      <MetricTile label="Humidity" value={`${humidity}%`} />
      <MetricTile label="Wind" value={`${wind_speed} m/s`} />
      <MetricTile label="Precipitation" value={`${precipitation} mm`} />
    </div>
  )
}

export default MetricsGrid