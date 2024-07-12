import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyB7ecIK4Q3aw3RLm5jHdmsuj40lsaxVTmw");
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
console.log('API Key:', process.env.API_KEY);

export const generateWeatherDescription = async (weatherData) => {
    const prompt = `Generate a detailed weather report based on the following data and format text beautifully and long dont put * sign: 
    Temperature: ${(weatherData.main.temp - 273.15).toFixed(0)} °C, 
    Weather: ${weatherData.weather[0].description}, 
    Humidity: ${weatherData.main.humidity}%, 
    Wind Speed: ${weatherData.wind.speed} m/s.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text.trim();
    } catch (error) {
        console.error('Error generating weather description:', error);
        return 'Weather description could not be generated.';
    }
};