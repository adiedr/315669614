const axios = require('axios');

const getWeather=async (lat,lng)=>{
const apiKey = '8e46f390d20e980a8eedd5101f9d3a97';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&lang=${'he'}`;
const weatherData = await axios.get(url);
return weatherData;
};
module.exports={getWeather};