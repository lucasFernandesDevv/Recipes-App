import {
  SAVE_DRINKS,
  SAVE_MEALS,
  SAVE_MEALS_CATEGORIES,
  SAVE_DRINKS_CATEGORIES,
} from '../helpers/variables';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  mealsCategories: [],
  drinksCategories: [],
};

const maxRecipes = 12;
const maxCategories = 5;

const recipes = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_DRINKS:
    return {
      ...state,
      drinks: payload.filter((_, index) => index < maxRecipes),
    };
  case SAVE_MEALS:
    return {
      ...state,
      meals: payload.filter((_, index) => index < maxRecipes),
    };
  case SAVE_DRINKS_CATEGORIES:
    return {
      ...state,
      drinksCategories: payload.filter((_, index) => index < maxCategories),
    };
  case SAVE_MEALS_CATEGORIES:
    return {
      ...state,
      mealsCategories: payload.filter((_, index) => index < maxCategories),
    };
  default:
    return state;
  }
};

export default recipes;
