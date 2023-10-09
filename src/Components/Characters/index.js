import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData, getPaginatedData } from '../../utils';
import styles from './Characters.module.scss';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const PAGE_SIZE = 10;

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
              const splitUrl = character.url.split('/');
              const id = splitUrl[splitUrl.length - 2];
              return (
              <li key={index}>
                <Link to={`/characters/${id}`}>
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