import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {

    const [data, setData] = useState('')
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);

    const searchLocation = (event) => {
        event.preventDefault();
        if (location.trim() === '') {
            setError('Please enter a valid location.');
            return;
        }
        setError(null);
        const apiKey = '238cfcb5e20c42abb1b91911230506';
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

        axios.get(url).then((response) => {
            console.log('response: ', response);
            setData(response.data)
            console.log('response.data: ', response.data);
        })

        setLocation('')
    }


    return (
        <div className='app'>
            <div className='search'>
                <form onSubmit={searchLocation}>
                    <input
                        value={location}
                        onChange={event => setLocation(event.target.value)}
                        placeholder='Enter Location'
                        type='text' />
                </form>

            </div>
            {error && <div className="error">{error}</div>}
            {data && (
                <div className='container'>
                    <div className='top'>
                        <div className='location'>
                            <p>{data.location.name}</p>
                        </div>
                        <div className='temp'>
                            {data.current ? <h1>{data.current.temp_f}</h1> : null}
                        </div>
                        <div className='description'>
                            {data.current ? <p>{data.current.cloud}</p> : null}
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='feels'>
                            {data.current ? <p className='bold'>{data.current.feelslike_f}°F</p> : null}
                            <p>Feels Like</p>
                        </div>
                        <div className='humidity'>
                            {data.current ? <p className='bold'>{data.current.humidity}</p> : null}
                            <p>Humidity</p>
                        </div>
                        <div className='wind'>
                            {data.current ? <p className='bold'>{data.current.wind_mph}</p> : null}
                            <p>wind speed</p>
                        </div>
                        <div className='wind'>
                            {data.current ? <p className='bold'>{data.current.wind_mph}</p> : null}
                            <p>wind speed</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WeatherApp
