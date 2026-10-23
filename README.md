# Mausam

![Mausam Phase 2](docs/screenshot-phase2.png)

A responsive weather app built with React, Vite, and Tailwind CSS. Search for any city and see its current conditions and forecast.

> **Status:** Phase 3 in progress — unit toggle, UI states (loading skeleton, search-in-progress, error, no-results), hover/focus states, and real design tokens are complete. Responsive layout is the one remaining piece. See the [Roadmap](#roadmap).

## Features (v0.3.0)

- Search for weather by city name
- Current conditions: temperature, weather icon, description, location, and date
- Metric tiles: feels-like temperature, humidity, wind speed, precipitation
- 7-day daily forecast with icon and high/low temperature per day
- Hourly forecast with a custom day-selector dropdown
- Imperial/Metric unit toggle, styled as a dropdown, with instant client-side conversion (no refetch)
- Loading skeleton for first-time searches, with a non-blocking "search in progress" indicator for subsequent searches
- Distinct error states: a friendly "No search result found!" for an unknown city, and a full-page error view with Retry for genuine API/network failures
- Hover and focus states across every interactive element
- Dark UI styled with Tailwind CSS, using exact design-system color tokens

## Tech Stack

| Layer | Choice |
|---|---|
| UI | React |
| Build tool | Vite |
| Styling | Tailwind CSS (v4, custom `@theme` color tokens) |
| Icons | lucide-react |
| Current weather | OpenWeatherMap Current Weather API |
| Forecast data | Open-Meteo Forecast API |

## Getting Started

### Prerequisites

- Node.js 18+
- A free [OpenWeatherMap API key](https://openweathermap.org/api) (new keys can take up to a couple of hours to activate). Open-Meteo's forecast endpoint needs no key.

### Installation

```bash
git clone https://github.com/akantdotgit/mausam.git
cd mausam
npm install
```

### Environment variables

Copy the example file and add your key:

```bash
cp .env.example .env
```

```
VITE_WEATHER_API_KEY=your_api_key_here
```

> `.env` is git-ignored. Note that any `VITE_` variable is bundled into client-side code, so treat this key as low-privilege. See [Architecture notes](#architecture-notes).

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx
│   ├── CurrentWeatherCard.jsx
│   ├── MetricsGrid.jsx
│   ├── DailyForecast.jsx
│   ├── HourlyForecast.jsx       # includes custom DaySelector dropdown
│   ├── UnitToggle.jsx           # custom dropdown: Metric/Imperial
│   ├── APIerror.jsx             # full-page error state with Retry
│   ├── LoadingState.jsx         # skeleton layout for first-time loads
│   └── Skeleton.jsx             # reusable pulsing placeholder block
├── hooks/
│   └── useWeather.js            # fetch state machine: idle | loading | success | error
├── services/
│   └── weatherApi.js            # all API calls + response normalization
├── utils/
│   ├── weatherCodeMap.js        # maps Open-Meteo WMO codes to OpenWeatherMap icons
│   └── unitConversion.js        # pure conversion + display formatting functions
├── App.jsx
├── index.css                    # Tailwind import + @theme design tokens
└── main.jsx
```

## Architecture Notes

- **Service layer** (`services/weatherApi.js`): the only file that knows about the OpenWeatherMap and Open-Meteo URLs and response shapes. `fetchCurrentWeather` returns a normalized object (`{ name, country, lat, lon, current: {...} }`); `fetchForecast` returns `{ daily, hourly }`. Either provider can be swapped without touching any component. Both calls always fetch in metric.
- **Coordinate reuse**: `fetchCurrentWeather` returns `lat`/`lon` from OpenWeatherMap's response, which `fetchForecast` consumes directly. This avoids a second geocoding call when fetching the forecast.
- **Custom hook** (`hooks/useWeather.js`): owns fetch state as a single `status` value (`idle | loading | success | error`) covering both the current-weather and forecast requests together, rather than tracking them independently.
- **Client-side unit conversion**: `units` is a display-only setting. Toggling it never refetches — `utils/unitConversion.js` converts and formats the already-fetched metric values on the fly, avoiding extra API calls and any toggle-triggered loading state.
- **Two distinct error states**: a city-not-found result is treated as a normal, friendly empty state ("No search result found!"), while any other failure (API error, network failure) renders a dedicated full-page `APIerror` component with a Retry action, driven by the error message rather than one generic catch-all.
- **Icon consistency**: Open-Meteo returns WMO weather codes, not icons. `utils/weatherCodeMap.js` maps each WMO code to an OpenWeatherMap icon, so current-weather, daily, and hourly icons all share one visual style.
- **Design tokens**: colors are defined once in `index.css` via Tailwind v4's `@theme` block, using the exact HSL values from the project's style guide, rather than scattering approximate built-in Tailwind colors across components.
- **One-way data flow**: `App.jsx` reads from the hook and passes data down to presentational components as props.
- **Known limitation**: the OpenWeatherMap API key is exposed in the client bundle. A planned improvement is a serverless proxy that keeps the key server-side.

## Roadmap

- [x] **Phase 1:** search + current weather + metric tiles
- [x] **Phase 2:** 7-day forecast and hourly forecast with day selector
- [ ] **Phase 3:** polish
  - [x] Imperial/Metric unit toggle
  - [x] UI states (loading skeleton, search-in-progress, API error with Retry, no-results)
  - [x] Hover and focus states
  - [x] Design system color tokens
  - [ ] Responsive layout (mobile vs desktop)
- [ ] **Phase 5:** deployment (Vercel), serverless API proxy

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## License

MIT