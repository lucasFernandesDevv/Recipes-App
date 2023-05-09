import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMealsRecipes } from '../../redux/actions';

import Header from '../../components/Header';
import Recipes from '../../components/Recipes';
import Footer from '../../components/Footer';

export default function Meals() {
  const dispatch = useDispatch();
  const saveMeals = useCallback(() => {
    dispatch(fetchMealsRecipes());
  }, [dispatch]);

  useEffect(() => {
    saveMeals();
  }, [saveMeals]);

  return (
    <div>
      <Header title="Meals" />
      <Recipes />
      <Footer />
    </div>
  );
}
