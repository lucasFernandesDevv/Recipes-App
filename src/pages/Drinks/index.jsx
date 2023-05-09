import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Recipes from '../../components/Recipes';
import { fetchDrinksRecipes } from '../../redux/actions';

function Drinks() {
  const dispatch = useDispatch();

  const saveDrinks = useCallback(() => {
    dispatch(fetchDrinksRecipes());
  }, [dispatch]);

  useEffect(() => {
    saveDrinks();
  }, [saveDrinks]);

  return (
    <div>
      <Header title="Drinks" />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
