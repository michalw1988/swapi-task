import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import styles from './Character.module.scss';
import { getData, getDataArray, getIdFromUrl } from "../../utils";

const Character = () => {
  const [character, setCharacter] = useState({});
  const [homeworld, setHomeworld] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [species, setSpecies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams(); 

  const handleError = (error) => {
    console.error('Error fetching data:', error);
    setIsLoading(false);
  }

  useEffect(() => {
    getData(`https://swapi.dev/api/people/${id}`)
      .then(data => {
        setCharacter(data);
        setIsLoading(false);
        if (data.homeworld) {
          getData(data.homeworld)
            .then(data => setHomeworld(data))
            .catch((error) => handleError(error));
        }
        if (data.vehicles?.length) {
          getDataArray(data.vehicles)
            .then(data => {
              const combinedResults = []
              data.forEach(item => combinedResults.push(item))
              setVehicles(combinedResults);
              setIsLoading(false);
            })
            .catch((error) => handleError(error));
        }
        if (data.species?.length) {
          getDataArray(data.species)
            .then(data => {
              const combinedResults = []
              data.forEach(item => combinedResults.push(item))
              setSpecies(combinedResults);
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
          <h1>{character.name}</h1>
          <div className={styles.avatarPlaceholder}>no avatar</div>
          <p>Homeworld: {homeworld?.name ? <Link to={`/planets/${getIdFromUrl(homeworld.url)}`}>{homeworld.name}</Link> : '-'}</p>
          <p>Vehicles:&nbsp;
            {vehicles?.length 
              ? vehicles.map((vehicle, i) => <span key={i}><Link to={`/vehicles/${getIdFromUrl(vehicle.url)}`}>{vehicle.name}</Link>{i < vehicles.length - 1 && ', '}</span>)
              : '-'}
          </p>
          <p>Race: {species?.map(species => species.name).join(', ') || '-'}</p>
        </div>
      )}
    </div>
  );
}

export default Character;
