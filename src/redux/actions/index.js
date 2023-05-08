import { SAVE_DRINKS, SAVE_MEALS, RECIPES_ADD } from '../helpers/variables';

// Coloque aqui suas actions
export const saveDrinks = (payload) => ({
  type: SAVE_DRINKS,
  payload,
});

export const saveMeals = (payload) => ({
  type: SAVE_MEALS,
  payload,
});

// Coloque aqui suas actions
export const addRecipes = (recipe) => ({
  type: RECIPES_ADD,
  recipe,
});

export function fetchMealsRecipes() {
  return async (dispatch) => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    dispatch(saveMeals(data.meals));
  };
}

export function fetchDrinksRecipes() {
  return async (dispatch) => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    dispatch(saveDrinks(data.drinks));
  };
}
