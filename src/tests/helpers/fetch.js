import { drinkFirstLetter } from './drinkFirstLetter';
import { mealFirstLetter } from './mealFirstLetter';

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=k') return Promise.resolve(mealFirstLetter);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g') return Promise.resolve(drinkFirstLetter);
    return Promise.reject(new Error('Invalid url'));
  },
});

export default fetch;
