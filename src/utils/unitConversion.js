export function celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}

export function msToMph(metersPerSecond) {
    return metersPerSecond * 2.23694;
}

export function mmToInch(mm) {
    return mm / 25.4;

}

export function formatTemperature(celsius, units) {
    const value = units === 'imperial' ? celsiusToFahrenheit(celsius) : celsius;
    return `${Math.round(value)}°`;
}

export function formatWindSpeed(meterPerSecond, units) {
    if (units === 'imperial') {
        return `${msToMph(meterPerSecond).toFixed(1)} mph`;
    }
    return `${meterPerSecond.toFixed(1)} m/s`;
}

export function formatPercipitation(mm, units) {
    if (units === 'imperial') {
        return `${mmToInch(mm).toFixed(2)} in`;
    }
    return `${mm} mm`;
}