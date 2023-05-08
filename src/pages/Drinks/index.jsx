import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Recipes from '../../components/Recipes';

function Drinks() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    // fetch the recipe from the API
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((data) => setDrinks(data.drinks));
  }, []);

  return (
    <div>
      <Header title="Drinks" />
      <Recipes recipes={ drinks } />
    </div>
  );
}

export default Drinks;
