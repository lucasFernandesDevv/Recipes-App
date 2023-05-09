import { SAVE_DRINKS, SAVE_MEALS } from '../helpers/variables';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
};

const maxRecipes = 12;

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
  default:
    return state;
  }
};

export default recipes;
