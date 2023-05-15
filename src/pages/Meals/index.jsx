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

  return (
    <div>
      <Header title="Meals" />
      <Recipes />
      <Footer />
    </div>
  );
}
