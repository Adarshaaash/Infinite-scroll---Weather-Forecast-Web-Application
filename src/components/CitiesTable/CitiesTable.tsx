import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { fetchCities } from '../services/citiesService';

interface City {
    geoname_id: string;
    name: string;
    country: string;
    timezone: string;
    lat?: number;
    lon?: number;
}

const CitiesTable: React.FC = () => {
    const [cities, setCities] = useState<City[]>([]);
    const [filteredCities, setFilteredCities] = useState<City[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchCities('', 0); // Fetch all cities initially
                setCities(data);
                setFilteredCities(data); // Set filtered cities initially
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Filter cities based on search query
        const filtered = cities.filter(city =>
            city.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCities(filtered);
    }, [search, cities]);

    const handleRowClick = (cityName: string) => {
        const weatherUrl = `/weather/${encodeURIComponent(cityName)}`;
        window.open(weatherUrl, '_blank'); // Open link in new tab
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <SearchBar value={search} onChange={(newSearch) => setSearch(newSearch)} />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto flex justify-center ">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">City</th>
                                <th className="px-4 py-2">Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCities.map((city) => (
                                <tr key={city.geoname_id}>
                                    <td 
                                        className="px-4 py-2 w-[50%] cursor-pointer ml-20 hover:bg-gray-100"
                                        onClick={() => handleRowClick(city.name)}
                                    >
                                        {city.name}
                                    </td>
                                    <td className="px-4 py-2 w-[50%] ml-32 ">{city.country}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CitiesTable;
