import React, { useState, useEffect } from 'react';
// import styles from './Characters.module.scss';
import {
  Link
} from "react-router-dom";

function Vehicles() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const PAGE_SIZE = 10;

  const getSinglePage = (url) => fetch(url).then((response) => response.json());

  const getMultiplePages = (pagesCount) => {
    const urls = []
    for (let i = 1; i <= pagesCount; i++) {
      urls.push(`https://swapi.dev/api/people/?page=${i}`)
    }
    return Promise.all(urls.map(url => getSinglePage(url)));
  }

  useEffect(() => {
    getSinglePage(`https://swapi.dev/api/people/?page=1`)
      .then(data => {
        if (data.count <= PAGE_SIZE) {
          setCharacters(data.results);
          setIsLoading(false);
        } else {
          const pagesCount = Math.ceil(data.count / PAGE_SIZE);
          getMultiplePages(pagesCount)
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
    <div>
      VEHICLES
    </div>
  );
}

export default Vehicles;