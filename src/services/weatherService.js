import axios from 'axios';
import { config } from 'dotenv'
config();

// This is for fetching data from weather API
export const getWeatherData = async (lat, lon) => {
    const API_KEY = `${process.env.WEATHER_API_KEY}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCityName = async (lat, lon) => {
    const API_KEY = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.results && response.data.results.length > 0) {
            const addressComponents = response.data.results[0].address_components;
            const cityComponent = addressComponents.find(component => component.types.includes('locality'));
            if (cityComponent) {
                return cityComponent.long_name;
            } else {
                console.error('City not found in the address components');
            }
        } else {
            console.error('No results found in the geocoding response');
        }
    } catch (error) {
        console.error('Error fetching the geocoding data:', error);
    }
    return null;
};