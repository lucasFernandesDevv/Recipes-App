import mockDataFirstLetter from './mockDataFirstLetter';

const fetchFirstLetter = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=k') {
      return Promise.resolve(mockDataFirstLetter);
    }
    return Promise.reject(new Error('Invalid url'));
  },
});

export default fetchFirstLetter;
