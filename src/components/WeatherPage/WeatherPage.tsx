import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchWeather } from '../services/weatherService';

interface WeatherPageProps {
    cityName: string;
}

interface Weather {
    weather: {
      description: string;
      main: string;
      icon: string; 
    }[];
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    wind: {
      speed: number;
      deg: number;
    }
}

const WeatherPage: React.FC<WeatherPageProps> = () => {
    const { cityName } = useParams();
    const [weatherData, setWeatherData] = useState<Weather | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bgimg, setBgImg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetchWeather(cityName!); 
                setWeatherData(response);
                setError(null);
            } catch (err) {
                setError('Error fetching weather data'); 
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [cityName]); 

    useEffect(() => {
        if (weatherData) {
            const weatherMain = weatherData.weather[0].main.toLowerCase();
            if (weatherMain.includes('cloud')) {
                setBgImg('cloudy.jpg');
            } else if (weatherMain.includes('rain')) {
                setBgImg('rainy.jpg');
            } else if (weatherMain.includes('snow')) {
                setBgImg('snowy.jpg'); 
            } else {
                setBgImg('sunny.jpg');
            }
        }
    }, [weatherData]);

    return ( <div>  
        <div
            className={`min-h-screen z-10 w-full bg-cover bg-center relative`}
            style={{ backgroundImage: `url(/images/weather/${bgimg})` }}
        >  <Link to="/" className="cursor-pointer absolute top-10 ml-10 z-50 ">Back to Cities</Link>
            <div className="absolute top-0  left-0 w-full h-full bg-black opacity-50"></div>
            <div className="relative z-10  top-48 text-white text-center">
               
                <h1 className="text-4xl font-bold">Weather for {cityName}</h1>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {weatherData && (
                    <div>
                        <p>Description: {weatherData.weather[0].description}</p>
                        <p>Temperature: {weatherData.main.temp} °C</p>
                        {/* Add more weather info as needed */}
                    </div>
                )}
            </div>
        </div></div>
    );
};

export default WeatherPage;
