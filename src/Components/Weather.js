import React, { useState, useEffect } from 'react';
import axios from 'axios';


const WeatherApp = () => {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [unit, setUnit] = useState('Celsius');
    const [forecast, setForecast] = useState(null);
    const [forecastLoading, setForecastLoading] = useState(false);

    useEffect(() => {
        fetchWeatherByLocation();
    }, []);

    const fetchWeatherByLocation = async () => {
        try {
            setLoading(true);
            setError(null);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const apiKey = '238cfcb5e20c42abb1b91911230506';
                    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;
                    const response = await axios.get(apiUrl);
                    setWeather(response.data);
                    setLocation(response.data.location.name);
                });
            } else {
                setError('Geolocation is not supported by this browser.');
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError('An error occurred while fetching weather data.');
        }
    };

    const fetchWeather = async (e) => {
        e.preventDefault();

        if (location.trim() === '') {
            setError('Please enter a valid location.');
            setWeather(null);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const apiKey = '238cfcb5e20c42abb1b91911230506';
            const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
            const response = await axios.get(apiUrl);
            console.log('fetchWeather...response: ', response);
            setWeather(response.data);
            setLocation(response.data.location.name);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError('An error occurred while fetching weather data.');
            setWeather(null);
        }
    };

    const fetchForecast = async () => {
        try {
            setForecastLoading(true);
            setError(null);

            const apiKey = '238cfcb5e20c42abb1b91911230506';
            const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=no&alerts=no`;
            const response = await axios.get(apiUrl);
            console.log('fetchForecast...response: ', response);
            setForecast(response.data.forecast);
            setForecastLoading(false);
        } catch (error) {
            setForecastLoading(false);
            setError('An error occurred while fetching forecast data.');
        }
    };

    const toggleUnit = () => {
        setUnit(unit === 'Celsius' ? 'Fahrenheit' : 'Celsius');
    };

    return (
        <div className="app">
            <div className='search'>
                <form onSubmit={fetchWeather}>
                    <input
                        type="text"
                        placeholder="Enter location (city, country, or zip code)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                </form>
            </div>
            {loading && <p>Loading...</p>}
            {error && <div className="error">{error}</div>}
            {weather && (
                <div className="container">
                    <div className='top'>
                        <div className='location'>
                            <p>{weather.location.name}</p>
                        </div>
                        <div className='temp'>
                            {weather.current ? <h1>{weather.current.temp_c} °{unit === 'Celsius' ? 'C' : 'F'}</h1> : null}
                        </div>

                    </div>

                    <div class="button-container">
                        <button onClick={toggleUnit}>Toggle Unit</button>
                        <button className='button' onClick={fetchForecast}>Show 5-Day Forecast</button>
                    </div>

                    {forecastLoading && <p>Loading forecast...</p>}

                    {forecast && (
                        <div className="bottom" >
                            {forecast.forecastday.map((day) => (
                                <div key={day.date}>
                                    <div className='feels'>
                                        {day.day ? <p className='bold'>{day.date}</p> : null}
                                    </div>
                                    <div className='wind'>
                                        {day.day ? <p className='bold'> {day.day.avgtemp_f} °F</p> : null}
                                    </div>
                                    <div className='humidity'>
                                        {day.day ? <p className='bold'>{day.day.condition.text}</p> : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WeatherApp;

