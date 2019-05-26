const axios = require('axios');


const getLugarLatLon = async(direccion) => {
    const encoded = encodeURI(direccion);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encoded}`,
        // timeout: 1000,
        headers: { 'X-RapidAPI-Key': '8f729afa8fmshec62a7bc80c408cp17c047jsn9aafceba23c3' }
    });

    const resp = await instance.get();

    if (resp.data.Results.length === 0) {
        throw new Error("No results for: " + direccion);
    }

    const data = resp.data.Results[0];
    const city = data.name;
    const lat = data.lat;
    const lon = data.lon;

    return {
        city,
        lat,
        lon
    };
};

module.exports = {
    getLugarLatLon
}