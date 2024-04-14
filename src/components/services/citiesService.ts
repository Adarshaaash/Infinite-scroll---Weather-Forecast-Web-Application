import axios from 'axios';

const BASE_URL = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records';

export const fetchCities = async (search: unknown, offset: unknown) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: search, 
                offset,
                limit: 100,
                countryCode:'IN' // Example: filter by United States


            }
        });
        return response.data.results.map((cityData: { geoname_id: any; name: any;country:any; country_code: any; timezone: any; coordinates: any; }) => ({
            geoname_id: cityData.geoname_id,
            name: cityData.name,
            country:cityData.cou_name_en,
            country_code: cityData.country_code, 
            timezone: cityData.timezone,
            coordinates: cityData.coordinates
            // ... map any other properties you need
        }));

    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error; 
    }
};

