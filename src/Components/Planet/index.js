import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import styles from './Planet.module.scss';
import { getData, getDataArray, getIdFromUrl } from "../../utils";

const Planet = () => {
  const [planet, setPlanet] = useState({});
  const [residents, setResidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams(); 

  const handleError = (error) => {
    console.error('Error fetching data:', error);
    setIsLoading(false);
  }

  useEffect(() => {
    getData(`https://swapi.dev/api/planets/${id}`)
      .then(data => {
        setPlanet(data);
        setIsLoading(false);
        if (data.residents?.length) {
          getDataArray(data.residents)
            .then(data => {
              const combinedResults = []
              data.forEach(item => combinedResults.push(item))
              setResidents(combinedResults);
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
          <h1>{planet.name}</h1>
          <div className={styles.imagePlaceholder}>no image</div>
          <p>Population: {planet.population}</p>
          <p>Characters:&nbsp;
            {residents?.length 
              ? residents.map((resident, i) => <span key={i}><Link to={`/characters/${getIdFromUrl(resident.url)}`}>{resident.name}</Link>{i < residents.length - 1 && ', '}</span>)
              : '-'}
          </p>
        </div>
      )}
    </div>
  );
}

export default Planet;
