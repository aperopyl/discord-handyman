const WEATHER_API = "http://dataservice.accuweather.com";
const API_KEY = process.env.WEATHER;

const getRequestURL = (route = "", queries = {}, encode = true) => {
    const queryList = Object.keys(queries).map(key => `${key}=${queries[key]}`);
    const fullURL = `${WEATHER_API}${route}?apikey=${API_KEY}&${queryList.join("&")}`;

    return encode
        ? encodeURI(fullURL)
        : fullURL;
};

module.exports = {
    WEATHER_API,
    API_KEY,
    getRequestURL
};
