import { RECIPES_ADD } from '../helpers/variables';

// Coloque aqui suas actions
export const addRecipes = (recipe) => ({
  type: RECIPES_ADD,
  recipe,
});

export const fetchApiThunk = () => async () => {
  // dispatch(getCurrencies());
};
