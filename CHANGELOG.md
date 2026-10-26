# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Phase 4 (deployment) and Phase 5 (serverless proxy, in progress).

### Added
- Deployed to Vercel (production)
- `api/weather.js`: a Vercel serverless function that proxies OpenWeatherMap current-weather requests, keeping the API key server-side instead of in the client bundle

### Changed
- `weatherApi.js` now calls the app's own `/api/weather` route instead of calling OpenWeatherMap directly
- API key environment variable renamed from `VITE_WEATHER_API_KEY` to `WEATHER_API_KEY`, read server-side only via `process.env` (no longer `VITE_`-prefixed, so it's not inlined into the client bundle)

### Removed
- Client-side exposure of the OpenWeatherMap API key in the browser bundle

## [0.4.0] - 2026-10-26

Phase 3 complete: responsive layout.

### Added
- Fully responsive layout across mobile, tablet, and desktop
- SVG background asset swap on `CurrentWeatherCard`: `bg-today-small.svg` on mobile, `bg-today-large.svg` on desktop, using CSS custom properties and Tailwind's arbitrary value syntax to avoid duplicating card markup
- `DailyForecast` row is horizontally scrollable with fixed-width cards (`w-[90px] shrink-0`), preventing cards from squishing on narrow screens
- `min-w-0` on the left layout column to allow it to shrink at tablet widths and let `overflow-x-scroll` correctly activate on `DailyForecast`
- `items-start` on the outer two-column row so `HourlyForecast` height is driven by its own content, not stretched to match the left column

### Changed
- Logo scales between `w-36` on mobile and `w-60` on desktop to prevent overflow on narrow screens

## [0.3.0] - 2026-10-23

Phase 3: unit toggle UI, loading/error states, hover/focus, and design tokens.

### Added
- `UnitToggle` restyled as a custom dropdown (Metric/Imperial options with checkmarks, plus a quick "Switch to..." link), replacing the plain toggle button
- `HourlyForecast`'s day selector rebuilt as a custom dropdown matching `UnitToggle`'s pattern, replacing the native `<select>`
- Non-blocking "search in progress" indicator, absolutely positioned to overlay the current weather card instead of shifting layout
- `Skeleton` and `LoadingState` components providing a layout-shaped skeleton for first-time searches
- `APIerror` full-page error component with a Retry action, used for any failure other than "city not found"
- A distinct "No search result found!" message for the city-not-found case, separate from the generic error state
- Hover and focus-visible states across every interactive element (search input/button, both dropdowns and their options, Retry button)
- Design-system color tokens (`Neutral 900–0`, `Orange 500`, `Blue 500/700`) added via Tailwind v4 `@theme` in `index.css`, replacing approximated built-in Tailwind colors across all components

### Fixed
- `forecast?.daily.time` missing a second optional-chaining operator, which could crash if `forecast.daily` were ever undefined

## [0.2.0] - 2026-10-11

Phase 2: forecasts.

### Added
- Imperial/Metric unit toggle (`UnitToggle` component)
- `utils/unitConversion.js` with pure conversion functions and display formatters for temperature, wind speed, and precipitation
- 7-day daily forecast, sourced from Open-Meteo
- Hourly forecast with a day-selector dropdown
- `weatherCodeMap` utility mapping Open-Meteo WMO weather codes to OpenWeatherMap icons, so current, daily, and hourly icons stay visually consistent

### Changed
- Weather data is now always fetched in metric; unit display is handled entirely client-side rather than refetching on toggle
- `fetchCurrentWeather` now also returns `lat`/`lon`, reused by `fetchForecast` to avoid a second geocoding call
- `useWeather` now fetches current weather and forecast together under a single combined `status`

## [0.1.0] - 2026-09-28

Phase 1 MVP.

### Added
- Project scaffolded with Vite, React, and Tailwind CSS
- `SearchBar` component with controlled input and empty-search guard
- `weatherApi` service layer that fetches from OpenWeatherMap and normalizes the response
- `useWeather` custom hook managing `idle | loading | success | error` status
- `CurrentWeatherCard` showing city, country, date, icon, and temperature
- `MetricsGrid` showing feels-like, humidity, wind speed, and precipitation
- Idle, loading, and error (including "City not found") UI states
- API key handled through `.env` with a committed `.env.example`
- README with setup instructions, architecture notes, and roadmap

[Unreleased]: https://github.com/akantdotgit/mausam/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/akantdotgit/mausam/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/akantdotgit/mausam/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/akantdotgit/mausam/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/akantdotgit/mausam/releases/tag/v0.1.0