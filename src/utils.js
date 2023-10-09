export const getData = (url) => fetch(url).then((response) => response.json());

export const getDataArray = (urls) => Promise.all(urls.map(url => getData(url)));

export const getPaginatedData = (resource, pagesCount) => {
  const urls = [];
  for (let i = 1; i <= pagesCount; i++) {
    urls.push(`https://swapi.dev/api/${resource}/?page=${i}`)
  }
  return Promise.all(urls.map(url => getData(url)));
};