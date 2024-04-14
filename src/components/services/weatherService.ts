import axios from 'axios';

const API_KEY = 'fb3900ae0c43662f55ae746aa15c4e1c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city: string) => {
    const response = await axios.get(BASE_URL, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric' // Or imperial if needed
        }
    });
    return response.data;
};
