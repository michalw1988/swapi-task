import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import styles from './Vehicle.module.scss';
import { getData, getDataArray, getIdFromUrl } from "../../utils";

const Vehicle = () => {
  const [vehicle, setVehicle] = useState({});
  const [pilots, setPilots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams(); 

  const handleError = (error) => {
    console.error('Error fetching data:', error);
    setIsLoading(false);
  }

  useEffect(() => {
    getData(`https://swapi.dev/api/vehicles/${id}`)
      .then(data => {
        setVehicle(data);
        setIsLoading(false);
        if (data.pilots?.length) {
          getDataArray(data.pilots)
            .then(data => {
              const combinedResults = []
              data.forEach(item => combinedResults.push(item))
              setPilots(combinedResults);
              setIsLoading(false);
            })
            .catch((error) => handleError(error));
        }
      })
      .catch((error) => handleError(error));
  }, [])

  return (
    <div className={styles.main}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{vehicle.name}</h1>
          <div className={styles.imagePlaceholder}>no image</div>
          <p>Type: {vehicle.vehicle_class}</p>
          <p>Characters:&nbsp;
            {pilots?.length 
              ? pilots.map((pilot, i) => <span key={i}><Link to={`/characters/${getIdFromUrl(pilot.url)}`}>{pilot.name}</Link>{i < pilots.length - 1 && ', '}</span>)
              : '-'}
          </p>
        </div>
      )}
    </div>
  );
}

export default Vehicle;
