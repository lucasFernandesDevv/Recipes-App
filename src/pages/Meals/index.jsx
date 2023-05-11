import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMealsRecipes, fetchMealsCategories } from '../../redux/actions';

import Header from '../../components/Header';
import Recipes from '../../components/Recipes';
import Footer from '../../components/Footer';

export default function Meals() {
  const dispatch = useDispatch();

  const saveMealsAndCategories = useCallback(() => {
    dispatch(fetchMealsRecipes());
    dispatch(fetchMealsCategories());
  }, [dispatch]);

  useEffect(() => {
    saveMealsAndCategories();
  }, [saveMealsAndCategories]);

  useEffect(() => {
    const testRecipe = {
      name: 'Test Recipe',
      doneDate: '11/05/2023',
      tags: ['test', 'recipe'],
      nationality: 'Test Nation',
      category: 'Test Category',
      isAlcoholic: true,
      recipeType: 'drinks',
      id: '51147',
    };
    localStorage.setItem('doneRecipes', JSON.stringify([testRecipe]));
  }, []);

  return (
    <div>
      <Header title="Meals" />
      <Recipes />
      <Footer />
    </div>
  );
}
