import {
  SAVE_DRINKS,
  SAVE_MEALS,
  SAVE_DRINKS_CATEGORIES,
  SAVE_MEALS_CATEGORIES,
  SAVE_FILTERED_DRINKS_BY_CATEGORY,
  SAVE_FILTERED_MEALS_BY_CATEGORY,
} from '../helpers/variables';

// Coloque aqui suas actions
export const saveDrinks = (payload) => ({
  type: SAVE_DRINKS,
  payload,
});

export const saveMeals = (payload) => ({
  type: SAVE_MEALS,
  payload,
});

export const saveMealsCategories = (payload) => ({
  type: SAVE_MEALS_CATEGORIES,
  payload,
});

export const saveDrinksCategories = (payload) => ({
  type: SAVE_DRINKS_CATEGORIES,
  payload,
});

export const saveFilteredMealsByCategory = (payload) => ({
  type: SAVE_FILTERED_MEALS_BY_CATEGORY,
  payload,
});

export const saveFilteredDrinksByCategory = (payload) => ({
  type: SAVE_FILTERED_DRINKS_BY_CATEGORY,
  payload,
});

export const saveFoodAndDrinkInfos = (payload) => ({
  type: SAVE_FILTERED_DRINKS_BY_CATEGORY,
  payload,
});

export function fetchMealsRecipes() {
  return async (dispatch) => {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
    const data = await response.json();
    dispatch(saveMeals(data.meals));
  };
}

export function fetchDrinksRecipes() {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
      const data = await response.json();
      dispatch(saveDrinks(data.drinks));
    } catch (e) {
      throw new Error(e);
    }
  };
}

export function fetchMealsCategories() {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      );
      const data = await response.json();
      dispatch(saveMealsCategories(data.meals));
    } catch (e) {
      throw new Error(e);
    }
  };
}

export function fetchDrinksCategories() {
  return async (dispatch) => {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    );
    const data = await response.json();
    dispatch(saveDrinksCategories(data.drinks));
  };
}

export function fetchMealsByCategory(category) {
  return async (dispatch) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    );
    const data = await response.json();
    dispatch(saveFilteredMealsByCategory(data.meals));
  };
}

export function fetchDrinksByCategory(category) {
  return async (dispatch) => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
    );
    const data = await response.json();
    dispatch(saveFilteredDrinksByCategory(data.drinks));
  };
}
