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

  // useEffect(() => {
  //   const doneRecipes = [
  //     {
  //       id: '52771',
  //       type: 'meal',
  //       nationality: 'Italian',
  //       category: 'Vegetarian',
  //       alcoholicOrNot: '',
  //       name: 'Spicy Arrabiata Penne',
  //       image:
  //         'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //       doneDate: '23/06/2020',
  //       tags: ['Pasta', 'Curry'],
  //     },
  //     {
  //       id: '178319',
  //       type: 'drink',
  //       nationality: '',
  //       category: 'Cocktail',
  //       alcoholicOrNot: 'Alcoholic',
  //       name: 'Aquamarine',
  //       image:
  //         'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //       doneDate: '23/06/2020',
  //       tags: [],
  //     },
  //   ];
  //   localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  // }, []);

  return (
    <div>
      <Header title="Meals" />
      <Recipes />
      <Footer />
    </div>
  );
}
