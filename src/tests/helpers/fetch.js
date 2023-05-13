import chickenMeals from '../../../cypress/mocks/chickenMeals';
import cocktailDrinks from '../../../cypress/mocks/cocktailDrinks';
import drinkCategories from '../../../cypress/mocks/drinkCategories';
import drinks from '../../../cypress/mocks/drinks';
import mealCategories from '../../../cypress/mocks/mealCategories';
import meals from '../../../cypress/mocks/meals';
import { corba } from '../mocks/corba';
import { ggDrink } from '../mocks/gg';
import { drinkFirstLetter } from './drinkFirstLetter';
import { mealFirstLetter } from './mealFirstLetter';

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: async () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mealCategories);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(drinkCategories);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks);

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals);

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=k') return Promise.resolve(mealFirstLetter);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g') return Promise.resolve(drinkFirstLetter);

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken') return Promise.resolve(chickenMeals);

    if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') return Promise.resolve(corba);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') return Promise.resolve(ggDrink);

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail') return Promise.resolve(cocktailDrinks);
    console.log(url);
    return Promise.reject(new Error('Invalid url'));
  },
});

export default fetch;
