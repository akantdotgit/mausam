import { useState, useCallback } from 'react';
import { fetchCurrentWeather, fetchForecast } from '../services/weatherApi';

export function useWeather() {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    const search = useCallback(async (city) => {
        setStatus('loading');
        setError(null);  
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
    }, [])

    return { status, data, forecast, error, search };
};