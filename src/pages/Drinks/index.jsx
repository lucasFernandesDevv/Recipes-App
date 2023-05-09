import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Recipes from '../../components/Recipes';
import { fetchDrinksRecipes, fetchDrinksCategories } from '../../redux/actions';

function Drinks() {
  const dispatch = useDispatch();

  const saveDrinksAndCategories = useCallback(() => {
    dispatch(fetchDrinksRecipes());
    dispatch(fetchDrinksCategories());
  }, [dispatch]);

  useEffect(() => {
    saveDrinksAndCategories();
  }, [saveDrinksAndCategories]);

  return (
    <div>
      <Header title="Drinks" />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
