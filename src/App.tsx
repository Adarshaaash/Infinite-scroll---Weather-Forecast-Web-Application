import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CitiesTable from './components/CitiesTable/CitiesTable';
// Inside your index.js or root component file
import './index.css';
import './App.css';



import WeatherPage from './components/WeatherPage/WeatherPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CitiesTable />} />
        <Route path="/weather/:cityName" element={<WeatherPage cityName={''} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
