import { SAVE_DRINKS, SAVE_MEALS } from '../helpers/variables';

const INITIAL_STATE = {
  meals: ['test'],
  drinks: ['test'],
};

const recipes = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_DRINKS:
    return {
      ...state,
      drinks: payload,
    };
  case SAVE_MEALS:
    return {
      ...state,
      meals: payload,
    };
  default:
    return state;
  }
};

export default recipes;
