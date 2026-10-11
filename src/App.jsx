import CurrentWeatherCard from "./components/CurrentWeatherCard";
import MetricsGrid from "./components/MetricsGrid";
import SearchBar from "./components/SearchBar";
import { useWeather } from "./hooks/useWeather";
import logo from './assets/images/logo.svg';
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";

function App() {
  const { status, data, forecast, error, search } = useWeather();

  return (
    <main className="min-h-screen w-full bg-slate-950 flex flex-col items-center px-6 py-6 sm:px-12 sm:py-12 text-white">
      <header className="w-full flex flex-col items-center">
        <nav className="w-full pb-15">
          <img className="w-60 h-auto" src={logo} alt="" />
        </nav>
        <h1 className="text-3xl font-bold text-white mb-6">How's the sky looking today?</h1>
      </header>

      <SearchBar onSearch={search} />

      <div className="w-full max-w-5xl mt-6">
        {status === 'idle' && (
          <p className="text-center text-slate-300">Search for a place to see the weather</p>
        )}
        {status === 'loading' && (
          <p className="text-center text-slate-300">Loading...</p>
        )}
        {status === 'error' && (
          <div className="text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        {status === 'success' && data && (
          <div className="flex justify-center gap-6 max-sm:flex-col">
            <div className="flex flex-col">
              <CurrentWeatherCard data={data} />
              <MetricsGrid data={data} />
              <DailyForecast daily={forecast?.daily} />
            </div>
            <HourlyForecast hourly={forecast?.hourly} dailyDates={forecast?.daily.time} />
          </div>
        )}
      </div>
    </main>
  )
}

export default App;