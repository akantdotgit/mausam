# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-10-11
 
Phase 2: forecasts.
 
### Added
- 7-day daily forecast, sourced from Open-Meteo
- Hourly forecast with a day-selector dropdown
- `weatherCodeMap` utility mapping Open-Meteo WMO weather codes to OpenWeatherMap icons, so current, daily, and hourly icons stay visually consistent

### Changed
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

[Unreleased]: https://github.com/akantdotgit/mausam/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/akantdotgit/mausam/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/akantdotgit/mausam/releases/tag/v0.1.0