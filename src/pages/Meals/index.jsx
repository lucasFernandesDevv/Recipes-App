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
    const testRecipe1 = {
      name: 'Test Recipe',
      doneDate: '11/05/2023',
      tags: ['test', 'recipe'],
      nationality: 'Test Nation',
      category: 'Test Category',
      isAlcoholic: true,
      recipeType: 'drinks',
      id: '51147',
      recipeImg: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
    };
    const testRecipe2 = {
      name: 'Test Recipe2',
      doneDate: '11/05/2024',
      tags: ['test', 'recipe'],
      nationality: 'Test',
      category: 'Test Category',
      isAlcoholic: false,
      recipeType: 'meals',
      id: '51144',
      recipeImg: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
    };
    localStorage.setItem('doneRecipes', JSON.stringify([testRecipe1, testRecipe2]));
  }, []);

  return (
    <div>
      <Header title="Meals" />
      <Recipes />
      <Footer />
    </div>
  );
}
