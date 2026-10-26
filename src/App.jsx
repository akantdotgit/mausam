import CurrentWeatherCard from "./components/CurrentWeatherCard";
import MetricsGrid from "./components/MetricsGrid";
import SearchBar from "./components/SearchBar";
import { useWeather } from "./hooks/useWeather";
import logo from './assets/images/logo.svg';
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import UnitToggle from './components/UnitToggle';
import { Loader2 } from "lucide-react";
import APIerror from "./components/APIerror";
import LoadingState from "./components/LoadingState";

function App() {
  const { status, data, forecast, error, units, lastCity, search, toggleUnits } = useWeather();

  return (
    <main className="min-h-screen w-full font-secondary bg-neutral-900 flex flex-col items-center px-6 py-6 md:px-12 md:py-8 text-white">
      <header className="w-full flex flex-col items-center">
        <nav className="w-full flex items-center justify-between">
          <img className="w-40 md:w-60 h-auto" src={logo} alt="Logo" />
          <UnitToggle units={units} onToggle={toggleUnits} />
        </nav>
      </header>

      <div className="w-full max-w-5xl flex flex-col items-center mt-13">
        <div className="flex flex-col items-center">
          {status === 'error' && !data && error !== 'City not found' ? (
            <APIerror onRetry={() => search(lastCity)} />
          ) : (<div>
            <h1 className="text-[52px] md:text-4xl leading-15 text-center font-primary font-semibold text-neutral-0 mb-10">How's the sky looking today?</h1>
            <div className="relative w-full px-5 flex flex-col items-center">
              <SearchBar onSearch={search} />
              {status === 'loading' && data && (
                <div className="absolute top-full left-5 right-0 w-full max-w-108.75 flex bg-neutral-800 px-3 py-2.5 rounded-lg mt-2 items-center gap-2 text-white text-xs shadow-lg z-10">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-[13px]">Search in progress</span>
                </div>
              )}

              {status === 'idle' && !data && (
                <p className="text-center text-neutral-0 text-[17px] font-medium mt-8">Search for a place to see the weather!</p>
              )}

              {status === 'loading' && !data && (
                <LoadingState />
              )}

              {status === 'error' && error === 'City not found' && (
                <p className="text-center text-white text-[17px] font-medium mt-8">No search result found!</p>
              )}
            </div>
          </div>
          )}
          {data && status !== 'error' && (
            <div className="flex justify-center gap-6 max-md:flex-col mt-8">
              <div className="min-w-0 flex flex-col">
                <CurrentWeatherCard data={data} units={units} />
                <MetricsGrid data={data} units={units} />
                <DailyForecast daily={forecast?.daily} units={units} />
              </div>
              <HourlyForecast hourly={forecast?.hourly} dailyDates={forecast?.daily?.time} units={units} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default App;