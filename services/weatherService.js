
const weather =require('./weather')

const getWeather = async (req, res, next) => {
    const { lat, lng} = req.query;
    if (lat && lng) {
        const weatherData=await weather.getWeather(lat,lng);
        res.status(200).json({ data: weatherData.data });
    } else {
        res.status(400).send();
    }
}


exports.getWeather = getWeather;