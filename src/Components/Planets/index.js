import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData, getIdFromUrl, getPaginatedData, PAGE_SIZE } from '../../utils';
import styles from './Planets.module.scss';

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (error) => {
    console.error('Error fetching data:', error);
    setIsLoading(false);
  }

  useEffect(() => {
    getData(`https://swapi.dev/api/vehicles/?page=1`)
      .then(data => {
        if (data.count <= PAGE_SIZE) {
          setPlanets(data.results);
          setIsLoading(false);
        } else {
          const pagesCount = Math.ceil(data.count / PAGE_SIZE);
          getPaginatedData('planets', pagesCount)
            .then(data => {
              const combinedResults = []
              data.forEach(page => combinedResults.push(...page.results))
              setPlanets(combinedResults);
              setIsLoading(false);
            })
            .catch((error) => handleError(error));
          }
        })
      .catch((error) => handleError(error));
  }, []);

  return (
    <div className={styles.content}>
      <h1>Star Wars planets</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.planetsList}>
          {planets
            .sort((a, b) => a.name < b.name ? -1 : 1)
            .map((planet, index) => { 
              return (
              <li key={index}>
                <Link to={`/planets/${getIdFromUrl(planet.url)}`}>
                  <span className={styles.imagePlaceholder}>no image</span>
                  <span className={styles.name}>{planet.name}</span>
                </Link>
              </li>
            )})}
        </ul>
      )}
    </div>
  );
}

export default Planets;