import React, { useState, useRef } from 'react';
import Downshift from 'downshift';
import { matchSorter } from 'match-sorter'; // For fuzzy search matching

interface SearchBarProps {
    value: string;
    onChange: (searchInput: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Simulate fetching suggestions from an API
    const fetchSuggestions = async (input: string) => {
        const potentialCities = ['New York', 'London', 'Paris', 'Tokyo', 'Sydney', 'Mumbai'];
        const filtered = matchSorter(potentialCities, input, { keys: ['name'] });
        setSuggestions(filtered.slice(0, 5)); // Show max 5 suggestions
    };

    const handleInputChange = (input: string) => {
        onChange(input);
        fetchSuggestions(input);
    };

    return (
        <Downshift
            itemToString={(item) => (item ? item : '')} // Handle selecting a suggestion
            selectedItem={value}
            onInputValueChange={handleInputChange}
        >
            {({
                getInputProps,
                getItemProps,
                isOpen,
                highlightedIndex,
            }) => (
                <div className="relative">
                    <input
                        {...getInputProps({ ref: inputRef })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {isOpen && (
                        <ul className="absolute z-10 left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md">
                            {suggestions.map((item, index) => (
                                <li
                                    key={item}
                                    {...getItemProps({
                                        item,
                                        index,
                                        style: {
                                            backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                        },
                                    })}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </Downshift>
    );
};

export default SearchBar;
