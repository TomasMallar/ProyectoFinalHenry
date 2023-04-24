import React, { useState } from 'react';
import axios from 'axios';

const CalcularEnvio = () => {

    const [toAddress, setToAddress] = useState('');
    const [duration, setDuration] = useState('');

    const handleToAddressChange = (event) => {
        setToAddress(event.target.value);
    };

    const handleCalculateDuration = async () => {
        try {
            const toAddressCoordinates = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(toAddress)}&format=json&limit=1`)
                .then(response => Number(response.data[0].lon).toFixed(6) + ',' + Number(response.data[0].lat).toFixed(6));
            console.log(toAddressCoordinates);
            const key = '5b3ce3597851110001cf6248ccb0723c02ce45158d9b8688c28ac2b1'
            const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=-58.416150,-34.588584&end=${toAddressCoordinates}`;

            const response = await axios.get(url);
            console.log(response);
            const duration = response.data.features[0].properties.segments[0].duration;
            //const distanceInKm = response.data.features[0].properties.segments[0].distance / 1000;
            //console.log(distanceInKm);

            const minutos = Math.floor(duration / 60);
            const segundos = duration % 60;
            if (minutos < 60) {
                setDuration( `${minutos} minutos`) ;
            } else {
              const horas = Math.floor(minutos / 60);
              const minutosRestantes = minutos % 60;
              if (minutosRestantes === 0) {
                setDuration(`${horas} horas`)  ;
              } else {
                setDuration(`${horas} horas y ${minutosRestantes} minutos`) ;
              }
            }
        } catch (error) {
            console.error(error);
        }
    };

    //-------------------------------------------------------------

    

    return (
        <div>
            <label>
                Direccion: 
                <input placeholder='Calle, Provincia, Pais' type="text" value={toAddress} onChange={handleToAddressChange} />
            </label>
            <br />
            <button onClick={handleCalculateDuration}>Calcular</button>
            <br />
            {duration && <p>Duracion: {duration}</p>}
        </div>
    );
}

export default CalcularEnvio