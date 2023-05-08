import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Recipes from '../../components/Recipes';
import Footer from '../../components/Footer';

export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // fetch the recipe from the API
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((data) => setMeals(data.meals));
  }, []);

  return (
    <div>
      <Header title="Meals" />
      <Recipes recipes={ meals } />
      <Recipes />
      <Footer />
    </div>
  );
}
