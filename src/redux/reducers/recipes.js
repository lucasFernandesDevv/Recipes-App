// Esse reducer será responsável por tratar as informações da pessoa usuária

import { RECIPES_ADD } from '../helpers/variables';

const INITIAL_STATE = {
  recipes: [],
};

const recipes = (state = INITIAL_STATE, { type, recipe }) => {
  switch (type) {
  case RECIPES_ADD:
    return {
      recipes: recipe,
    };
  default:
    return state;
  }
};
export default recipes;
