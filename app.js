const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand: true
    }
}).argv;


const getInfo = async(direccion) => {
    try {
        const coords = await lugar.getLugarLatLon(direccion);

        const weather = await clima.getClima(coords.lat, coords.lon);

        return `En clima de ${coords.city} es de ${weather} Farenheit`;

    } catch (e) {
        // console.log(e);
        return `No se pudo determinar el clima de ${direccion}`;
    }
}

/*
getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log);
*/

let main = async() => {
    try {

        let result = await getInfo(argv.direccion);

        console.log(result);

    } catch (e) {
        console.log(e);
        return -1;
    }
    return 0;
};

main().then(retcode => {
    console.log(`Main finished with retcode: ${retcode}`);
}).catch(e => {
    console.log(`Main error: ${e}`);
});


/*
lugar.getLugarLatLon(argv.direccion)
    .then(resp => { console.log(resp) })
    .catch(err => { console.log(err) });


clima.getClima(40.750000, -74.000000)
    .then(resp => { console.log(resp) })
    .catch(err => { console.log(err) });
*/

/*
console.log(argv.direccion);

const encoded = encodeURI(argv.direccion);
console.log(encoded);

const instance = axios.create({
    baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encoded}`,
    // timeout: 1000,
    headers: { 'X-RapidAPI-Key': '8f729afa8fmshec62a7bc80c408cp17c047jsn9aafceba23c3' }
});

instance.get()
    .then(resp => { console.log(resp.data.Results[0]) })
    .catch(err => { console.log('ERRORR: ' + err) });
*/