import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData, getIdFromUrl, getPaginatedData, PAGE_SIZE } from '../../utils';
import styles from './Characters.module.scss';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (error) => {
    console.error('Error fetching data:', error);
    setIsLoading(false);
  }

  useEffect(() => {
    getData(`https://swapi.dev/api/people/?page=1`)
      .then(data => {
        if (data.count <= PAGE_SIZE) {
          setCharacters(data.results);
          setIsLoading(false);
        } else {
          const pagesCount = Math.ceil(data.count / PAGE_SIZE);
          getPaginatedData('people', pagesCount)
            .then(data => {
              const combinedResults = []
              data.forEach(page => combinedResults.push(...page.results))
              setCharacters(combinedResults);
              setIsLoading(false);
            })
            .catch((error) => handleError(error));
          }
        })
      .catch((error) => handleError(error));
  }, []);

  return (
    <div className={styles.content}>
      <h1>Star Wars characters</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.charactersList}>
          {characters
            .sort((a, b) => a.name < b.name ? -1 : 1)
            .map((character, index) => { 
              return (
              <li key={index}>
                <Link to={`/characters/${getIdFromUrl(character.url)}`}>
                  <span className={styles.avatarPlaceholder}>no avatar</span>
                  <span className={styles.name}>{character.name}</span>
                </Link>
              </li>
            )})}
        </ul>
      )}
    </div>
  );
}

export default Characters;