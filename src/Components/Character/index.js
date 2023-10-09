import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import styles from './Character.module.scss';
import { getData, getDataArray } from "../../utils";

const Character = () => {
  const [character, setCharacter] = useState({});
  const [homeworld, setHomeworld] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [species, setSpecies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams(); 

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}`)
      .then((response) => response.json())
      .then(data => {
        setCharacter(data);
        if (data.homeworld) {
          getData(data.homeworld)
            .then(data => setHomeworld(data))
            .catch((error) => {
              console.error('Error fetching data:', error);
              setIsLoading(false);
            });
        }
        if (data.vehicles?.length) {
          getDataArray(data.vehicles)
            .then(data => {
              const combinedResults = []
              data.forEach(item => combinedResults.push(item))
              setVehicles(combinedResults);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
              setIsLoading(false);
            });
        }
        if (data.species?.length) {
          getDataArray(data.species)
            .then(data => {
              const combinedResults = []
              data.forEach(item => combinedResults.push(item))
              setSpecies(combinedResults);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
              setIsLoading(false);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [])

  const getIdFromUrl = (url) => {
    const splitUrl = url.split('/');
    return splitUrl[splitUrl.length - 2];
  }

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
