import axios from 'axios';



const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY ='fb3900ae0c43662f55ae746aa15c4e1c';
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
