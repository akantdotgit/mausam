import { useState, useCallback } from 'react';
import { fetchCurrentWeather } from '../services/weatherApi';

export function useWeather() {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const search = useCallback(async (city) => {
        setStatus('loading');
        setError(null);  
        try {
            const result = await fetchCurrentWeather(city);
            setData(result);
            setStatus('success');
        } catch (err) {
            setError(err.message);
            setStatus('error');
        }
    }, [])

    return { status, data, error, search };
}