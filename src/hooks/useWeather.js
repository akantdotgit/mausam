import { useState, useCallback } from 'react';
import { fetchCurrentWeather, fetchForecast } from '../services/weatherApi';

export function useWeather() {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);
    const [units, setUnits] = useState('metric');
    const [lastCity, setLastCity] = useState(null)

    const search = useCallback(async (city) => {
        setStatus('loading');
        setError(null);
        setLastCity(city);
        try {
            const current = await fetchCurrentWeather(city);
            const forecastData = await fetchForecast(current.lat, current.lon);
            setData(current);
            setForecast(forecastData);
            setStatus('success');
        } catch (err) {
            setError(err.message);
            setStatus('error');
        }
    }, []);

    const toggleUnits = useCallback(() => {
        setUnits((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
    }, []);

    return { status, data, forecast, error, units, lastCity, search, toggleUnits };
};